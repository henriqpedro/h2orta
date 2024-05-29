package com.example.h2orta.controllers.dtos.Trefle;

import com.example.h2orta.controllers.dtos.Trefle.Imagem.TrefleImagesDto;
import com.example.h2orta.controllers.dtos.Trefle.Links.TrefleSource;
import com.example.h2orta.controllers.dtos.Trefle.Planta.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class TrefleEspeciesDetalhadoDto extends TrefleEspeciesDto {
    private String[] duration;
    private String[] editable_part;
    private Boolean editable;
    private Boolean vegetable;
    private String observations;
    private TrefleImagesDto images;
    private TrefleFlorDto flower;
    private TrefleFolhaDto foliage;
    private TrefleFrutoDto fruit_or_seed;
    private TrefleEspecificacoesDto specifications;
    private TrefleCrescimentoDto growth;
    private TrefleSource[] sources;
}
