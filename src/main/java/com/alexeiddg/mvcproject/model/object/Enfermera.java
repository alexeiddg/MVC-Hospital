package com.alexeiddg.mvcproject.model.object;


public class Enfermera extends Usuario {
    private String area_asignada;
    private String turno;

    public Enfermera(Long id, String nombre, String rol, String area_asignada, String turno) {
        super(id, nombre, "Enfermera");
        this.area_asignada = area_asignada;
        this.turno = turno;
    }

    public String getAreaAsignada() {
        return area_asignada;
    }

    public void setAreaAsignada(String area_asignada) {
        this.area_asignada = area_asignada;
    }

    public String getTurno() {
        return turno;
    }

    public void setTurno(String turno) {
        this.turno = turno;
    }

}
