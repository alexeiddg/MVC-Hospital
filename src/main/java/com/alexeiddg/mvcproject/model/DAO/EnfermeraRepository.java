package com.alexeiddg.mvcproject.model.DAO;

import com.alexeiddg.mvcproject.model.object.Enfermera;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;


@Repository
public interface EnfermeraRepository extends JpaRepository<Enfermera, Long> {
    // impl
}
