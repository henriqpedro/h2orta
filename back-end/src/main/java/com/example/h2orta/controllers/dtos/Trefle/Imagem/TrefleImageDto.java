package com.example.h2orta.controllers.dtos.Trefle.Imagem;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class TrefleImageDto {
    private Integer id;
    private String image_url;
    private String copyright;
}
