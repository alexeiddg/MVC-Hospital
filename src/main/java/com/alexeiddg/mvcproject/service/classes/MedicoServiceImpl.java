package com.alexeiddg.mvcproject.service.classes;

import com.alexeiddg.mvcproject.model.DAO.CitaRepository;
import com.alexeiddg.mvcproject.model.DAO.MedicoRepository;
import com.alexeiddg.mvcproject.model.object.Cita;
import com.alexeiddg.mvcproject.model.object.Medico;
import com.alexeiddg.mvcproject.service.interfaces.MedicoService;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class MedicoServiceImpl implements MedicoService {
    private final MedicoRepository medicoRepository;
    private final CitaRepository citaRepository;

    public MedicoServiceImpl(MedicoRepository medicoRepository, CitaRepository citaRepository) {
        this.medicoRepository = medicoRepository;
        this.citaRepository = citaRepository;
    }

    @Override
    public List<Medico> getAllMedicos() {
        return medicoRepository.findAll();
    }

    @Override
    public Optional<Medico> getMedicoById(Long id) {
        return medicoRepository.findById(id);
    }

    @Override
    public void addMedico(Medico medico) {
        medicoRepository.save(medico);
    }

    @Override
    public void deleteMedico(Long id) {
        medicoRepository.deleteById(id);
    }

    @Override
    public List<Cita> getCitasByMedicoId(Long medicoId) {
        return citaRepository.getCitasByMedicoId(medicoId);
    }
}
