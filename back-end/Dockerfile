# ===============================
# 1️ Etapa de build - Maven + JDK 17
# ===============================
FROM maven:3.9.9-eclipse-temurin-17 AS builder

# Define diretório de trabalho
WORKDIR /h2orta

# Copia o pom.xml e baixa dependências (melhor cache)
COPY pom.xml .
RUN mvn dependency:go-offline -B

# Copia o código-fonte e gera o jar
COPY src ./src
RUN mvn clean package -DskipTests

# ===============================
# 2️ Etapa de execução
# ===============================
FROM eclipse-temurin:17-jre-alpine

# Define diretório de trabalho
WORKDIR /h2orta

# Copia o jar do estágio anterior
COPY --from=builder /h2orta/target/h2orta-0.0.1-SNAPSHOT.jar h2orta.jar

# Expõe a porta padrão do Spring Boot
EXPOSE 8080

# (opcional) define o profile ativo
# ENV SPRING_PROFILES_ACTIVE=prod

# Comando de execução
ENTRYPOINT ["java", "-jar", "h2orta.jar"]