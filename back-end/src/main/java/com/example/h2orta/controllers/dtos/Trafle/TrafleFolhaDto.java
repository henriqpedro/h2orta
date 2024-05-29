package com.example.h2orta.controllers.dtos.Trafle;

import lombok.Data;

import java.util.List;

@Data
public class TrafleFolhaDto {
    private String texture;
    private List<String> color;
    private Boolean leaf_retention;
}
