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

    @Column(nullable = false, length = 256, unique = true)
    @Size(min = 2, max = 1024)
    @NotBlank
    private String traffleSlug;

    @Column(nullable = false, length = 256, unique = true)
    @Size(min = 2, max = 256)
    @NotBlank
    private String nome;

    @Column(nullable = false, length = 256)
    @Size(min = 2, max = 256)
    @NotBlank
    private String familia;

    @Column(nullable = false, length = 1024)
    @Size(min = 2, max = 1024)
    @NotBlank
    private String descricao;

    @Column(length = 256)
    @Size(max = 1024)
    private String imagemUrl;

    @Column(nullable = false)
    @NotNull
    private Integer umidade;

    @NotNull
    private Integer minTemperatura;

    @NotNull
    private Integer maxTemperatura;

    private Boolean deletado = Boolean.FALSE;
}
