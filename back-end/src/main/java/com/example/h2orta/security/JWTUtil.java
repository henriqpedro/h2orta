package com.example.h2orta.security;

import java.util.Date;
import java.util.Optional;

import javax.crypto.SecretKey;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.security.Keys;

@Component
public class JWTUtil {

    @Value("${jwt.secret}")
    private String secret;

    @Value("${jwt.expiration}")
    private String expiration;

    private SecretKey getSecretKey() {
        return Keys.hmacShaKeyFor(secret.getBytes());
    }

    public String generateToken(String username) {
        var key = getSecretKey();
        return Jwts.builder()
                .setSubject(username)
                .setExpiration(new Date(System.currentTimeMillis() + Integer.parseInt(expiration)))
                .signWith(key)
                .compact();
    }

    public boolean isValidToken(String token) {
        return getClaims(token).map(claim -> {
            var userName = claim.getSubject();
            var expirationDate = claim.getExpiration();
            var now = new Date(System.currentTimeMillis());
            return userName != null && expirationDate != null && now.before(expirationDate);
        }).orElse(false);
    }

    public String getUsername(String token) {
        return getClaims(token)
                .map(Claims::getSubject)
                .orElse(null);
    }

    private Optional<Claims> getClaims(String token) {
        var key = getSecretKey();
        try {
            return Optional.ofNullable(Jwts.parserBuilder()
                    .setSigningKey(key)
                    .build()
                    .parseClaimsJws(token)
                    .getBody());
        } catch (Exception e) {
            return Optional.empty();
        }
    }
}
