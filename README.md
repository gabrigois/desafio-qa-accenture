# Desafio de Automação QA - Accenture

Este repositório contém as soluções para o Desafio de QA Automation Engineer, dividido em duas partes: API e Frontend.

## Estrutura do Projeto

O projeto está organizado em duas pastas principais:

* `/Parte 1 - API`: Contém a solução do desafio de API, escrita em JavaScript com Node.js e Axios.
* `/Parte 2 - Frontend`: Contém a solução do desafio de automação web, escrita em JavaScript com WebdriverIO, Cucumber (BDD) e o padrão Page Object Model (POM).

---

## Parte 1: Teste de API

Desafio focado em criar um fluxo contínuo de chamadas de API, desde a criação de um usuário até a verificação de seus livros alugados.

### Tecnologias Utilizadas
* Node.js
* Axios (para as requisições HTTP)

### Como Configurar e Rodar

1.  **Navegue até a pasta:**
    ```bash
    cd "Parte 1 - API"
    ```

2.  **Instale as dependências:**
    (Lembrando que `axios` precisa estar no `package.json`)
    ```bash
    npm install
    ```

3.  **Execute o script:**
    (Substitua `resolucao_parte1.js` pelo nome exato do seu arquivo, se for diferente)
    ```bash
    node desafio_api.js
    ```

---

## Parte 2: Teste Frontend

Desafio focado em automação web de 5 cenários diferentes no site (https://demoqa.com/).

### Tecnologias Utilizadas
* WebdriverIO (com Selenium)
* Cucumber (BDD)
* Page Object Model (POM)
* ChromeDriver
* Gherkin

### Como Configurar e Rodar

1.  **Navegue até a pasta:**
    ```bash
    cd "Parte 2 - Frontend"
    ```

2.  **Instale as dependências:**
    (Isso pode levar alguns minutos)
    ```bash
    npm install
    ```

3.  **Execute todos os testes:**
    O comando abaixo irá abrir o navegador Chrome e executar todos os 5 cenários, incluindo o bônus de Web Tables.
    ```bash
    npx wdio run wdio.conf.js
    ```

### Executando Testes Específicos (com Tags)

Você pode filtrar quais cenários executar usando as tags do Cucumber:

* **Rodar apenas o cenário Bônus (Criação dinâmica de registros):**
    ```bash
    npx wdio run wdio.conf.js --cucumberOpts.tagExpression="@bonus"
    ```

* **Rodar tudo, EXCETO os cenários Bônus:**
    ```bash
    npx wdio run wdio.conf.js --cucumberOpts.tagExpression="not @bonus"
    ```