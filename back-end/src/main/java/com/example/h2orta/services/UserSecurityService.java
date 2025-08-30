package com.example.h2orta.services;

import java.util.ArrayList;

import org.springframework.http.HttpStatus;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.stereotype.Service;

import com.example.h2orta.repositories.UsuarioRepository;
import com.example.h2orta.security.UserSecurity;

import lombok.AllArgsConstructor;
import org.springframework.web.server.ResponseStatusException;

@Service
@AllArgsConstructor
public class UserSecurityService implements UserDetailsService {

    private UsuarioRepository repository;

    @Override
    public UserDetails loadUserByUsername(String username) {
        return repository.findByUsuario(username)
                .map(usuario -> new UserSecurity(
                        usuario.getId(),
                        usuario.getUsuario(),
                        usuario.getSenha(),
                        new ArrayList<>()))
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Usuário não encontrado: " + username));
    }

}
