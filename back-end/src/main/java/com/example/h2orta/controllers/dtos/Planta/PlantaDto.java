package com.example.h2orta.controllers.dtos.Planta;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class PlantaDto  {

    private Long id;

    @Size(min = 2, max = 255)
    @NotBlank
    private String nome;

    @Size(min = 2, max = 255)
    @NotBlank
    private String familia;

    @Size(min = 2, max = 255)
    @NotBlank
    private String habitat;

    @Size(min = 2, max = 1024)
    @NotBlank
    private String descricao;

    @Size(max = 255)
    private String imagem;

    @NotNull
    private Integer minUmidade;

    @NotNull
    private Integer maxUmidade;

    @NotNull
    private Integer minTemperatura;

    @NotNull
    private Integer maxTemperatura;

    @NotNull
    private Integer minAltura;

    @NotNull
    private Integer maxAltura;
}
