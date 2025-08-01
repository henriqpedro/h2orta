package com.example.h2orta.models;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.SQLDelete;
import org.hibernate.annotations.Where;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "planta")
@SQLDelete(sql = "UPDATE planta SET deletado = FALSE WHERE id = ?")
@Where(clause = "deletado = FALSE")
public class Planta {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false, unique = true)
    @Size(min = 2, max = 255)
    @NotBlank
    private String nome;

    @Column(nullable = false)
    @Size(min = 2, max = 255)
    @NotBlank
    private String familia;

    @Column(nullable = false)
    @Size(min = 2, max = 255)
    @NotBlank
    private String habitat;

    @Column(nullable = false, length = 1024)
    @Size(min = 2, max = 1024)
    @NotBlank
    private String descricao;

    @Size(max = 255)
    private String imagem;

    @Column(nullable = false)
    @NotNull
    private Integer minUmidade;

    @Column(nullable = false)
    @NotNull
    private Integer maxUmidade;

    @Column(nullable = false)
    @NotNull
    private Integer minTemperatura;

    @Column(nullable = false)
    @NotNull
    private Integer maxTemperatura;

    @Column(nullable = false)
    @NotNull
    private Integer minAltura;

    @Column(nullable = false)
    @NotNull
    private Integer maxAltura;

    @Column(nullable = false)
    @NotNull
    private Boolean deletado = Boolean.FALSE;
}
