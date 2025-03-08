package com.alexeiddg.mvcproject.service.classes;

import com.alexeiddg.mvcproject.model.DAO.CitaRepository;
import com.alexeiddg.mvcproject.model.DAO.PacienteRepository;
import com.alexeiddg.mvcproject.model.object.Cita;
import com.alexeiddg.mvcproject.model.object.Paciente;
import com.alexeiddg.mvcproject.service.interfaces.PacienteService;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class PacienteServiceImpl implements PacienteService {
    private final PacienteRepository pacienteRepository;
    private final CitaRepository citaRepository;

    public PacienteServiceImpl(PacienteRepository pacienteRepository, CitaRepository citaRepository) {
        this.pacienteRepository = pacienteRepository;
        this.citaRepository = citaRepository;
    }

    @Override
    public List<Paciente> getAllPacientes() {
        return pacienteRepository.findAll();
    }

    @Override
    public Optional<Paciente> getPacienteById(Long id) {
        return pacienteRepository.findById(id);
    }

    @Override
    public void addPaciente(Paciente paciente) {
        pacienteRepository.save(paciente);
    }

    @Override
    public void deletePaciente(Long id) {
        pacienteRepository.deleteById(id);
    }

    @Override
    public List<Cita> getCitasByPacienteId(Long id) {
        return citaRepository.getCitasByPacienteId(id);
    }

    @Override
    public void addCita(Cita cita) {
        citaRepository.save(cita);
    }

    @Override
    public void deleteCita(Long id) {
        citaRepository.deleteById(id);
    }
}
