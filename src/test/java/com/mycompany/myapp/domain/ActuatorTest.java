package com.mycompany.myapp.domain;

import org.junit.jupiter.api.Test;
import static org.assertj.core.api.Assertions.assertThat;
import com.mycompany.myapp.web.rest.TestUtil;

public class ActuatorTest {

    @Test
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(Actuator.class);
        Actuator actuator1 = new Actuator();
        actuator1.setId(1L);
        Actuator actuator2 = new Actuator();
        actuator2.setId(actuator1.getId());
        assertThat(actuator1).isEqualTo(actuator2);
        actuator2.setId(2L);
        assertThat(actuator1).isNotEqualTo(actuator2);
        actuator1.setId(null);
        assertThat(actuator1).isNotEqualTo(actuator2);
    }
}
