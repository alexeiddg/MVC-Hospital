package com.alexeiddg.mvcproject.service.interfaces;

import com.alexeiddg.mvcproject.model.object.Cita;
import com.alexeiddg.mvcproject.model.object.Enfermera;

import java.util.List;
import java.util.Optional;

public interface EnfermeraService {
    List<Enfermera> getAllEnfermeras();
    Optional<Enfermera> getEnfermeraById(Long id);
    void addEnfermera(Enfermera enfermera);
    void deleteEnfermera(Long id);

    List<Cita> getCitasByEnfermeraId(Long enfermeraId);
}
