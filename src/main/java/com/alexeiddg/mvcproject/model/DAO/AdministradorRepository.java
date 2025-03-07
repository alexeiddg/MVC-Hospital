package com.alexeiddg.mvcproject.model.DAO;

import com.alexeiddg.mvcproject.model.object.Administrador;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;


@Repository
public interface AdministradorRepository extends JpaRepository<Administrador, Long> {
    // impl
}
