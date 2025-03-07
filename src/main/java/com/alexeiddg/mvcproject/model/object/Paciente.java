package com.alexeiddg.mvcproject.model.object;


public class Paciente extends Usuario {
    private String contactoEmergencia;
    private String historialMedico;

    public Paciente(Long id, String nombre, String rol, String contactoEmergencia, String historialMedico) {
        super(id, nombre, "Paciente");
        this.contactoEmergencia = contactoEmergencia;
        this.historialMedico = historialMedico;
    }

    public String getContactoEmergencia() {
        return contactoEmergencia;
    }

    public void setContactoEmergencia(String contactoEmergencia) {
        this.contactoEmergencia = contactoEmergencia;
    }

    public String getHistorialMedico() {
        return historialMedico;
    }

    public void setHistorialMedico(String historialMedico) {
        this.historialMedico = historialMedico;
    }

}
