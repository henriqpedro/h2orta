package com.example.h2orta;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;


@EnableJpaRepositories
@SpringBootApplication
public class H2ortaApplication {

	public static void main(String[] args) {
		SpringApplication.run(H2ortaApplication.class, args);
	}

}
