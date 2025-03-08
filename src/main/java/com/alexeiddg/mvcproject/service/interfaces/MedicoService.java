package com.alexeiddg.mvcproject.service.interfaces;

import com.alexeiddg.mvcproject.model.object.Cita;
import com.alexeiddg.mvcproject.model.object.Medico;

import java.util.List;
import java.util.Optional;

public interface MedicoService {
    List<Medico> getAllMedicos();
    Optional<Medico> getMedicoById(Long id);
    void addMedico(Medico medico);
    void deleteMedico(Long id);

    List<Cita> getCitasByMedicoId(Long medicoId);
}
