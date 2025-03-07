package com.alexeiddg.mvcproject.model.object;
import jakarta.persistence.Entity;


@Entity
public class Paciente extends Usuario {
    private String contacto_emergencia;
    private String historial_medico;

    public Paciente() {}

    public Paciente(Long id, String nombre, String rol, String contacto_emergencia, String historial_medico) {
        super(id, nombre, "Paciente");
        this.contacto_emergencia = contacto_emergencia;
        this.historial_medico = historial_medico;
    }

    public String getContacto_emergencia() {
        return contacto_emergencia;
    }

    public void setContacto_emergencia(String contacto_emergencia) {
        this.contacto_emergencia = contacto_emergencia;
    }

    public String getHistorial_medico() {
        return historial_medico;
    }

    public void setHistorial_medico(String historial_medico) {
        this.historial_medico = historial_medico;
    }

}
