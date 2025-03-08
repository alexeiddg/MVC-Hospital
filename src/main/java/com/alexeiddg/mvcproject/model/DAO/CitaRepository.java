package com.alexeiddg.mvcproject.model.DAO;

import com.alexeiddg.mvcproject.model.object.Cita;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;


@Repository
public interface CitaRepository extends JpaRepository<Cita, Long> {

    // get citas de enfermera
    @Query("SELECT c FROM Cita c WHERE c.enfermera.id = :enfermeraId")
    List<Cita> getCitasByEnfermeraId(@Param("enfermeraId") Long enfermeraId);

    // get citas de medico
    @Query("SELECT c FROM Cita c WHERE c.medico.id = :medicoId")
    List<Cita> getCitasByMedicoId(@Param("medicoId") Long medicoId);

    // get citas de paciente
    @Query("SELECT c FROM Cita c WHERE c.paciente.id = :pacienteId")
    List<Cita> getCitasByPacienteId(@Param("pacienteId") Long pacienteId);
}
