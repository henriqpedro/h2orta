package com.example.h2orta.services;

import com.example.h2orta.models.Vaso;
import com.example.h2orta.repositories.VasoRepository;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;
import java.util.UUID;
import java.util.stream.Collectors;

@Service
@AllArgsConstructor
public class VasoService {

    private VasoRepository repository;
    private PlantaService plantaService;
    private UsuarioService usuarioService;

    public Vaso findById(long id) {
        var loggedUser = UsuarioService.getAuthenticated()
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.UNAUTHORIZED,
                        "Acesso negado: usuário sem login!"));
        var vaso = repository.findById(id)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Vaso não encontrado!"));
        if (vaso.getUsuario().getId() != loggedUser.getId())
            throw new ResponseStatusException(HttpStatus.UNAUTHORIZED, "Acesso negado: usuário sem permissão!");
        return vaso;
    }

    public List<Vaso> findAllByUsuario() {
        var loggedUser = UsuarioService.getAuthenticated()
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.UNAUTHORIZED,
                        "Acesso negado: usuário sem login!"));
        return repository.findAllByUsuarioId(loggedUser.getId());
    }

    public List<Vaso> findAllByCodigoCompartilhado(UUID codigoCompartilhado) {
        var usuario = usuarioService.findByCodigoCompartilhado(codigoCompartilhado);
        return usuario.getVasos()
                .stream()
                .filter(Vaso::getCompartilhado)
                .collect(Collectors.toList());
    }

    @Transactional
    public Vaso create(Vaso vaso) {
        var loggedUser = UsuarioService.getAuthenticated()
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.UNAUTHORIZED,
                        "Acesso negado: usuário sem login!"));

        if (Boolean.TRUE.equals(repository.existsByArduino(vaso.getArduino())))
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Vaso H2orta já está sendo utilizado por outra plantinha");
        var usuario = usuarioService.findById(loggedUser.getId());
        vaso.setUsuario(usuario);

        var planta = plantaService.findById(vaso.getPlanta().getId());
        vaso.setPlanta(planta);

        vaso.setId(null);
        return repository.save(vaso);
    }

    @Transactional
    public Vaso update(Vaso vaso) {
        var existingVaso = findById(vaso.getId());
        existingVaso.setApelido(vaso.getApelido());
        existingVaso.setCompartilhado(vaso.getCompartilhado());
        var planta = plantaService.findById(vaso.getPlanta().getId());
        existingVaso.setPlanta(planta);
        return repository.save(existingVaso);
    }

    public void delete(Long id) {
        var vaso = findById(id);
        repository.delete(vaso);
    }
}
