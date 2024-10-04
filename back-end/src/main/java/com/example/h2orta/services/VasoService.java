package com.example.h2orta.services;

import com.example.h2orta.models.Usuario;
import com.example.h2orta.models.Vaso;
import com.example.h2orta.repositories.VasoRepository;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.UUID;
import java.util.stream.Collectors;

@Service
@AllArgsConstructor
public class VasoService {

    private VasoRepository repository;
    private PlantaService plantaService;
    private UsuarioService usuarioService;

    public Vaso findById(long id) throws Exception {
        var loggedUser = UsuarioService.getAuthenticated()
                .orElseThrow(() -> new Exception("Acesso negado: usuário sem login!"));
        var vaso = repository.findById(id)
                .orElseThrow(() -> new Exception("Vaso não encontrado!"));
        if (vaso.getUsuario().getId() != loggedUser.getId())
            throw new Exception("Acesso negado: usuário sem permissão!");
        return vaso;
    }

    public List<Vaso> findAllByUsuario() throws Exception {
        var loggedUser = UsuarioService.getAuthenticated()
                .orElseThrow(() -> new Exception("Acesso negado: usuário sem login!"));
        return repository.findAllByUsuarioId(loggedUser.getId());
    }

    public List<Vaso> findAllByCodigoCompartilhado(UUID codigoCompartilhado) throws Exception {
        var usuario = usuarioService.findByCodigoCompartilhado(codigoCompartilhado);
        return usuario.getVasos()
                .stream()
                .filter(Vaso::getCompartilhado)
                .collect(Collectors.toList());
    }

    @Transactional
    public Vaso create(Vaso vaso) throws Exception {
        var loggedUser = UsuarioService.getAuthenticated()
                .orElseThrow(() -> new Exception("Acesso negado: usuário sem login!"));
                
        var usuario = usuarioService.findById(loggedUser.getId());
        vaso.setUsuario(usuario);

        var planta = plantaService.findById(vaso.getPlanta().getId());
        vaso.setPlanta(planta);

        vaso.setId(null);
        return repository.save(vaso);
    }

    @Transactional
    public Vaso update(Vaso vaso) throws Exception {
        var existingVaso = findById(vaso.getId());

        var planta = plantaService.findById(existingVaso.getPlanta().getId());
        existingVaso.setPlanta(planta);

        return repository.save(existingVaso);
    }

    public void delete(Long id) throws Exception {
        var vaso = findById(id);
        repository.delete(vaso);
    }
}
