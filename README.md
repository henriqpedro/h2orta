# 🌱 H2Orta

**H2Orta** é um sistema de monitoramento e irrigação inteligente de plantas, integrando **ESP32**, **back-end em Java (Spring Boot)** e **app mobile em React Native (Expo + Tailwind)**.  

O sistema permite **cadastrar e gerenciar vasos**, monitorar parâmetros das plantas, acionar irrigação remotamente e visualizar dados no app.

---

## 🧱 Visão Geral

- **ESP32**: coleta dados de sensores e comunica com o app.
- **App Mobile (Expo)**: recebe dados do ESP32, envia comandos ao back-end e persiste informações de **vasos e usuários** no banco MySQL.
- **Back-end (Java)**: fornece API REST, autenticação, persistência de dados e integração com o banco.
- **Banco de dados (MySQL)**: armazena vasos, usuários e dados de plantas (pré-carregadas via script inicial).
- **Mosquitto (MQTT)**: broker para comunicação de IoT (ESP32 e back-end se necessário).
- **Caddy**: servidor web / proxy reverso com HTTPS.


> As plantas são pré-carregadas via script.
---

## 🔧 Tecnologias

### Serviços Docker

- **Back-end**: Java + Spring Boot (API REST)
- **MySQL**: armazenamento de vasos e usuários
- **Mosquitto**: broker MQTT
- **Caddy**: servidor web / proxy reverso com HTTPS

### Dispositivo (ESP32)

- Sensores:
  - Umidade do solo
  - Nível do reservatório
  - Temperatura do ar
  - Umidade do ar
- Comunica diretamente com o app
- Aciona bomba ou válvula

### App Mobile

- React Native com **Expo**
- Navegação: `expo-router`
- Estilização: Tailwind CSS (via `nativewind`)
- Feedbacks: `react-native-toast-message`

---

## 📱 Funcionalidades do App

- Login / autenticação
- Cadastro e edição de **vasos**
- Visualização de dados de sensores:
  - Umidade do solo
  - Nível do reservatório
  - Temperatura do ar
  - Umidade do ar
- Ações:
  - **Irrigar vaso**
  - **Deletar vaso**

# App Configuration
APP_PORT=8080
