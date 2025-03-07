package com.alexeiddg.mvcproject.model.object;
import jakarta.persistence.Entity;


@Entity
public class Administrador extends Usuario {
    public Administrador() {}

    public Administrador(Long id, String nombre, String rol) {
        super(id, nombre, "Administrador");
    }
}
