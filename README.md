# 🚗 Front-end: Sistema de Venda de Carros Usados

![React](https://img.shields.io/badge/Frontend-React-blue?logo=react)
![Vite](https://img.shields.io/badge/Build-Vite-purple?logo=vite)
![Axios](https://img.shields.io/badge/HTTP-Axios-ff69b4)
![JSON Server](https://img.shields.io/badge/Backend-JSON%20Server-red?logo=json)
![Git](https://img.shields.io/badge/VersionControl-Git-black?logo=git)
![Status](https://img.shields.io/badge/Project-Completed-brightgreen)

Este projeto é um sistema completo de cadastro e gerenciamento de veículos usados para venda.  
A aplicação foi desenvolvida com frontend em **React (Vite)** e utiliza o **JSON Server** para simular um backend RESTful.

O objetivo do sistema é permitir o controle de estoque de veículos cadastrados, possibilitando adicionar, editar, visualizar e excluir carros, além de gerenciar usuários e autenticação de login.

## 📂 Estrutura do Projeto

```bash
├── public/
├── src/
│   ├── components/        # Componentes reutilizáveis (Navbar, Footer, etc.)
│   ├── pages/             # Telas principais do sistema (Login, Home, Cars, Users, CarDetails, CarForm)
│   ├── services/          # Configuração do Axios (api.js)
│   ├── App.jsx            # Componente principal e rotas protegidas
│   └── main.jsx           # Ponto de entrada da aplicação
└── db.json                # Banco de dados simulado utilizado pelo JSON Server
```

## 🚀 Funcionalidades Implementadas

*   **Sistema de Login com autenticação simples**
*   **Cadastro de veículos com:**
    *   Marca
    *   Modelo
    *   Motorização
    *   Ano
    *   Quilometragem (com máscara de formatação)
    *   Valor (com máscara de formatação)
    *   Cidade
    *   Imagem (via URL)
 
*   **Edição e exclusão de veículos**
*   **Visualização detalhada de cada veículo**
*   **Gestão de usuários**
*   **Interface responsiva**
*   **Área de upload de imagens com instrução via PostImages**

## 🛠 Tecnologias Utilizadas
*   **Frontend**
    *   React
    *   Vite
    *   React Router DOM
    *   Axios
*   **Backend Simulado**
    *   JSON Server
*   **Geral**
    *   Git e GitHub
 
## 💻 Como Executar a Aplicação Localmente

Siga os passos abaixo para configurar e rodar o ambiente de desenvolvimento localmente.

### Pré-requisitos

*   [Node.js](https://nodejs.org/)
*   [Git](https://git-scm.com/downloads/win)

Abra um novo terminal (Git Bash):

### 1️⃣ Clone o repositório:
    git clone https://github.com/GabrielTME/venda-carros.git
    cd venda-carros
### 2️⃣ Instale as dependências:
    npm install
### 3️⃣ Rode o JSON Server:
    npx json-server --watch db.json --port 3001
O backend simulado estará rodando em `http://localhost:3001`
### 4️⃣ Rode o frontend:
Em outro terminal:

    npm run dev
A aplicação React estará disponível em `http://localhost:5173`

## 🖼 Upload de Imagens

Para adicionar imagens dos veículos, o sistema utiliza URLs.
Recomendamos utilizar o serviço gratuito do [PostImages.](https://postimages.org/)
Após o upload, copie o link direto e cole no campo Imagem (URL).

## 🔐 Funcionamento do Login
*   Validação de usuário no JSON Server (arquivo `db.json`)
*   Proteção de rotas
*   Logout funcional com remoção do estado global

## 👤 Repositório mantido por:

**Gabriel Tomé**
*   E-mail: gttome6@gmail.com
*   [Github](https://github.com/gabrieltme)

## Colaboradores:

**Luigi Margotti Sartor**

⚠ Este projeto é acadêmico e foi desenvolvido como exercício prático para a disciplina de Front-end com foco em React + Vite e simulação de backend via JSON Server.
