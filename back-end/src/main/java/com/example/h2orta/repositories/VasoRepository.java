package com.example.h2orta.repositories;

import com.example.h2orta.models.Vaso;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface VasoRepository extends JpaRepository<Vaso, Long> {
    List<Vaso> findAllByUsuarioId(Long usuarioId);
}
