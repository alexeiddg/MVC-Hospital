package com.alexeiddg.mvcproject.model.DAO;

import com.alexeiddg.mvcproject.model.object.Cita;
import com.alexeiddg.mvcproject.model.object.Enfermera;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;


@Repository
public interface EnfermeraRepository extends JpaRepository<Enfermera, Long> {

    // get citas de enfermera
    @Query("SELECT c FROM Cita c WHERE c.enfermera.id = :id")
    List<Cita> getCitasByEnfermeraId(@Param("id") Long enfermeraId);
}
