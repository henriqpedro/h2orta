package com.example.h2orta.controllers;

import com.example.h2orta.controllers.dtos.Planta.PlantaDto;
import com.example.h2orta.controllers.dtos.Trefle.TrefleDto;
import com.example.h2orta.services.PlantaService;
import com.fasterxml.jackson.databind.ObjectMapper;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;

import okhttp3.HttpUrl;
import okhttp3.OkHttpClient;
import okhttp3.Request;
import okhttp3.Response;
import okhttp3.ResponseBody;
import org.modelmapper.ModelMapper;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import java.util.Objects;

@RestController
@RequestMapping("/planta")
@Validated
@AllArgsConstructor
public class PlantaController {

    private PlantaService service;

    @GetMapping("/id/{id}")
    public ResponseEntity<PlantaDto> findById(@PathVariable Long id) throws Exception {
        var mapper = new ModelMapper();

        var planta = service.findById(id);
        var dto = mapper.map(planta, PlantaDto.class);

        return new ResponseEntity<>(dto, HttpStatus.OK);
    }

    @GetMapping("/search/{search}/{page}")
    public ResponseEntity<String> findAllTreflePlant(@NotNull @PathVariable String search, @NotNull @PathVariable int page) throws Exception {
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
            return ResponseEntity.ok(response.body().string());
        } catch (Exception ex) {
            throw new Exception("Erro ao obter dados de TrefleAPI: " + ex.getMessage());
        }

//        var dtoList = service.getTraflePlants(search, page);
//        return new ResponseEntity<>(dtoList, HttpStatus.OK);
    }

    @GetMapping("/slug/{slug}")
    public ResponseEntity<String> findTreflePlantBySlug(@NotNull @PathVariable String slug) throws Exception {
        var baseURL = "https://trefle.io/api/v1";
        var trafleToken = "eNiq4MLgqoXBpdIiGb73SopX1nAvpf9FTVw2KNArutI";

        HttpUrl.Builder urlBuilder = Objects.requireNonNull(HttpUrl.parse(baseURL + "/plants/" + slug)).newBuilder();
        urlBuilder.addQueryParameter("token", trafleToken);

        var request = new Request.Builder()
                .url(urlBuilder.build())
                .get()
                .build();

        var client = new OkHttpClient();
        try (Response response = client.newCall(request).execute()) {
            return ResponseEntity.ok(response.body().string());
        } catch (Exception ex) {
            throw new Exception("Erro ao obter dados de TrefleAPI: " + ex.getMessage());
        }

        //var dto = service.findTreflePlantBySlug(slug);
       //return new ResponseEntity<>(dto, HttpStatus.OK);
    }
}
