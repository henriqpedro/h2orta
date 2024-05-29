package com.example.h2orta.controllers.dtos.Vaso;

import com.example.h2orta.controllers.dtos.Planta.PlantaDto;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class VasoDto {

    private Long id;

    @Size(min = 2, max = 255)
    private String arduino;

    private Integer usuarioId;

    @NotNull
    private PlantaDto planta;

    @NotNull
    private Boolean compartilhado = Boolean.FALSE;
}
