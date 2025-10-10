package com.example.h2orta.controllers;

import com.example.h2orta.controllers.dtos.Usuario.LoginInput;
import com.example.h2orta.controllers.dtos.Usuario.UsuarioCreateInput;
import com.example.h2orta.controllers.dtos.Usuario.UsuarioDto;
import com.example.h2orta.controllers.dtos.Usuario.UsuarioUpdateInput;
import com.example.h2orta.models.Usuario;
import com.example.h2orta.responses.StandardApiResponses;
import com.example.h2orta.services.UsuarioService;
import jakarta.validation.Valid;
import lombok.AllArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

@Validated
@RestController
@RequestMapping("/usuario")
@AllArgsConstructor
public class UsuarioController implements StandardApiResponses {

    private UsuarioService service;

    @PostMapping("login")
    public ResponseEntity<String> login(@Valid @RequestBody LoginInput input) {
        var token = service.login(input.usuario, input.senha);
        return new ResponseEntity<>(token, HttpStatus.OK);
    }

    @GetMapping("/{id}")
    public ResponseEntity<UsuarioDto> findById(@PathVariable Long id) {
        var mapper = new ModelMapper();

        var usuario = service.findById(id);
        var dto = mapper.map(usuario, UsuarioDto.class);

        return new ResponseEntity<>(dto, HttpStatus.OK);
    }

    @GetMapping
    public ResponseEntity<UsuarioDto> find() {
        var mapper = new ModelMapper();

        var usuario = service.find();
        var dto = mapper.map(usuario, UsuarioDto.class);

        return new ResponseEntity<>(dto, HttpStatus.OK);
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
    public ResponseEntity<UsuarioDto> update(@Valid @RequestBody UsuarioUpdateInput input) throws Exception {
        var mapper = new ModelMapper();

        var usuario = mapper.map(input, Usuario.class);
        usuario = service.update(usuario);

        var dto = mapper.map(usuario, UsuarioDto.class);
        return new ResponseEntity<>(dto, HttpStatus.OK);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable Long id) throws Exception {
        service.delete(id);
        return new ResponseEntity<>(HttpStatus.OK);
    }
}
