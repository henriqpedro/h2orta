package com.example.h2orta.controllers.dtos.Trafle;

import com.example.h2orta.controllers.dtos.Trafle.Medida.TrafleCmDto;
import com.example.h2orta.controllers.dtos.Trafle.Medida.TrafleMmDto;
import com.example.h2orta.controllers.dtos.Trafle.Medida.TrafleDegDto;
import lombok.Data;

import java.util.List;

@Data
public class TrafleCrescimentoDto {
    private Integer days_to_harvest;
    private String description;
    private String sowing;
    private Integer ph_maximum;
    private Integer ph_minimum;
    private Integer light;
    private Integer atmospheric_humidity;
    private List<String> growth_months;
    private List<String> bloom_months;
    private List<String> fruit_months;
    private TrafleCmDto row_spacing;
    private TrafleCmDto spread;
    private TrafleMmDto minimum_precipitation;
    private TrafleMmDto maximum_precipitation;
    private TrafleCmDto minimum_root_depth;
    private TrafleDegDto minimum_temperature;
    private TrafleDegDto maximum_temperature;
    private Integer soil_nutriments;
    private Integer soil_salinity;
    private Integer soil_texture;
    private Integer soil_humidity;
}
