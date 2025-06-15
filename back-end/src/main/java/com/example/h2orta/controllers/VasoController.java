package com.example.h2orta.controllers;

import com.example.h2orta.controllers.dtos.Vaso.VasoDto;
import com.example.h2orta.models.Vaso;
import com.example.h2orta.services.VasoService;
import jakarta.validation.Valid;
import lombok.AllArgsConstructor;
import org.modelmapper.ModelMapper;
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
        var mapper = new ModelMapper();

        var vaso = service.findById(id);
        var dto = mapper.map(vaso, VasoDto.class);

        return new ResponseEntity<>(dto, HttpStatus.OK);
    }

    @GetMapping
    public ResponseEntity<List<VasoDto>> findAllByUsuario() throws Exception {
        var mapper = new ModelMapper();

        var vasos = service.findAllByUsuario();
        var dtoList = vasos.stream()
                .map(vaso -> mapper.map(vaso, VasoDto.class))
                .collect(Collectors.toList());

        return new ResponseEntity<>(dtoList, HttpStatus.OK);
    }

    @GetMapping("/codigo/{codigo}")
    public ResponseEntity<List<VasoDto>> findAllByCodigoCompartilhado(@PathVariable UUID codigo) throws Exception {
        var mapper = new ModelMapper();

        var vasos = service.findAllByCodigoCompartilhado(codigo);
        var dtoList = vasos.stream()
                .map(vaso -> mapper.map(vaso, VasoDto.class))
                .collect(Collectors.toList());

        return new ResponseEntity<>(dtoList, HttpStatus.OK);
    }

    @PostMapping
    public ResponseEntity<VasoDto> create(@Valid @RequestBody VasoDto dto) throws Exception {
        var mapper = new ModelMapper();

        var vaso = mapper.map(dto, Vaso.class);
        vaso = service.create(vaso);

        dto = mapper.map(vaso, VasoDto.class);
        return new ResponseEntity<>(dto, HttpStatus.OK);
    }

    @PutMapping
    public ResponseEntity<VasoDto> update(@Valid @RequestBody VasoDto dto) throws Exception {
        var mapper = new ModelMapper();

        var vaso = mapper.map(dto, Vaso.class);
        vaso = service.update(vaso);

        dto = mapper.map(vaso, VasoDto.class);
        return new ResponseEntity<>(dto, HttpStatus.OK);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable Long id) throws Exception {
        service.delete(id);
        return new ResponseEntity<>(HttpStatus.OK);
    }
}
