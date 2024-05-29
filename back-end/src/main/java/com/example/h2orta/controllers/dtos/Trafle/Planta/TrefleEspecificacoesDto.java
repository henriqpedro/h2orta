package com.example.h2orta.controllers.dtos.Trafle.Planta;

import com.example.h2orta.controllers.dtos.Trafle.Medida.TrefleCmDto;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class TrefleEspecificacoesDto {
    private String ligneous_type;
    private String growth_form;
    private String growth_habit;
    private String growth_rate;
    private TrefleCmDto average_height;
    private TrefleCmDto maximum_height;
    private String nitrogen_fixation;
    private String shape_and_orientation;
    private String toxicity;
}
