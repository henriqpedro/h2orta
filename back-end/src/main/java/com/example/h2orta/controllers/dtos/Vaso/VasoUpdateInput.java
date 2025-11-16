package com.example.h2orta.controllers.dtos.Vaso;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class VasoUpdateInput {

    @NotNull(message = "ID do vaso não informado")
    private Long id;

    @NotBlank(message = "Apelido do vaso não informado")
    @Size(min = 2, max = 50, message = "Apelido deve conter entre 2 e 50 caracteres")
    private String apelido;

    @NotNull(message = "Planta não informada")
    private Long plantaId;

    @NotNull(message = "Estado de compartilhamento não informado")
    private Boolean compartilhado = Boolean.FALSE;
}
