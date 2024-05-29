package com.example.h2orta.controllers.dtos.Trafle;
import com.example.h2orta.controllers.dtos.Trafle.Imagem.TrafleImagesDto;
import lombok.Data;

@Data
public class TraflePlantaDto {
    private Integer id;
    private String common_name;
    private String slug;
    private String scientific_name;
    private String family;
    private String image_url;
    private String duration;
    private String observations;
    private TrafleImagesDto images;
    private Boolean vegetable;
    private TrafleFlorDto flower;
    private TrafleFolhaDto foliage;
    private TrafleFrutoDto fruit_or_seed;
    private TrafleEspecificacoesDto specifications;
}

