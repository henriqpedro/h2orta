package com.example.h2orta.controllers;

import com.example.h2orta.controllers.dtos.Vaso.VasoCreateInput;
import com.example.h2orta.controllers.dtos.Vaso.VasoDto;
import com.example.h2orta.controllers.dtos.Vaso.VasoUpdateInput;
import com.example.h2orta.models.Vaso;
import com.example.h2orta.responses.StandardApiResponses;
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

@Validated
@RestController
@RequestMapping("/vaso")
@AllArgsConstructor
public class VasoController implements StandardApiResponses {

    private VasoService service;

    @GetMapping("/{id}")
    public ResponseEntity<VasoDto> findById(@PathVariable Long id) {
        var mapper = new ModelMapper();

        var vaso = service.findById(id);
        var dto = mapper.map(vaso, VasoDto.class);

        return new ResponseEntity<>(dto, HttpStatus.OK);
    }

    @GetMapping
    public ResponseEntity<List<VasoDto>> findAllByUsuario() {
        var mapper = new ModelMapper();

        var vasos = service.findAllByUsuario();
        var dtoList = vasos.stream()
                .map(vaso -> mapper.map(vaso, VasoDto.class))
                .collect(Collectors.toList());

        return new ResponseEntity<>(dtoList, HttpStatus.OK);
    }

    @GetMapping("/codigo/{codigo}")
    public ResponseEntity<List<VasoDto>> findAllByCodigoCompartilhado(@PathVariable UUID codigo) {
        var mapper = new ModelMapper();

        var vasos = service.findAllByCodigoCompartilhado(codigo);
        var dtoList = vasos.stream()
                .map(vaso -> mapper.map(vaso, VasoDto.class))
                .collect(Collectors.toList());

        return new ResponseEntity<>(dtoList, HttpStatus.OK);
    }

    @PostMapping
    public ResponseEntity<VasoDto> create(@Valid @RequestBody VasoCreateInput input) {
        var mapper = new ModelMapper();

        var vaso = mapper.map(input, Vaso.class);
        vaso = service.create(vaso);

        var dto = mapper.map(vaso, VasoDto.class);
        return new ResponseEntity<>(dto, HttpStatus.OK);
    }

    @PutMapping
    public ResponseEntity<VasoDto> update(@Valid @RequestBody VasoUpdateInput input) {
        var mapper = new ModelMapper();

        var vaso = mapper.map(input, Vaso.class);
        vaso = service.update(vaso);

        var dto = mapper.map(vaso, VasoDto.class);
        return new ResponseEntity<>(dto, HttpStatus.OK);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable Long id) throws Exception {
        service.delete(id);
        return new ResponseEntity<>(HttpStatus.OK);
    }
}
