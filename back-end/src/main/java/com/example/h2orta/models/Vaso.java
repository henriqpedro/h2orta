package com.example.h2orta.models;

import jakarta.persistence.*;
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
@Table(name = "vaso")
@SQLDelete(sql = "UPDATE vaso SET deletado = TRUE WHERE id = ?")
@Where(clause = "deletado = FALSE")
public class Vaso {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    @Size(min = 2, max = 255)
    private String arduino;

    @Column(nullable = false)
    @Size(min = 2, max = 50)
    private String apelido;

    @ManyToOne
    @JoinColumn(name = "usuario_id", nullable = false)
    private Usuario usuario;

    @ManyToOne
    @JoinColumn(name = "planta_id", nullable = false)
    private Planta planta;

    @Column(nullable = false)
    @NotNull
    private Boolean compartilhado = Boolean.FALSE;

    @Column(nullable = false)
    @NotNull
    private Boolean deletado = Boolean.FALSE;
}
