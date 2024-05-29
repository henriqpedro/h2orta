package com.example.h2orta.controllers.dtos.Trafle.Planta;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class TrefleFolhaDto {
    private String texture;
    private List<String> color;
    private Boolean leaf_retention;
}
