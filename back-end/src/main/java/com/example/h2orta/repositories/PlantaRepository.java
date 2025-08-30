package com.example.h2orta.repositories;

import com.example.h2orta.models.Planta;

import org.jetbrains.annotations.NotNull;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface PlantaRepository extends JpaRepository<Planta, Long> {
    @NotNull Page<Planta> findByNomeContainingIgnoreCase(String nome, @NotNull Pageable pageable);
    @NotNull Page<Planta> findAll(@NotNull Pageable pageable);
}
