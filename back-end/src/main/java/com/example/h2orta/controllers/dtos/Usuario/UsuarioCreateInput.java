package com.example.h2orta.controllers.dtos.Usuario;

import java.util.Date;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class UsuarioCreateInput {

    private Long id;

    @Size(min = 2, max = 128)
    @NotBlank
    private String nome;

    @Size(min = 2, max = 16)
    @NotBlank
    private String usuario;

    @Size(min = 2, max = 255)
    @NotBlank
    private String email;

    @NotNull
    private Date dataDeNascimento;

    @NotBlank
    private String senha;
}
