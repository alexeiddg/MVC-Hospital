package com.alexeiddg.mvcproject.service.classes;

import com.alexeiddg.mvcproject.model.DAO.AdministradorRepository;
import com.alexeiddg.mvcproject.model.DAO.MedicoRepository;
import com.alexeiddg.mvcproject.model.object.Administrador;
import com.alexeiddg.mvcproject.model.object.Medico;
import com.alexeiddg.mvcproject.service.interfaces.AdministradorService;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class AdministradorServiceImpl implements AdministradorService {
    // Administrar Medicos Workflow
    private final AdministradorRepository administradorRepository;
    private final MedicoRepository medicoRepository;

    public AdministradorServiceImpl(MedicoRepository medicoRepository, AdministradorRepository administradorRepository) {
        this.medicoRepository = medicoRepository;
        this.administradorRepository = administradorRepository;
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

    // Administradores Workflow
    @Override
    public List<Administrador> getAllAdministradores() {
        return administradorRepository.findAll();
    }

    @Override
    public Optional<Administrador> getAdministradorById(Long id) {
        return administradorRepository.findById(id);
    }

    @Override
    public void addAdministrador(Administrador administrador) {
        administradorRepository.save(administrador);
    }

    @Override
    public void deleteAdministrador(Long id) {
        administradorRepository.deleteById(id);
    }
}
