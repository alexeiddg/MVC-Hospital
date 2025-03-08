package com.alexeiddg.mvcproject.service.interfaces;

import com.alexeiddg.mvcproject.model.object.Cita;
import com.alexeiddg.mvcproject.model.object.Paciente;

import java.util.List;
import java.util.Optional;

public interface PacienteService {
    List<Paciente> getAllPacientes();
    Optional<Paciente> getPacienteById(Long id);
    void addPaciente(Paciente paciente);
    void deletePaciente(Long id);

    List<Cita> getCitasByPacienteId(Long id);
    void addCita(Cita cita);
    void deleteCita(Long id);
}
