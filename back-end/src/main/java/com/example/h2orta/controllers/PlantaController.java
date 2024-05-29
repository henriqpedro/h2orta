package com.example.h2orta.controllers;

import com.example.h2orta.controllers.dtos.Planta.PlantaDto;
import com.example.h2orta.controllers.dtos.Trefle.TrefleEspeciesDto;
import com.example.h2orta.controllers.dtos.Trefle.TreflePlantaDto;
import com.example.h2orta.services.PlantaService;
import com.fasterxml.jackson.databind.ObjectMapper;
import jakarta.validation.Valid;
import kotlin.jvm.internal.TypeReference;
import lombok.AllArgsConstructor;

import okhttp3.HttpUrl;
import okhttp3.OkHttpClient;
import okhttp3.Request;
import okhttp3.Response;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Objects;

@RestController
@RequestMapping("/planta")
@Validated
@AllArgsConstructor
public class PlantaController {

    private PlantaService service;

    @GetMapping("/{id}")
    public ResponseEntity<PlantaDto> findById(@PathVariable Long id) throws Exception {
        var mapper = new ObjectMapper();

        var planta = service.findById(id);
        var dto = mapper.convertValue(planta, PlantaDto.class);

        return new ResponseEntity<>(dto, HttpStatus.OK);
    }

    @GetMapping("/{search}/{page}")
    public Response getTraflePlants(@PathVariable String search, @PathVariable int page) throws Exception {
        var baseURL = "https://trefle.io/api/v1";
        var trafleToken = "eNiq4MLgqoXBpdIiGb73SopX1nAvpf9FTVw2KNArutI";

        HttpUrl.Builder urlBuilder = Objects.requireNonNull(HttpUrl.parse(baseURL + "/plants/search")).newBuilder();
        urlBuilder.addQueryParameter("token", trafleToken);
        urlBuilder.addQueryParameter("q", search);
        urlBuilder.addQueryParameter("page", String.valueOf(page));

        var request = new Request.Builder()
                .url(urlBuilder.build())
                .get()
                .build();

        var client = new OkHttpClient();
        try (Response response = client.newCall(request).execute()) {
            return response;
        } catch (Exception ex) {
            throw new Exception("Erro ao obter dados de TrafleAPI: " + ex.getMessage());
        }

//        var dtoList = service.getTraflePlants(search, page);
//        return new ResponseEntity<>(dtoList, HttpStatus.OK);
    }

    @GetMapping("/{slug}")
    public Response getTraflePlantBySlug(@PathVariable String slug) throws Exception {
        var baseURL = "https://trefle.io/api/v1";
        var trafleToken = "eNiq4MLgqoXBpdIiGb73SopX1nAvpf9FTVw2KNArutI";

        HttpUrl.Builder urlBuilder = Objects.requireNonNull(HttpUrl.parse(baseURL + "/plants/search")).newBuilder();
        urlBuilder.addQueryParameter("token", trafleToken);
        urlBuilder.addQueryParameter("id", slug);

        var request = new Request.Builder()
                .url(urlBuilder.build())
                .get()
                .build();

        var client = new OkHttpClient();
        try (Response response = client.newCall(request).execute()) {
            return response;
        } catch (Exception ex) {
            throw new Exception("Erro ao obter dados de TrafleAPI: " + ex.getMessage());
        }
        
//        var dto = service.getTraflePlantBySlug(slug);
//        return new ResponseEntity<>(dto, HttpStatus.OK);
    }
}
