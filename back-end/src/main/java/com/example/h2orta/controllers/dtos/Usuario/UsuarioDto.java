package com.example.h2orta.controllers.dtos.Usuario;

import com.example.h2orta.controllers.dtos.Vaso.VasoDto;
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

import java.util.Date;
import java.util.List;
import java.util.UUID;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class UsuarioDto {

    private Long id;

    @Size(min = 2, max = 128, message = "Nome do usuário deve conter entre 2 e 128 caracteres")
    @NotBlank(message = "Nome do usuário não informado")
    private String nome;

    @Size(min = 2, max = 16, message = "Usuário deve conter entre 2 e 16 caracteres")
    @NotBlank(message = "Usuário não informado")
    private String usuario;

    @Size(min = 2, max = 255, message = "E-mail deve conter entre 2 e 255 caracteres")
    @NotBlank(message = "E-mail não informado")
    private String email;

    @NotNull(message = "Data de nascimento não informada")
    private Date dataDeNascimento;

    @NotNull(message = "Código compartilhado não informado")
    private UUID codigoCompartilhado;

    @NotNull(message = "Estado do registro não informado")
    private Boolean deletado = Boolean.FALSE;

    @JsonProperty(access = JsonProperty.Access.READ_ONLY)
    @OneToMany(mappedBy = "usuario")
    private List<VasoDto> vasos;
}
