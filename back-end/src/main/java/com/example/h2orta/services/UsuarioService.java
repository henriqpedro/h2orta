package com.example.h2orta.services;

import com.example.h2orta.models.Usuario;
import com.example.h2orta.repositories.UsuarioRepository;
import lombok.AllArgsConstructor;

import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.UUID;

@Service
@AllArgsConstructor
public class UsuarioService {

    private BCryptPasswordEncoder bCryptPasswordEncoder;

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
        usuario.setSenha(bCryptPasswordEncoder.encode(usuario.getSenha()));
        usuario.setCodigoCompartilhado(UUID.randomUUID());
        return repository.save(usuario);
    }

    @Transactional
    public Usuario update(Usuario usuario) throws Exception {
        findById(usuario.getId());
        return repository.save(usuario);
    }

    public void delete(Long id) throws Exception {
        var usuario = findById(id);
        repository.delete(usuario);
    }
}
