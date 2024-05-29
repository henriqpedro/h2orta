package com.example.h2orta.controllers.dtos.Trafle;

import com.example.h2orta.controllers.dtos.Trafle.Medida.TrafleCmDto;
import lombok.Data;

@Data
public class TrafleEspecificacoesDto {
    private String ligneous_type;
    private String growth_form;
    private String growth_habit;
    private String growth_rate;
    private TrafleCmDto average_height;
    private TrafleCmDto maximum_height;
    private String nitrogen_fixation;
    private String shape_and_orientation;
    private String toxicity;
}
