package com.example.h2orta.models;

import com.fasterxml.jackson.annotation.JsonProperty;
import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.SQLDelete;
import org.hibernate.annotations.Where;

import java.util.Date;
import java.util.List;
import java.util.UUID;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "usuario")
@SQLDelete(sql = "UPDATE usuario SET deletado = TRUE WHERE id = ?")
@Where(clause = "deletado = FALSE")
public class Usuario {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false, length = 128)
    @Size(min = 2, max = 128)
    @NotBlank
    private String nome;

    @Column(nullable = false, length = 16)
    @Size(min = 2, max = 16)
    @NotBlank
    private String usuario;

    @Column(nullable = false)
    @Size(min = 2, max = 255)
    @NotBlank
    private String email;

    @JsonProperty(access = JsonProperty.Access.WRITE_ONLY)
    private String senha;

    @Column(nullable = false)
    @NotNull
    private Date dataDeNascimento;

    @Column(nullable = false, unique = true)
    @NotNull
    private UUID codigoCompartilhado;

    @Column(nullable = false)
    @NotNull
    private Boolean deletado = Boolean.FALSE;

    @JsonProperty(access = JsonProperty.Access.READ_ONLY)
    @OneToMany(mappedBy = "usuario")
    private List<Vaso> vasos;
}
