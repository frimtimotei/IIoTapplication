package com.mycompany.myapp.repository;

import com.mycompany.myapp.domain.SensorReadin;

import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;

/**
 * Spring Data  repository for the SensorReadin entity.
 */
@SuppressWarnings("unused")
@Repository
public interface SensorReadinRepository extends JpaRepository<SensorReadin, Long> {
}
