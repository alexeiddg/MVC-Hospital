package com.alexeiddg.mvcproject.service.interfaces;

import com.alexeiddg.mvcproject.model.object.Administrador;
import com.alexeiddg.mvcproject.model.object.Medico;
import java.util.List;
import java.util.Optional;

public interface AdministradorService {
    // Medico Management Workflow
    List<Medico> getAllMedicos();
    Optional<Medico> getMedicoById(Long id);
    void addMedico(Medico medico);
    void deleteMedico(Long id);

    // Administrador Management Workflow
    List<Administrador> getAllAdministradores();
    Optional<Administrador> getAdministradorById(Long id);
    void addAdministrador(Administrador administrador);
    void deleteAdministrador(Long id);
}
