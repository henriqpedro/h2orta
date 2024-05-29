package com.example.h2orta.controllers.dtos.Trefle.Planta;

import com.example.h2orta.controllers.dtos.Trefle.Medida.TrefleCmDto;
import com.example.h2orta.controllers.dtos.Trefle.Medida.TrefleMmDto;
import com.example.h2orta.controllers.dtos.Trefle.Medida.TrefleDegDto;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class TrefleCrescimentoDto {
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
    private TrefleCmDto row_spacing;
    private TrefleCmDto spread;
    private TrefleMmDto minimum_precipitation;
    private TrefleMmDto maximum_precipitation;
    private TrefleCmDto minimum_root_depth;
    private TrefleDegDto minimum_temperature;
    private TrefleDegDto maximum_temperature;
    private Integer soil_nutriments;
    private Integer soil_salinity;
    private Integer soil_texture;
    private Integer soil_humidity;
}
