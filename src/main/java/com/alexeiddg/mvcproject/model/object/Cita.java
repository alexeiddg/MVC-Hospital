package com.alexeiddg.mvcproject.model.object;
import jakarta.persistence.*;


@Entity
public class Cita {
    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String fecha;
    private String hora;
    private String motivoConsulta;
    private String estado;

    public Cita() {}

    public Cita(Long id, String fecha, String hora, String motivoConsulta, String estado) {
        this.id = id;
        this.fecha = fecha;
        this.hora = hora;
        this.motivoConsulta = motivoConsulta;
        this.estado = estado;
    }

    // Getters
    public Long getId() {
        return id;
    }

    public String getFecha() {
        return fecha;
    }

    public String getHora() {
        return hora;
    }

    public String getMotivoConsulta() {
        return motivoConsulta;
    }

    public String getEstado() {
        return estado;
    }

    // Setters

    public void setId(Long id) {
        this.id = id;
    }

    public void setFecha(String fecha) {
        this.fecha = fecha;
    }

    public void setHora(String hora) {
        this.hora = hora;
    }

    public void setMotivoConsulta(String motivoConsulta) {
        this.motivoConsulta = motivoConsulta;
    }

    public void setEstado(String estado) {
        this.estado = estado;
    }

}
