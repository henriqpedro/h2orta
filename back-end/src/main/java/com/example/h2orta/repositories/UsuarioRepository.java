package com.example.h2orta.repositories;

import com.example.h2orta.models.Usuario;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import java.util.Optional;
import java.util.UUID;

@Repository
public interface UsuarioRepository extends JpaRepository<Usuario, Long> {
    Optional<Usuario> findByCodigoCompartilhado(UUID codigoCompartilhado);

    @Transactional(readOnly = true)
    Optional<Usuario> findByUsuario(String usuario);
}
