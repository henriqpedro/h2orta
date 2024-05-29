package com.example.h2orta.controllers.dtos.Trafle;
import com.example.h2orta.controllers.dtos.Trafle.Links.TrefleLinksPlantaDto;
import com.example.h2orta.controllers.dtos.Trafle.Links.TrefleSource;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class TreflePlantaDto {
    private Integer id;
    private String common_name;
    private String slug;
    private String scientific_name;
    private Integer year;
    private String bibliography;
    private String author;
    private String family_common_name;
    private Integer genus_id;
    private Integer main_species_id;
    private Boolean vegetable;
    private String observations;
    private TrefleEspeciesDetalhadoDto[] main_species;
    private TrefleSource[] sources;
    private TrefleLinksPlantaDto links;
}

