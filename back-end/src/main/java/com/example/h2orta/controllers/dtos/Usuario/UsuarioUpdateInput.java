package com.example.h2orta.controllers.dtos.Usuario;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Date;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class UsuarioUpdateInput {

    @NotNull(message = "ID do usuário não informado")
    private Long id;

    @Size(min = 2, max = 128, message = "Nome do usuário deve conter entre 2 e 128 caracteres")
    @NotBlank(message = "Nome do usuário não informado")
    private String nome;

    @Size(min = 2, max = 255, message = "E-mail deve conter entre 2 e 255 caracteres")
    @NotBlank(message = "E-mail não informado")
    private String email;

    @NotNull(message = "Data de nascimento não informada")
    private Date dataDeNascimento;
}
