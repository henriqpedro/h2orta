package com.example.h2orta.controllers.dtos.Trafle;

import lombok.Data;

import java.util.List;

@Data
public class TrafleFrutoDto {
    private Boolean conspicuous;
    private List<String> color;
    private String shape;
    private Boolean seed_persistence;
}
