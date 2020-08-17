package com.mycompany.myapp.web.rest;

import com.mycompany.myapp.domain.Actuator;
import com.mycompany.myapp.repository.ActuatorRepository;
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
 * REST controller for managing {@link com.mycompany.myapp.domain.Actuator}.
 */
@RestController
@RequestMapping("/api")
@Transactional
public class ActuatorResource {

    private final Logger log = LoggerFactory.getLogger(ActuatorResource.class);

    private static final String ENTITY_NAME = "actuator";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final ActuatorRepository actuatorRepository;

    public ActuatorResource(ActuatorRepository actuatorRepository) {
        this.actuatorRepository = actuatorRepository;
    }

    /**
     * {@code POST  /actuators} : Create a new actuator.
     *
     * @param actuator the actuator to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new actuator, or with status {@code 400 (Bad Request)} if the actuator has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("/actuators")
    public ResponseEntity<Actuator> createActuator(@RequestBody Actuator actuator) throws URISyntaxException {
        log.debug("REST request to save Actuator : {}", actuator);
        if (actuator.getId() != null) {
            throw new BadRequestAlertException("A new actuator cannot already have an ID", ENTITY_NAME, "idexists");
        }
        Actuator result = actuatorRepository.save(actuator);
        return ResponseEntity.created(new URI("/api/actuators/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, true, ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * {@code PUT  /actuators} : Updates an existing actuator.
     *
     * @param actuator the actuator to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated actuator,
     * or with status {@code 400 (Bad Request)} if the actuator is not valid,
     * or with status {@code 500 (Internal Server Error)} if the actuator couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/actuators")
    public ResponseEntity<Actuator> updateActuator(@RequestBody Actuator actuator) throws URISyntaxException {
        log.debug("REST request to update Actuator : {}", actuator);
        if (actuator.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        Actuator result = actuatorRepository.save(actuator);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, actuator.getId().toString()))
            .body(result);
    }

    /**
     * {@code GET  /actuators} : get all the actuators.
     *
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of actuators in body.
     */
    @GetMapping("/actuators")
    public List<Actuator> getAllActuators() {
        log.debug("REST request to get all Actuators");
        return actuatorRepository.findAll();
    }

    /**
     * {@code GET  /actuators/:id} : get the "id" actuator.
     *
     * @param id the id of the actuator to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the actuator, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/actuators/{id}")
    public ResponseEntity<Actuator> getActuator(@PathVariable Long id) {
        log.debug("REST request to get Actuator : {}", id);
        Optional<Actuator> actuator = actuatorRepository.findById(id);
        return ResponseUtil.wrapOrNotFound(actuator);
    }

    /**
     * {@code DELETE  /actuators/:id} : delete the "id" actuator.
     *
     * @param id the id of the actuator to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/actuators/{id}")
    public ResponseEntity<Void> deleteActuator(@PathVariable Long id) {
        log.debug("REST request to delete Actuator : {}", id);
        actuatorRepository.deleteById(id);
        return ResponseEntity.noContent().headers(HeaderUtil.createEntityDeletionAlert(applicationName, true, ENTITY_NAME, id.toString())).build();
    }
}
