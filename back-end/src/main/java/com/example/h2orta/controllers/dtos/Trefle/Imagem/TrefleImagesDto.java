package com.example.h2orta.controllers.dtos.Trefle.Imagem;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class TrefleImagesDto {
    private TrefleImageDto[] flower;
    private TrefleImageDto[] leaf;
    private TrefleImageDto[] habit;
    private TrefleImageDto[] fruit;
    private TrefleImageDto[] bark;
    private TrefleImageDto[] other;
}
