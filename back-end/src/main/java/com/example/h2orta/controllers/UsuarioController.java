package com.example.h2orta.controllers;

import com.example.h2orta.controllers.dtos.Usuario.LoginInput;
import com.example.h2orta.controllers.dtos.Usuario.UsuarioCreateInput;
import com.example.h2orta.controllers.dtos.Usuario.UsuarioDto;
import com.example.h2orta.models.Usuario;
import com.example.h2orta.services.UsuarioService;
import jakarta.validation.Valid;
import lombok.AllArgsConstructor;
import org.modelmapper.ModelMapper;
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
        var mapper = new ModelMapper();

        var usuario = service.findById(id);
        var dto = mapper.map(usuario, UsuarioDto.class);

        return new ResponseEntity<>(dto, HttpStatus.OK);
    }

    @PostMapping("login")
    public ResponseEntity<String> login(@Valid @RequestBody LoginInput input) throws Exception {
        var token = service.login(input.usuario, input.senha);
        return new ResponseEntity<>(token, HttpStatus.OK);
    }

    @PostMapping
    public ResponseEntity<UsuarioDto> create(@Valid @RequestBody UsuarioCreateInput input) {
        var mapper = new ModelMapper();

        var usuario = mapper.map(input, Usuario.class);
        usuario = service.create(usuario);

        var dto = mapper.map(usuario, UsuarioDto.class);
        return new ResponseEntity<>(dto, HttpStatus.OK);
    }

    @PutMapping
    public ResponseEntity<UsuarioDto> update(@Valid @RequestBody UsuarioDto dto) throws Exception {
        var mapper = new ModelMapper();

        var usuario = mapper.map(dto, Usuario.class);
        usuario = service.update(usuario);

        dto = mapper.map(usuario, UsuarioDto.class);
        return new ResponseEntity<>(dto, HttpStatus.OK);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable Long id) throws Exception {
        service.delete(id);
        return new ResponseEntity<>(HttpStatus.OK);
    }
}
