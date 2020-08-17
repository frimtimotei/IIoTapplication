package com.mycompany.myapp.domain;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;

import java.io.Serializable;

/**
 * A Actuator.
 */
@Entity
@Table(name = "actuator")
@Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
public class Actuator implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "type")
    private String type;

    @Column(name = "control_value")
    private Float controlValue;

    @ManyToOne
    @JsonIgnoreProperties(value = "actuators", allowSetters = true)
    private Equipment equipment;

    // jhipster-needle-entity-add-field - JHipster will add fields here
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getType() {
        return type;
    }

    public Actuator type(String type) {
        this.type = type;
        return this;
    }

    public void setType(String type) {
        this.type = type;
    }

    public Float getControlValue() {
        return controlValue;
    }

    public Actuator controlValue(Float controlValue) {
        this.controlValue = controlValue;
        return this;
    }

    public void setControlValue(Float controlValue) {
        this.controlValue = controlValue;
    }

    public Equipment getEquipment() {
        return equipment;
    }

    public Actuator equipment(Equipment equipment) {
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
        if (!(o instanceof Actuator)) {
            return false;
        }
        return id != null && id.equals(((Actuator) o).id);
    }

    @Override
    public int hashCode() {
        return 31;
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "Actuator{" +
            "id=" + getId() +
            ", type='" + getType() + "'" +
            ", controlValue=" + getControlValue() +
            "}";
    }
}
