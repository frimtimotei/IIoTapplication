package com.mycompany.myapp.web.rest;

import com.mycompany.myapp.domain.SensorReadin;
import com.mycompany.myapp.repository.SensorReadinRepository;
import com.mycompany.myapp.web.rest.errors.BadRequestAlertException;

import io.github.jhipster.web.util.HeaderUtil;
import io.github.jhipster.web.util.ResponseUtil;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.ResponseEntity;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.*;

import java.net.URI;
import java.net.URISyntaxException;
import java.util.List;
import java.util.Optional;

/**
 * REST controller for managing {@link com.mycompany.myapp.domain.SensorReadin}.
 */
@RestController
@RequestMapping("/api")
@Transactional
public class SensorReadinResource {

    private final Logger log = LoggerFactory.getLogger(SensorReadinResource.class);

    private static final String ENTITY_NAME = "sensorReadin";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final SensorReadinRepository sensorReadinRepository;

    public SensorReadinResource(SensorReadinRepository sensorReadinRepository) {
        this.sensorReadinRepository = sensorReadinRepository;
    }

    /**
     * {@code POST  /sensor-readins} : Create a new sensorReadin.
     *
     * @param sensorReadin the sensorReadin to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new sensorReadin, or with status {@code 400 (Bad Request)} if the sensorReadin has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("/sensor-readins")
    public ResponseEntity<SensorReadin> createSensorReadin(@RequestBody SensorReadin sensorReadin) throws URISyntaxException {
        log.debug("REST request to save SensorReadin : {}", sensorReadin);
        if (sensorReadin.getId() != null) {
            throw new BadRequestAlertException("A new sensorReadin cannot already have an ID", ENTITY_NAME, "idexists");
        }
        SensorReadin result = sensorReadinRepository.save(sensorReadin);
        return ResponseEntity.created(new URI("/api/sensor-readins/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, true, ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * {@code PUT  /sensor-readins} : Updates an existing sensorReadin.
     *
     * @param sensorReadin the sensorReadin to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated sensorReadin,
     * or with status {@code 400 (Bad Request)} if the sensorReadin is not valid,
     * or with status {@code 500 (Internal Server Error)} if the sensorReadin couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/sensor-readins")
    public ResponseEntity<SensorReadin> updateSensorReadin(@RequestBody SensorReadin sensorReadin) throws URISyntaxException {
        log.debug("REST request to update SensorReadin : {}", sensorReadin);
        if (sensorReadin.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        SensorReadin result = sensorReadinRepository.save(sensorReadin);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, sensorReadin.getId().toString()))
            .body(result);
    }

    /**
     * {@code GET  /sensor-readins} : get all the sensorReadins.
     *
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of sensorReadins in body.
     */
    @GetMapping("/sensor-readins")
    public List<SensorReadin> getAllSensorReadins() {
        log.debug("REST request to get all SensorReadins");
        return sensorReadinRepository.findAll();
    }

    /**
     * {@code GET  /sensor-readins/:id} : get the "id" sensorReadin.
     *
     * @param id the id of the sensorReadin to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the sensorReadin, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/sensor-readins/{id}")
    public ResponseEntity<SensorReadin> getSensorReadin(@PathVariable Long id) {
        log.debug("REST request to get SensorReadin : {}", id);
        Optional<SensorReadin> sensorReadin = sensorReadinRepository.findById(id);
        return ResponseUtil.wrapOrNotFound(sensorReadin);
    }

    /**
     * {@code DELETE  /sensor-readins/:id} : delete the "id" sensorReadin.
     *
     * @param id the id of the sensorReadin to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/sensor-readins/{id}")
    public ResponseEntity<Void> deleteSensorReadin(@PathVariable Long id) {
        log.debug("REST request to delete SensorReadin : {}", id);
        sensorReadinRepository.deleteById(id);
        return ResponseEntity.noContent().headers(HeaderUtil.createEntityDeletionAlert(applicationName, true, ENTITY_NAME, id.toString())).build();
    }
}
