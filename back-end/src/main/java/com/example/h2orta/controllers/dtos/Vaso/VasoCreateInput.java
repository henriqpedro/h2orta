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
public class VasoCreateInput {

    @NotBlank(message = "Identificador do dispositivo não informado")
    @Size(min = 2, max = 255, message = "Identificador do dispositivo deve conter entre 2 e 255 caracteres")
    private String arduino;

    @NotBlank(message = "Apelido do vaso não informado")
    @Size(min = 2, max = 50, message = "Apelido deve conter entre 2 e 50 caracteres")
    private String apelido;

    @NotNull(message = "Planta não informada")
    private Long plantaId;

    @NotNull(message = "Estado de compartilhamento não informado")
    private Boolean compartilhado = Boolean.FALSE;
}
