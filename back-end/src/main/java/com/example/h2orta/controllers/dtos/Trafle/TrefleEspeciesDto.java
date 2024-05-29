package com.example.h2orta.controllers.dtos.Trafle;

import com.example.h2orta.controllers.dtos.Trafle.Links.TrefleLinksEspecieDto;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class TrefleEspeciesDto {
    private Integer id;
    private String common_name;
    private String slug;
    private String scientific_name;
    private Integer year;
    private String bibliography;
    private String author;
    private String status;
    private String rank;
    private String family_common_name;
    private String family;
    private Integer genus_id;
    private String genus;
    private String image_url;
    private TrefleLinksEspecieDto links;
    private String[] synonyms;
}
