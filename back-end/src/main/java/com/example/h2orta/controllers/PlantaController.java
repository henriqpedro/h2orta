package com.example.h2orta.controllers;

import com.example.h2orta.controllers.dtos.Planta.PlantaDto;
import com.example.h2orta.services.PlantaService;
import lombok.AllArgsConstructor;

import java.util.List;
import java.util.stream.Collectors;

import org.modelmapper.ModelMapper;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/planta")
@Validated
@AllArgsConstructor
public class PlantaController {

    private PlantaService service;

    @GetMapping
    public ResponseEntity<List<PlantaDto>> findAll(@RequestParam int page, @RequestParam int items) throws Exception {
        var mapper = new ModelMapper();
        var plantas = service.findAll(page, items);
        var dto = plantas.stream()
                .map(planta -> mapper.map(planta, PlantaDto.class))
                .collect(Collectors.toList());
        return new ResponseEntity<>(dto, HttpStatus.OK);

    }

    @GetMapping("/{id}")
    public ResponseEntity<PlantaDto> findById(@PathVariable Long id) throws Exception {
        var mapper = new ModelMapper();

        var planta = service.findById(id);
        var dto = mapper.map(planta, PlantaDto.class);

        return new ResponseEntity<>(dto, HttpStatus.OK);
    }



}
