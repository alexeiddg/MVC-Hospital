package com.alexeiddg.mvcproject.model.object;
import jakarta.persistence.Entity;


@Entity
public class Medico extends Usuario {
    private String especialidad;
    private String horario_trabajo;
    private String licencia_medica;

    public Medico() {}

    public Medico(Long id, String nombre, String rol, String especialidad, String horario_trabajo, String licencia_medica) {
        super(id, nombre, "Medico");
        this.especialidad = especialidad;
        this.horario_trabajo = horario_trabajo;
        this.licencia_medica = licencia_medica;
    }

    public String getEspecialidad() {
        return especialidad;
    }

    public void setEspecialidad(String especialidad) {
        this.especialidad = especialidad;
    }

    public String getHorarioTrabajo() {
        return horario_trabajo;
    }

    public void setHorarioTrabajo(String horario_trabajo) {
        this.horario_trabajo = horario_trabajo;
    }

    public String getLicenciaMedica() {
        return licencia_medica;
    }

    public void setLicenciaMedica(String licencia_medica) {
        this.licencia_medica = licencia_medica;
    }

}
