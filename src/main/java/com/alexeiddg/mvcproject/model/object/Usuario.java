package com.alexeiddg.mvcproject.model.object;
import jakarta.persistence.*;


@Entity
@Inheritance(strategy = InheritanceType.JOINED) // Separate tables, linked by ID
public class Usuario {
    @Id @GeneratedValue(strategy = GenerationType.IDENTITY) // PK - Auto-gen ids
    private Long id;
    private String nombre;
    private String rol;

    public Usuario () {}

    public Usuario(Long id, String nombre, String rol) {
        this.id = id;
        this.nombre = nombre;
        this.rol = rol;
    }

    // Getters
    public Long getId() {
        return id;
    }

    public String getNombre() {
        return nombre;
    }

    public String getRol() {
        return rol;
    }

    // Setters
    public void setId(Long idUsuario) {
        this.id = idUsuario;
    }

    public void setNombre(String nombre) {
        this.nombre = nombre;
    }

    public void setRol(String rol) {
        this.rol = rol;
    }

}
