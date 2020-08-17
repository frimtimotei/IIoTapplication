package com.mycompany.myapp.domain;

import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;

import java.io.Serializable;
import java.util.HashSet;
import java.util.Set;

/**
 * A Equipment.
 */
@Entity
@Table(name = "equipment")
@Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
public class Equipment implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "name")
    private String name;

    @Column(name = "desciption")
    private String desciption;

    @OneToMany(mappedBy = "equipment")
    @Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
    private Set<Sensor> sensors = new HashSet<>();

    @OneToMany(mappedBy = "equipment")
    @Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
    private Set<Actuator> actuators = new HashSet<>();

    // jhipster-needle-entity-add-field - JHipster will add fields here
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public Equipment name(String name) {
        this.name = name;
        return this;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getDesciption() {
        return desciption;
    }

    public Equipment desciption(String desciption) {
        this.desciption = desciption;
        return this;
    }

    public void setDesciption(String desciption) {
        this.desciption = desciption;
    }

    public Set<Sensor> getSensors() {
        return sensors;
    }

    public Equipment sensors(Set<Sensor> sensors) {
        this.sensors = sensors;
        return this;
    }

    public Equipment addSensor(Sensor sensor) {
        this.sensors.add(sensor);
        sensor.setEquipment(this);
        return this;
    }

    public Equipment removeSensor(Sensor sensor) {
        this.sensors.remove(sensor);
        sensor.setEquipment(null);
        return this;
    }

    public void setSensors(Set<Sensor> sensors) {
        this.sensors = sensors;
    }

    public Set<Actuator> getActuators() {
        return actuators;
    }

    public Equipment actuators(Set<Actuator> actuators) {
        this.actuators = actuators;
        return this;
    }

    public Equipment addActuator(Actuator actuator) {
        this.actuators.add(actuator);
        actuator.setEquipment(this);
        return this;
    }

    public Equipment removeActuator(Actuator actuator) {
        this.actuators.remove(actuator);
        actuator.setEquipment(null);
        return this;
    }

    public void setActuators(Set<Actuator> actuators) {
        this.actuators = actuators;
    }
    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof Equipment)) {
            return false;
        }
        return id != null && id.equals(((Equipment) o).id);
    }

    @Override
    public int hashCode() {
        return 31;
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "Equipment{" +
            "id=" + getId() +
            ", name='" + getName() + "'" +
            ", desciption='" + getDesciption() + "'" +
            "}";
    }
}
