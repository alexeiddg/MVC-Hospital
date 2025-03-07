package com.alexeiddg.mvcproject.model.DAO;

import com.alexeiddg.mvcproject.model.object.Usuario;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;


@Repository
public interface UsuarioRepository extends JpaRepository<Usuario, Long> {
    // impl
}
