package com.example.h2orta.controllers;

import com.example.h2orta.controllers.dtos.Usuario.UsuarioDto;
import com.example.h2orta.models.Usuario;
import com.example.h2orta.services.UsuarioService;
import com.fasterxml.jackson.databind.ObjectMapper;
import jakarta.validation.Valid;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/usuario")
@Validated
@AllArgsConstructor
public class UsuarioController {

    private UsuarioService service;

    @GetMapping("/{id}")
    public ResponseEntity<UsuarioDto> findById(@PathVariable Long id) throws Exception {
        var mapper = new ObjectMapper();

        var usuario = service.findById(id);
        var dto = mapper.convertValue(usuario, UsuarioDto.class);

        return new ResponseEntity<>(dto, HttpStatus.OK);
    }

    @PostMapping
    public ResponseEntity<UsuarioDto> create(@Valid @RequestBody UsuarioDto dto) throws Exception {
        var mapper = new ObjectMapper();

        var usuario = mapper.convertValue(dto, Usuario.class);
        usuario = service.create(usuario);

        dto = mapper.convertValue(usuario, UsuarioDto.class);
        return new ResponseEntity<>(dto, HttpStatus.OK);
    }

    @PutMapping
    public ResponseEntity<UsuarioDto> update(@Valid @RequestBody UsuarioDto dto) throws Exception {
        var mapper = new ObjectMapper();

        var usuario = mapper.convertValue(dto, Usuario.class);
        usuario = service.update(usuario);

        dto = mapper.convertValue(usuario, UsuarioDto.class);
        return new ResponseEntity<>(dto, HttpStatus.OK);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity delete(@PathVariable Long id) throws Exception {
        service.delete(id);
        return new ResponseEntity<>(HttpStatus.OK);
    }
}
