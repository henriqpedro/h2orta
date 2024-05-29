package com.example.h2orta.controllers;

import com.example.h2orta.controllers.dtos.Vaso.VasoDto;
import com.example.h2orta.models.Vaso;
import com.example.h2orta.services.VasoService;
import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.UUID;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/vaso")
@Validated
@AllArgsConstructor
public class VasoController {

    private VasoService service;

    @GetMapping("/{id}")
    public ResponseEntity<VasoDto> findById(@PathVariable Long id) throws Exception {
        var mapper = new ObjectMapper();

        var vaso = service.findById(id);
        var dto = mapper.convertValue(vaso, VasoDto.class);

        return new ResponseEntity<>(dto, HttpStatus.OK);
    }

    @GetMapping("/{codigo}")
    public ResponseEntity<List<VasoDto>> findAllByCodigoCompartilhado(@PathVariable UUID codigo) throws Exception {
        var mapper = new ObjectMapper();

        var vasos = service.findAllByCodigoCompartilhado(codigo);
        var dtoList = mapper.convertValue(vasos, new TypeReference<List<VasoDto>>() {});

        return new ResponseEntity<>(dtoList, HttpStatus.OK);
    }

    @PostMapping
    public ResponseEntity<VasoDto> create(@RequestBody VasoDto dto) throws Exception {
        var mapper = new ObjectMapper();

        var vaso = mapper.convertValue(dto, Vaso.class);
        vaso = service.create(vaso);

        dto = mapper.convertValue(vaso, VasoDto.class);
        return new ResponseEntity<>(dto, HttpStatus.OK);
    }

    @PutMapping
    public ResponseEntity<VasoDto> update(@RequestBody VasoDto dto) throws Exception {
        var mapper = new ObjectMapper();

        var vaso = mapper.convertValue(dto, Vaso.class);
        vaso = service.update(vaso);

        dto = mapper.convertValue(vaso, VasoDto.class);
        return new ResponseEntity<>(dto, HttpStatus.OK);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity delete(@PathVariable Long id) throws Exception {
        service.delete(id);
        return new ResponseEntity<>(HttpStatus.OK);
    }
}
