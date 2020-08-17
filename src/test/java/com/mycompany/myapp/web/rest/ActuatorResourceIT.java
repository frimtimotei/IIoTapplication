package com.mycompany.myapp.web.rest;

import com.mycompany.myapp.IIoTapplicationApp;
import com.mycompany.myapp.domain.Actuator;
import com.mycompany.myapp.repository.ActuatorRepository;

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
import java.util.List;

import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasItem;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

/**
 * Integration tests for the {@link ActuatorResource} REST controller.
 */
@SpringBootTest(classes = IIoTapplicationApp.class)
@AutoConfigureMockMvc
@WithMockUser
public class ActuatorResourceIT {

    private static final String DEFAULT_TYPE = "AAAAAAAAAA";
    private static final String UPDATED_TYPE = "BBBBBBBBBB";

    private static final Float DEFAULT_CONTROL_VALUE = 1F;
    private static final Float UPDATED_CONTROL_VALUE = 2F;

    @Autowired
    private ActuatorRepository actuatorRepository;

    @Autowired
    private EntityManager em;

    @Autowired
    private MockMvc restActuatorMockMvc;

    private Actuator actuator;

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static Actuator createEntity(EntityManager em) {
        Actuator actuator = new Actuator()
            .type(DEFAULT_TYPE)
            .controlValue(DEFAULT_CONTROL_VALUE);
        return actuator;
    }
    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static Actuator createUpdatedEntity(EntityManager em) {
        Actuator actuator = new Actuator()
            .type(UPDATED_TYPE)
            .controlValue(UPDATED_CONTROL_VALUE);
        return actuator;
    }

    @BeforeEach
    public void initTest() {
        actuator = createEntity(em);
    }

    @Test
    @Transactional
    public void createActuator() throws Exception {
        int databaseSizeBeforeCreate = actuatorRepository.findAll().size();
        // Create the Actuator
        restActuatorMockMvc.perform(post("/api/actuators")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(actuator)))
            .andExpect(status().isCreated());

        // Validate the Actuator in the database
        List<Actuator> actuatorList = actuatorRepository.findAll();
        assertThat(actuatorList).hasSize(databaseSizeBeforeCreate + 1);
        Actuator testActuator = actuatorList.get(actuatorList.size() - 1);
        assertThat(testActuator.getType()).isEqualTo(DEFAULT_TYPE);
        assertThat(testActuator.getControlValue()).isEqualTo(DEFAULT_CONTROL_VALUE);
    }

    @Test
    @Transactional
    public void createActuatorWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = actuatorRepository.findAll().size();

        // Create the Actuator with an existing ID
        actuator.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restActuatorMockMvc.perform(post("/api/actuators")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(actuator)))
            .andExpect(status().isBadRequest());

        // Validate the Actuator in the database
        List<Actuator> actuatorList = actuatorRepository.findAll();
        assertThat(actuatorList).hasSize(databaseSizeBeforeCreate);
    }


    @Test
    @Transactional
    public void getAllActuators() throws Exception {
        // Initialize the database
        actuatorRepository.saveAndFlush(actuator);

        // Get all the actuatorList
        restActuatorMockMvc.perform(get("/api/actuators?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(actuator.getId().intValue())))
            .andExpect(jsonPath("$.[*].type").value(hasItem(DEFAULT_TYPE)))
            .andExpect(jsonPath("$.[*].controlValue").value(hasItem(DEFAULT_CONTROL_VALUE.doubleValue())));
    }
    
    @Test
    @Transactional
    public void getActuator() throws Exception {
        // Initialize the database
        actuatorRepository.saveAndFlush(actuator);

        // Get the actuator
        restActuatorMockMvc.perform(get("/api/actuators/{id}", actuator.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.id").value(actuator.getId().intValue()))
            .andExpect(jsonPath("$.type").value(DEFAULT_TYPE))
            .andExpect(jsonPath("$.controlValue").value(DEFAULT_CONTROL_VALUE.doubleValue()));
    }
    @Test
    @Transactional
    public void getNonExistingActuator() throws Exception {
        // Get the actuator
        restActuatorMockMvc.perform(get("/api/actuators/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateActuator() throws Exception {
        // Initialize the database
        actuatorRepository.saveAndFlush(actuator);

        int databaseSizeBeforeUpdate = actuatorRepository.findAll().size();

        // Update the actuator
        Actuator updatedActuator = actuatorRepository.findById(actuator.getId()).get();
        // Disconnect from session so that the updates on updatedActuator are not directly saved in db
        em.detach(updatedActuator);
        updatedActuator
            .type(UPDATED_TYPE)
            .controlValue(UPDATED_CONTROL_VALUE);

        restActuatorMockMvc.perform(put("/api/actuators")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(updatedActuator)))
            .andExpect(status().isOk());

        // Validate the Actuator in the database
        List<Actuator> actuatorList = actuatorRepository.findAll();
        assertThat(actuatorList).hasSize(databaseSizeBeforeUpdate);
        Actuator testActuator = actuatorList.get(actuatorList.size() - 1);
        assertThat(testActuator.getType()).isEqualTo(UPDATED_TYPE);
        assertThat(testActuator.getControlValue()).isEqualTo(UPDATED_CONTROL_VALUE);
    }

    @Test
    @Transactional
    public void updateNonExistingActuator() throws Exception {
        int databaseSizeBeforeUpdate = actuatorRepository.findAll().size();

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restActuatorMockMvc.perform(put("/api/actuators")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(actuator)))
            .andExpect(status().isBadRequest());

        // Validate the Actuator in the database
        List<Actuator> actuatorList = actuatorRepository.findAll();
        assertThat(actuatorList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    public void deleteActuator() throws Exception {
        // Initialize the database
        actuatorRepository.saveAndFlush(actuator);

        int databaseSizeBeforeDelete = actuatorRepository.findAll().size();

        // Delete the actuator
        restActuatorMockMvc.perform(delete("/api/actuators/{id}", actuator.getId())
            .accept(MediaType.APPLICATION_JSON))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        List<Actuator> actuatorList = actuatorRepository.findAll();
        assertThat(actuatorList).hasSize(databaseSizeBeforeDelete - 1);
    }
}
