package com.example.h2orta.repositories;

import com.example.h2orta.models.Vaso;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface VasoRepository extends JpaRepository<Vaso, Long> {
}
