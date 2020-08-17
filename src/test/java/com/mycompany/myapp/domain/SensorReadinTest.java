package com.mycompany.myapp.domain;

import org.junit.jupiter.api.Test;
import static org.assertj.core.api.Assertions.assertThat;
import com.mycompany.myapp.web.rest.TestUtil;

public class SensorReadinTest {

    @Test
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(SensorReadin.class);
        SensorReadin sensorReadin1 = new SensorReadin();
        sensorReadin1.setId(1L);
        SensorReadin sensorReadin2 = new SensorReadin();
        sensorReadin2.setId(sensorReadin1.getId());
        assertThat(sensorReadin1).isEqualTo(sensorReadin2);
        sensorReadin2.setId(2L);
        assertThat(sensorReadin1).isNotEqualTo(sensorReadin2);
        sensorReadin1.setId(null);
        assertThat(sensorReadin1).isNotEqualTo(sensorReadin2);
    }
}
