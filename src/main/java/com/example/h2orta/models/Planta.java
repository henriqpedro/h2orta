package com.example.h2orta.models;


import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@NoArgsConstructor
@AllArgsConstructor
@Data
@Entity
@Table(name = "planta")
public class Planta {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false, length = 256, unique = true)
    @Size(min = 2, max = 256)
    @NotBlank
    private String nome;

    @Column(nullable = false, length = 256)
    @NotBlank
    @Size(min = 2, max = 256)
    private String familia;

    @Column(nullable = false, length = 1024)
    @NotBlank
    @Size(min = 2, max = 1024)
    private String descricao;

    @Column(nullable = false)
    @NotNull
    private Integer umidade;

    @NotNull
    private Integer temperatura;
}
