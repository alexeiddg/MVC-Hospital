package com.alexeiddg.mvcproject.service.interfaces;

import com.alexeiddg.mvcproject.model.object.Cita;

import java.util.List;
import java.util.Optional;

public interface CitaService {
    List<Cita> getAllCitas();
    Optional<Cita> getCitaById(Long id);
    void addCita(Cita cita);
    void deleteCita(Long id);
}
