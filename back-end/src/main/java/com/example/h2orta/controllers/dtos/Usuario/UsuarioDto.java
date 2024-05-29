package com.example.h2orta.controllers.dtos.Usuario;

import com.example.h2orta.models.Vaso;
import com.fasterxml.jackson.annotation.JsonProperty;
import jakarta.persistence.Column;
import jakarta.persistence.OneToMany;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;
import java.util.UUID;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class UsuarioDto {

    private Long id;

    @Size(min = 2, max = 128)
    @NotBlank
    private String nome;

    @Size(min = 2, max = 255)
    @NotBlank
    private String email;

    @Column(nullable = false, unique = true)
    @NotNull
    private UUID codigoCompartilhamento;

    @Column(nullable = false)
    @NotNull
    private Boolean deletado = Boolean.FALSE;

    @JsonProperty(access = JsonProperty.Access.READ_ONLY)
    @OneToMany(mappedBy = "usuario")
    private List<Vaso> vasos;
}
