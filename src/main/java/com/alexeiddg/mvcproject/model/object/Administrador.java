package com.alexeiddg.mvcproject.model.object;

public class Administrador extends Usuario {
    public Administrador(String id, String nombre, String rol) {
        super(id, nombre, "Administrador");
    }
}
