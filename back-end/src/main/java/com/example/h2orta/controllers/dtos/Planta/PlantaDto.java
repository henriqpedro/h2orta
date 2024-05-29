package com.example.h2orta.controllers.dtos.Planta;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import lombok.Data;

@Data
public class PlantaDto  {

    private Long id;

    @Size(min = 2, max = 1024)
    @NotBlank
    private String traffleSlug;

    @Size(min = 2, max = 256)
    @NotBlank
    private String nome;

    @Size(min = 2, max = 256)
    @NotBlank
    private String familia;

    @Size(min = 2, max = 1024)
    @NotBlank
    private String descricao;

    @Size(max = 1024)
    private String imagemUrl;

    @NotNull
    private Integer umidade;

    @NotNull
    private Integer minTemperatura;

    @NotNull
    private Integer maxTemperatura;
}
