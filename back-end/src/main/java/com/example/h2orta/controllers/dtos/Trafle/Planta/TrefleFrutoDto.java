package com.example.h2orta.controllers.dtos.Trafle.Planta;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class TrefleFrutoDto {
    private Boolean conspicuous;
    private List<String> color;
    private String shape;
    private Boolean seed_persistence;
}
