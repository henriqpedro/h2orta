package com.example.h2orta;

import io.swagger.v3.oas.annotations.OpenAPIDefinition;
import io.swagger.v3.oas.annotations.info.Info;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;

@OpenAPIDefinition(info = @Info(
        title = "H2orta API",
        description = "Endpoints para controle de registros do app H2orta. Por um mundo onde cultivar é um direito de todos.",
        version = "1.0.0"))
@EnableJpaRepositories
@SpringBootApplication
public class H2ortaApplication {

    public static void main(String[] args) {
        SpringApplication.run(H2ortaApplication.class, args);
    }

}
