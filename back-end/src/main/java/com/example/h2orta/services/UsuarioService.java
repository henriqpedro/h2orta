package com.example.h2orta.services;

import com.example.h2orta.models.Usuario;
import com.example.h2orta.repositories.UsuarioRepository;
import lombok.AllArgsConstructor;

import com.example.h2orta.security.JWTUtil;
import com.example.h2orta.security.UserSecurity;

import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.Optional;
import java.util.UUID;

@Service
@AllArgsConstructor
public class UsuarioService {

    private AuthenticationManager authenticationManager;
    private BCryptPasswordEncoder bCryptPasswordEncoder;
    private UsuarioRepository repository;
    private JWTUtil jwtUtil;

    public String login(String usuario, String senha) throws Exception {
        authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(
                        usuario.toUpperCase().trim(),
                        senha,
                        new ArrayList<>()));
        return jwtUtil.generateToken(usuario);
    }

    public Usuario findById(long id) throws Exception {
        var loggedUser = getAuthenticated()
                .orElseThrow(() -> new Exception("Acesso negado: usuário sem login!"));
        if (loggedUser.getId() != id)
            throw new Exception("Acesso negado: usuário sem permissão!");
        return repository.findById(id)
                .orElseThrow(() -> new Exception("Usuário não encontrado!"));
    }

    public Usuario findByCodigoCompartilhado(UUID codigoCompartilhado) throws Exception {
        return repository.findByCodigoCompartilhado(codigoCompartilhado)
                .orElseThrow(() -> new Exception(
                        "Nenhum usuário encontrado com o código " + codigoCompartilhado.toString()));
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

    public static Optional<UserSecurity> getAuthenticated() {
        try {
            return Optional
                    .ofNullable((UserSecurity) SecurityContextHolder.getContext().getAuthentication().getPrincipal());
        } catch (Exception ex) {
            return Optional.empty();
        }
    }
}
