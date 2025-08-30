package com.example.h2orta.controllers.dtos.Usuario;

import jakarta.validation.constraints.NotBlank;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class LoginInput {

    @NotBlank(message = "Usuário não informado")
    public String usuario;

    @NotBlank(message = "Senha não informada")
    public String senha;
}
