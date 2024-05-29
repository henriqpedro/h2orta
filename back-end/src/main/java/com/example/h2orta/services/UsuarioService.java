package com.example.h2orta.services;

import com.example.h2orta.models.Usuario;
import com.example.h2orta.repositories.UsuarioRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.UUID;

@Service
public class UsuarioService {
    private UsuarioRepository repository;

    public Usuario findById(long id) throws Exception {
        return repository.findById(id)
                .orElseThrow(() -> new Exception("Usuário não encontrado!"));
    }

    public Usuario findByCodigoCompartilhado(UUID codigoCompartilhado) throws Exception {
        return repository.findByCodigoCompartilhado(codigoCompartilhado)
                .orElseThrow(() -> new Exception("Nenhum usuário encontrado com o código " + codigoCompartilhado.toString()));
    }

    @Transactional
    public Usuario create(Usuario usuario) {
        usuario.setId(null);
        return repository.save(usuario);
    }

    @Transactional
    public Usuario update(Usuario usuario) throws Exception {
        var existingUsuario = findById(usuario.getId());
        return repository.save(usuario);
    }

    public void delete(Long id) throws Exception {
        var vaso = findById(id);
        repository.delete(vaso);
    }
}
