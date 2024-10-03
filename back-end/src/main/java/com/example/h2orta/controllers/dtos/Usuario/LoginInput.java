package com.example.h2orta.controllers.dtos.Usuario;

import jakarta.validation.constraints.NotBlank;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class LoginInput {

    @NotBlank
    public String usuario;

    @NotBlank
    public String senha;
}
