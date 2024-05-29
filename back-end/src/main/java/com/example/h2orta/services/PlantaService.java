package com.example.h2orta.services;

import com.example.h2orta.controllers.dtos.Trefle.TrefleDto;
import com.example.h2orta.controllers.dtos.Trefle.TrefleEspeciesDto;
import com.example.h2orta.models.Planta;
import com.example.h2orta.repositories.PlantaRepository;
import com.fasterxml.jackson.databind.ObjectMapper;
import lombok.AllArgsConstructor;
import okhttp3.HttpUrl;
import okhttp3.OkHttpClient;
import okhttp3.Request;
import okhttp3.Response;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.*;

@Service
@AllArgsConstructor
public class PlantaService {

    public PlantaRepository repository;

    public Planta findById(long id) throws Exception {
        return repository.findById(id)
                .orElseThrow(() -> new Exception("Planta não encontrada!"));
    }

    @Transactional
    public Planta findByTrefleSlugOrCreate(Planta planta) {
        return repository.findByTrefleSlug(planta.getTrefleSlug())
                .orElseGet(() -> {
                    planta.setId(null);
                    return repository.save(planta);
                });
    }

    public List<TrefleEspeciesDto> findAllTreflePlant(String search, int page) throws Exception {
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
            if (response.isSuccessful())
                if (response.body() != null) {
                    var objectMapper = new ObjectMapper();
                    var arrayDto = objectMapper.readValue(response.body().string(), TrefleEspeciesDto[].class);
                    return Arrays.stream(arrayDto).toList();
                }
            return new ArrayList<>();
        } catch (Exception ex) {
            throw new Exception("Erro ao obter dados de TrafleAPI: " + ex.getMessage());
        }
    }

    public TrefleDto findTreflePlantBySlug(String slug) throws Exception {
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
            if (response.isSuccessful())
                if (response.body() != null) {
                    var objectMapper = new ObjectMapper();
                    return objectMapper.readValue(response.body().string(), TrefleDto.class);
                }
            return new TrefleDto();
        } catch (Exception ex) {
            throw new Exception("Erro ao obter dados de TrefleAPI: " + ex.getMessage());
        }
    }
}
