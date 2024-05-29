package com.example.h2orta.controllers.dtos.Trafle.Imagem;

import lombok.Data;

import java.util.List;

@Data
public class TrafleImagesDto {
    private List<TrafleImageDto> flower;
    private List<TrafleImageDto> leaf;
    private List<TrafleImageDto> habit;
    private List<TrafleImageDto> fruit;
    private List<TrafleImageDto> bark;
    private List<TrafleImageDto> other;
}
