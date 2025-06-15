package com.example.h2orta.services;

import java.util.ArrayList;

import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import com.example.h2orta.repositories.UsuarioRepository;
import com.example.h2orta.security.UserSecurity;

import lombok.AllArgsConstructor;

@Service
@AllArgsConstructor
public class UserSecurityService implements UserDetailsService {

    private UsuarioRepository repository;

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        return repository.findByUsuario(username)
                .map(usuario -> new UserSecurity(
                        usuario.getId(),
                        usuario.getUsuario(),
                        usuario.getSenha(),
                        new ArrayList<>()))
                .orElseThrow(() -> new UsernameNotFoundException("Usuário não encontrado: " + username));
    }

}
