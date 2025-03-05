package com.alexeiddg.mvcproject.model.object;

public class Usuario {
    private String id;
    private String nombre;
    private String rol;

    // Constructor
    public Usuario(String id, String nombre, String rol) {
        this.id = id;
        this.nombre = nombre;
        this.rol = rol;
    }

    // Getters
    public String getIdUsuario() {
        return id;
    }

    public String getNombre() {
        return nombre;
    }

    public String getRol() {
        return rol;
    }

    // Setters
    public void setIdUsuario(String idUsuario) {
        this.id = idUsuario;
    }

    public void setNombre(String nombre) {
        this.nombre = nombre;
    }

    public void setRol(String rol) {
        this.rol = rol;
    }
}
