package com.example.h2orta.controllers.dtos.Trefle.Links;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class TrefleSource {
    private String id;
    private String name;
    private String url;
    private String last_update;
    private String citation;
}
