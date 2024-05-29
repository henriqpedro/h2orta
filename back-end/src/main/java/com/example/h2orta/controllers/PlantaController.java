package com.example.h2orta.controllers;

import com.example.h2orta.controllers.dtos.Planta.PlantaDto;
import com.example.h2orta.controllers.dtos.Trafle.TrefleEspeciesDto;
import com.example.h2orta.controllers.dtos.Trafle.TreflePlantaDto;
import com.example.h2orta.services.PlantaService;
import com.fasterxml.jackson.databind.ObjectMapper;
import lombok.AllArgsConstructor;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/planta")
@Validated
@AllArgsConstructor
public class PlantaController {

    private PlantaService service;

    @GetMapping("/{id}")
    public ResponseEntity<PlantaDto> findById(@PathVariable Long id) throws Exception {
        var planta = service.findById(id);
        var mapper = new ObjectMapper();
        var dto = mapper.convertValue(planta, PlantaDto.class);
        return new ResponseEntity<>(dto, HttpStatus.OK);
    }

    @GetMapping("/{search}/{page}")
    public ResponseEntity<List<TrefleEspeciesDto>> getTraflePlants(@PathVariable String search, @PathVariable int page) throws Exception {
        var dtoList = service.getTraflePlants(search, page);
        return new ResponseEntity<>(dtoList, HttpStatus.OK);
    }

    @GetMapping("/{slug}")
    public ResponseEntity<TreflePlantaDto> getTraflePlantBySlug(@PathVariable String slug) throws Exception {
        var dto = service.getTraflePlantBySlug(slug);
        return new ResponseEntity<>(dto, HttpStatus.OK);
    }
}
