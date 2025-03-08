package com.alexeiddg.mvcproject.service.classes;

import com.alexeiddg.mvcproject.model.DAO.EnfermeraRepository;
import com.alexeiddg.mvcproject.model.object.Cita;
import com.alexeiddg.mvcproject.model.object.Enfermera;
import com.alexeiddg.mvcproject.service.interfaces.EnfermeraService;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class EnfermeraServiceImpl implements EnfermeraService {
    private final EnfermeraRepository enfermeraRepository;

    public EnfermeraServiceImpl(EnfermeraRepository enfermeraRepository) {
        this.enfermeraRepository = enfermeraRepository;
    }

    @Override
    public List<Enfermera> getAllEnfermeras() {
        return enfermeraRepository.findAll();
    }

    @Override
    public Optional<Enfermera> getEnfermeraById(Long id) {
        return enfermeraRepository.findById(id);
    }

    @Override
    public void addEnfermera(Enfermera enfermera) {
        enfermeraRepository.save(enfermera);
    }

    @Override
    public void deleteEnfermera(Long id) {
        enfermeraRepository.deleteById(id);
    }

    @Override
    public List<Cita> getCitasByEnfermeraId(Long enfermeraId) {
        return enfermeraRepository.getCitasByEnfermeraId(enfermeraId);
    }
}
