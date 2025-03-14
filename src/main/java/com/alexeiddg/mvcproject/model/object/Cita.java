package com.alexeiddg.mvcproject.model.object;
import jakarta.persistence.*;


@Entity
public class Cita {
    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String fecha;
    private String hora;
    private String motivo_consulta;
    private String estado;

    @ManyToOne
    private Long medicoId;

    @ManyToOne
    private Long pacienteId;

    @ManyToOne
    private Enfermera enfermera;

    public Cita() {}

    public Cita(Long id, String fecha, String hora, String motivo_consulta, String estado, Long medicoId, Long pacienteId) {
        this.id = id;
        this.fecha = fecha;
        this.hora = hora;
        this.motivo_consulta = motivo_consulta;
        this.estado = estado;
        this.medicoId = medicoId;
        this.pacienteId = pacienteId;
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

    public String getMotivo_consulta() {
        return motivo_consulta;
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

    public void setMotivo_consulta(String motivo_consulta) {
        this.motivo_consulta = motivo_consulta;
    }

    public void setEstado(String estado) {
        this.estado = estado;
    }

}
