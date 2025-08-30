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
public class PlantaCreateInput {

    @Size(min = 2, max = 255, message = "Nome da planta deve conter entre 2 e 255 caracteres")
    @NotBlank(message = "Nome da planta deve ser informado")
    private String nome;

    @Size(min = 2, max = 255, message = "Família da planta deve conter entre 2 e 255 caracteres")
    @NotBlank(message = "Família da planta deve ser informada")
    private String familia;

    @Size(min = 2, max = 255, message = "Habitat da planta deve conter entre 2 e 255 caracteres")
    @NotBlank(message = "Habitat da planta deve ser informado")
    private String habitat;

    @Size(min = 2, max = 1024, message = "Uso comum deve conter entre 2 e 1024 caracteres")
    @NotBlank(message = "Uso comum deve ser informado")
    private String usoComum;

    @Size(min = 2, max = 255, message = "Ciclo de vida deve conter entre 2 e 255 caracteres")
    @NotBlank(message = "Ciclo de vida deve ser informado")
    private String cicloDeVida;

    @Size(min = 2, max = 1024, message = "Características especiais devem conter entre 2 e 1024 caracteres")
    @NotBlank(message = "Características especiais devem ser informadas")
    private String caracteristicasEspeciais;

    @Size(max = 255, message = "Link para imagem da planta não deve ultrapassar 255 caracteres")
    private String imagem;

    @NotNull(message = "Umidade mínima indicada para a planta não informada")
    private Integer minUmidade;

    @NotNull(message = "Umidade máxima indicada para a planta não informada")
    private Integer maxUmidade;

    @NotNull(message = "Temperatura mínima indicada para a planta não informada")
    private Integer minTemperatura;

    @NotNull(message = "Temperatuda máxima indicada para a planta não informada")
    private Integer maxTemperatura;

    @NotNull(message = "Altura mínima atingida pela planta não informada")
    private Integer minAltura;

    @NotNull(message = "Altura máxima atingida pela planta não informada")
    private Integer maxAltura;
}
