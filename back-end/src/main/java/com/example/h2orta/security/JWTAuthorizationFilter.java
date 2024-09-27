package com.example.h2orta.security;

import java.io.IOException;
import java.util.Optional;

import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.web.authentication.www.BasicAuthenticationFilter;

import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;

public class JWTAuthorizationFilter extends BasicAuthenticationFilter {

    private JWTUtil jwtUtil;
    private UserDetailsService userDetailsService;

    public JWTAuthorizationFilter(AuthenticationManager authenticationManager, JWTUtil jwtUtil,
            UserDetailsService userDetailsService) {
        super(authenticationManager);
        this.jwtUtil = jwtUtil;
        this.userDetailsService = userDetailsService;
    }

    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response,
            FilterChain filterChain) throws IOException, ServletException {

        var authorizationHeader = request.getHeader("Authorization");
        if (authorizationHeader != null && authorizationHeader.startsWith("Bearer ")) {
            var token = authorizationHeader.substring(7);
            getAuthentication(token).ifPresent(auth -> SecurityContextHolder.getContext().setAuthentication(auth));
        }
        filterChain.doFilter(request, response);
    }

    private Optional<UsernamePasswordAuthenticationToken> getAuthentication(String token) {

        if (jwtUtil.isValidToken(token)) {
            var username = jwtUtil.getUsername(token);
            var user = userDetailsService.loadUserByUsername(username);
            return Optional.ofNullable(new UsernamePasswordAuthenticationToken(user, null, user.getAuthorities()));
        }
        return Optional.empty();
    }

}
