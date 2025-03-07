package com.alexeiddg.mvcproject.model.DAO;

import com.alexeiddg.mvcproject.model.object.Paciente;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;


@Repository
public interface PacienteRepository extends JpaRepository<Paciente, Long> {
    // impl
}
