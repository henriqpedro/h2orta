package com.example.h2orta.services;

import com.example.h2orta.models.Planta;
import com.example.h2orta.repositories.PlantaRepository;
import lombok.AllArgsConstructor;

import java.util.List;

import org.springframework.stereotype.Service;

@Service
@AllArgsConstructor
public class PlantaService {

    public PlantaRepository repository;

    public Planta findById(long id) throws Exception {
        return repository.findById(id)
                .orElseThrow(() -> new Exception("Planta não encontrada!"));
    }

    public List<Planta> findAll() {
        return repository.findAll();
    }
}
