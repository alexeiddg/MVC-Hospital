package com.alexeiddg.mvcproject.model.object;


public class Administrador extends Usuario {
    public Administrador(Long id, String nombre, String rol) {
        super(id, nombre, "Administrador");
    }
}
