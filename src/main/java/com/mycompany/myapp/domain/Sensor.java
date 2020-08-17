package com.mycompany.myapp.domain;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;

import java.io.Serializable;
import java.util.HashSet;
import java.util.Set;

/**
 * A Sensor.
 */
@Entity
@Table(name = "sensor")
@Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
public class Sensor implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "sensor_name")
    private String sensorName;

    @Column(name = "tip_sensor")
    private String tipSensor;

    @Column(name = "description")
    private String description;

    @OneToMany(mappedBy = "sensor")
    @Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
    private Set<SensorReadin> sensors = new HashSet<>();

    @ManyToOne
    @JsonIgnoreProperties(value = "sensors", allowSetters = true)
    private Equipment equipment;

    // jhipster-needle-entity-add-field - JHipster will add fields here
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getSensorName() {
        return sensorName;
    }

    public Sensor sensorName(String sensorName) {
        this.sensorName = sensorName;
        return this;
    }

    public void setSensorName(String sensorName) {
        this.sensorName = sensorName;
    }

    public String getTipSensor() {
        return tipSensor;
    }

    public Sensor tipSensor(String tipSensor) {
        this.tipSensor = tipSensor;
        return this;
    }

    public void setTipSensor(String tipSensor) {
        this.tipSensor = tipSensor;
    }

    public String getDescription() {
        return description;
    }

    public Sensor description(String description) {
        this.description = description;
        return this;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public Set<SensorReadin> getSensors() {
        return sensors;
    }

    public Sensor sensors(Set<SensorReadin> sensorReadins) {
        this.sensors = sensorReadins;
        return this;
    }

    public Sensor addSensor(SensorReadin sensorReadin) {
        this.sensors.add(sensorReadin);
        sensorReadin.setSensor(this);
        return this;
    }

    public Sensor removeSensor(SensorReadin sensorReadin) {
        this.sensors.remove(sensorReadin);
        sensorReadin.setSensor(null);
        return this;
    }

    public void setSensors(Set<SensorReadin> sensorReadins) {
        this.sensors = sensorReadins;
    }

    public Equipment getEquipment() {
        return equipment;
    }

    public Sensor equipment(Equipment equipment) {
        this.equipment = equipment;
        return this;
    }

    public void setEquipment(Equipment equipment) {
        this.equipment = equipment;
    }
    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof Sensor)) {
            return false;
        }
        return id != null && id.equals(((Sensor) o).id);
    }

    @Override
    public int hashCode() {
        return 31;
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "Sensor{" +
            "id=" + getId() +
            ", sensorName='" + getSensorName() + "'" +
            ", tipSensor='" + getTipSensor() + "'" +
            ", description='" + getDescription() + "'" +
            "}";
    }
}
