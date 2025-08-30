package com.example.h2orta.services;

import com.example.h2orta.models.Planta;
import com.example.h2orta.repositories.PlantaRepository;
import lombok.AllArgsConstructor;

import java.util.List;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

@Service
@AllArgsConstructor
public class PlantaService {

    public PlantaRepository repository;

    public Planta findById(long id) {
        UsuarioService.getAuthenticated()
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.UNAUTHORIZED, "Acesso negado: usuário sem login!"));
        return repository.findById(id)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Planta não encontrada!"));
    }

    public Page<Planta> findAll(Integer page, Integer size, String search) {
        UsuarioService.getAuthenticated()
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Acesso negado: usuário sem login!"));
        if (search == null || search.isBlank())
            return repository.findAll(PageRequest.of(page, size, Sort.by("nome").ascending()));
        return repository.findByNomeContainingIgnoreCase(search, PageRequest.of(page, size, Sort.by("nome").ascending()));
    }
}
