package com.alexeiddg.mvcproject.service.classes;

import com.alexeiddg.mvcproject.model.DAO.CitaRepository;
import com.alexeiddg.mvcproject.model.object.Cita;
import com.alexeiddg.mvcproject.service.interfaces.CitaService;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class CitaServiceImpl implements CitaService {
    private final CitaRepository citaRepository;

    public CitaServiceImpl(CitaRepository citaRepository) {
        this.citaRepository = citaRepository;
    }

    @Override
    public List<Cita> getAllCitas() {
        return citaRepository.findAll();
    }

    @Override
    public Optional<Cita> getCitaById(Long id) {
        return citaRepository.findById(id);
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
