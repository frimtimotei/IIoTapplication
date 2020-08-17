package com.mycompany.myapp.web.rest;

import com.mycompany.myapp.IIoTapplicationApp;
import com.mycompany.myapp.domain.SensorReadin;
import com.mycompany.myapp.repository.SensorReadinRepository;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.MediaType;
import org.springframework.security.test.context.support.WithMockUser;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.transaction.annotation.Transactional;
import javax.persistence.EntityManager;
import java.time.Instant;
import java.time.temporal.ChronoUnit;
import java.util.List;

import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasItem;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

/**
 * Integration tests for the {@link SensorReadinResource} REST controller.
 */
@SpringBootTest(classes = IIoTapplicationApp.class)
@AutoConfigureMockMvc
@WithMockUser
public class SensorReadinResourceIT {

    private static final Float DEFAULT_VALUE = 1F;
    private static final Float UPDATED_VALUE = 2F;

    private static final Instant DEFAULT_TIME = Instant.ofEpochMilli(0L);
    private static final Instant UPDATED_TIME = Instant.now().truncatedTo(ChronoUnit.MILLIS);

    @Autowired
    private SensorReadinRepository sensorReadinRepository;

    @Autowired
    private EntityManager em;

    @Autowired
    private MockMvc restSensorReadinMockMvc;

    private SensorReadin sensorReadin;

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static SensorReadin createEntity(EntityManager em) {
        SensorReadin sensorReadin = new SensorReadin()
            .value(DEFAULT_VALUE)
            .time(DEFAULT_TIME);
        return sensorReadin;
    }
    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static SensorReadin createUpdatedEntity(EntityManager em) {
        SensorReadin sensorReadin = new SensorReadin()
            .value(UPDATED_VALUE)
            .time(UPDATED_TIME);
        return sensorReadin;
    }

    @BeforeEach
    public void initTest() {
        sensorReadin = createEntity(em);
    }

    @Test
    @Transactional
    public void createSensorReadin() throws Exception {
        int databaseSizeBeforeCreate = sensorReadinRepository.findAll().size();
        // Create the SensorReadin
        restSensorReadinMockMvc.perform(post("/api/sensor-readins")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(sensorReadin)))
            .andExpect(status().isCreated());

        // Validate the SensorReadin in the database
        List<SensorReadin> sensorReadinList = sensorReadinRepository.findAll();
        assertThat(sensorReadinList).hasSize(databaseSizeBeforeCreate + 1);
        SensorReadin testSensorReadin = sensorReadinList.get(sensorReadinList.size() - 1);
        assertThat(testSensorReadin.getValue()).isEqualTo(DEFAULT_VALUE);
        assertThat(testSensorReadin.getTime()).isEqualTo(DEFAULT_TIME);
    }

    @Test
    @Transactional
    public void createSensorReadinWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = sensorReadinRepository.findAll().size();

        // Create the SensorReadin with an existing ID
        sensorReadin.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restSensorReadinMockMvc.perform(post("/api/sensor-readins")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(sensorReadin)))
            .andExpect(status().isBadRequest());

        // Validate the SensorReadin in the database
        List<SensorReadin> sensorReadinList = sensorReadinRepository.findAll();
        assertThat(sensorReadinList).hasSize(databaseSizeBeforeCreate);
    }


    @Test
    @Transactional
    public void getAllSensorReadins() throws Exception {
        // Initialize the database
        sensorReadinRepository.saveAndFlush(sensorReadin);

        // Get all the sensorReadinList
        restSensorReadinMockMvc.perform(get("/api/sensor-readins?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(sensorReadin.getId().intValue())))
            .andExpect(jsonPath("$.[*].value").value(hasItem(DEFAULT_VALUE.doubleValue())))
            .andExpect(jsonPath("$.[*].time").value(hasItem(DEFAULT_TIME.toString())));
    }
    
    @Test
    @Transactional
    public void getSensorReadin() throws Exception {
        // Initialize the database
        sensorReadinRepository.saveAndFlush(sensorReadin);

        // Get the sensorReadin
        restSensorReadinMockMvc.perform(get("/api/sensor-readins/{id}", sensorReadin.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.id").value(sensorReadin.getId().intValue()))
            .andExpect(jsonPath("$.value").value(DEFAULT_VALUE.doubleValue()))
            .andExpect(jsonPath("$.time").value(DEFAULT_TIME.toString()));
    }
    @Test
    @Transactional
    public void getNonExistingSensorReadin() throws Exception {
        // Get the sensorReadin
        restSensorReadinMockMvc.perform(get("/api/sensor-readins/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateSensorReadin() throws Exception {
        // Initialize the database
        sensorReadinRepository.saveAndFlush(sensorReadin);

        int databaseSizeBeforeUpdate = sensorReadinRepository.findAll().size();

        // Update the sensorReadin
        SensorReadin updatedSensorReadin = sensorReadinRepository.findById(sensorReadin.getId()).get();
        // Disconnect from session so that the updates on updatedSensorReadin are not directly saved in db
        em.detach(updatedSensorReadin);
        updatedSensorReadin
            .value(UPDATED_VALUE)
            .time(UPDATED_TIME);

        restSensorReadinMockMvc.perform(put("/api/sensor-readins")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(updatedSensorReadin)))
            .andExpect(status().isOk());

        // Validate the SensorReadin in the database
        List<SensorReadin> sensorReadinList = sensorReadinRepository.findAll();
        assertThat(sensorReadinList).hasSize(databaseSizeBeforeUpdate);
        SensorReadin testSensorReadin = sensorReadinList.get(sensorReadinList.size() - 1);
        assertThat(testSensorReadin.getValue()).isEqualTo(UPDATED_VALUE);
        assertThat(testSensorReadin.getTime()).isEqualTo(UPDATED_TIME);
    }

    @Test
    @Transactional
    public void updateNonExistingSensorReadin() throws Exception {
        int databaseSizeBeforeUpdate = sensorReadinRepository.findAll().size();

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restSensorReadinMockMvc.perform(put("/api/sensor-readins")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(sensorReadin)))
            .andExpect(status().isBadRequest());

        // Validate the SensorReadin in the database
        List<SensorReadin> sensorReadinList = sensorReadinRepository.findAll();
        assertThat(sensorReadinList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    public void deleteSensorReadin() throws Exception {
        // Initialize the database
        sensorReadinRepository.saveAndFlush(sensorReadin);

        int databaseSizeBeforeDelete = sensorReadinRepository.findAll().size();

        // Delete the sensorReadin
        restSensorReadinMockMvc.perform(delete("/api/sensor-readins/{id}", sensorReadin.getId())
            .accept(MediaType.APPLICATION_JSON))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        List<SensorReadin> sensorReadinList = sensorReadinRepository.findAll();
        assertThat(sensorReadinList).hasSize(databaseSizeBeforeDelete - 1);
    }
}
