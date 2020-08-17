package com.mycompany.myapp.repository;

import com.mycompany.myapp.domain.Actuator;

import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;

/**
 * Spring Data  repository for the Actuator entity.
 */
@SuppressWarnings("unused")
@Repository
public interface ActuatorRepository extends JpaRepository<Actuator, Long> {
}
