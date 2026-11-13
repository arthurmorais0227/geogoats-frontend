# GeoGoats — Projeto Integrador (SENAI + SESI) **FRONT-END**

![Status do Projeto](https://img.shields.io/badge/Status-Em%20Desenvolvimento-yellow)
![Next.js](https://img.shields.io/badge/Next.js-000000?style=for-the-badge&logo=nextdotjs&logoColor=white)
![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-06B6D4?style=for-the-badge&logo=tailwindcss&logoColor=white)
![Ant Design](https://img.shields.io/badge/Ant_Design-0170FE?style=for-the-badge&logo=antdesign&logoColor=white)
![Biome](https://img.shields.io/badge/Biome-60A5FA?style=for-the-badge&logo=biome&logoColor=white)

## Sobre o Projeto

Este projeto é fruto do **Projeto Integrador Final** do curso **Técnico em Desenvolvimento de Sistemas (SENAI/SESI Valinhos)**. O **GeoGoats Front-end** é a aplicação web do Portal Educacional de Geografia voltado ao Ensino Médio.

O portal foi planejado para reunir, em um só ambiente, conteúdos educativos, notícias, dicas de estudo, informações sobre carreiras e estágios, simulados interativos e videoaulas relacionadas à disciplina de Geografia.

Esta camada é responsável pela interface e pela experiência de uso do portal. A aplicação está sendo construída com foco em responsividade, acessibilidade, organização dos conteúdos e integração futura com a API do back-end.

> **Status atual:** o repositório está em desenvolvimento inicial, baseado em Next.js com App Router. As telas e a integração com a API ainda estão sendo implementadas.

### Objetivo Principal

Desenvolver uma interface moderna, responsiva e intuitiva para um Portal Educacional de Geografia, facilitando o acesso dos alunos a materiais de estudo e conteúdos que despertem o interesse pela disciplina.

### Público-Alvo

Alunos do Ensino Médio, especialmente da rede SESI/SENAI, professores de Geografia e demais pessoas interessadas em geografia, geologia e áreas correlatas. O portal também será útil para estudantes que estejam se preparando para vestibulares e para o mercado de trabalho.

---

## Tecnologias Utilizadas

### Frontend

- **Framework:** Next.js 16 com App Router
- **Biblioteca de interface:** React 19
- **Linguagem:** JavaScript, sem TypeScript
- **Estilização:** Tailwind CSS 4
- **Componentes de interface:** Ant Design
- **Ícones:** Lucide React
- **Requisições HTTP:** Axios
- **Notificações:** React Hot Toast
- **Lint e formatação:** Biome

### Integração planejada

- **Back-end:** API REST do repositório GeoGoats Back-end
- **Autenticação:** integração com Clerk, quando configurada
- **Testes E2E:** Cypress, quando a suíte de testes for adicionada
- **Deploy:** Vercel, pendente

> No momento, o front-end ainda não possui variáveis de ambiente configuradas, integração ativa com a API, autenticação via Clerk ou testes Cypress no `package.json`.

---

## Estrutura do Projeto

```text
geogoats-frontend/
├── src/
│   ├── app/
│   │   ├── globals.css       # Estilos globais
│   │   ├── layout.js         # Layout raiz e providers
│   │   ├── page.jsx          # Página inicial
│   │   └── nome-da-rota/     # Exemplo de rota do App Router
│   └── components/           # Componentes reutilizáveis
├── public/                   # Arquivos públicos (quando adicionados)
├── biome.json                # Configuração do Biome
├── next.config.mjs           # Configuração do Next.js
├── postcss.config.mjs        # Configuração do PostCSS/Tailwind
├── jsconfig.json             # Configuração de caminhos JavaScript
├── package.json
└── Readme.MD
```

---

## Nossa Equipe

<table>
  <tr>
    <td align="center">
      <a href="https://github.com/lisboathecoder" title="Gustavo Lisboa">
        <img src="https://github.com/lisboathecoder.png" width="100px;" alt="Foto do Gustavo Lisboa no GitHub"/><br>
        <sub><b>Gustavo Lisboa</b><br><i>Product Owner · Gerente de Projeto · Dev Back-End</i></sub>
      </a>
    </td>
    <td align="center">
      <a href="https://github.com/Jvsilvagomes" title="João Victor">
        <img src="https://github.com/Jvsilvagomes.png" width="100px;" alt="Foto do João Victor"/><br>
        <sub><b>João Victor</b><br><i>Dev · Designer de Back-End</i></sub>
      </a>
    </td>
    <td align="center">
      <a href="https://github.com/arthurmorais0227" title="Arthur Morais">
        <img src="https://github.com/arthurmorais0227.png" width="100px;" alt="Foto do Arthur Morais no GitHub"/><br>
        <sub><b>Arthur Morais</b><br><i>Dev Front-End · Dev Back-End</i></sub>
      </a>
    </td>
  </tr>
  <tr>
    <td align="center">
      <a href="https://github.com/Rafael-1108" title="Rafael Mendes">
        <img src="https://github.com/Rafael-1108.png" width="100px;" alt="Foto do Rafael Mendes"/><br>
        <sub><b>Rafael Mendes</b><br><i>Dev · Analista de Qualidade</i></sub>
      </a>
    </td>
    <td align="center">
      <a href="https://github.com/Fabiox7778" title="Fabio Henrique">
        <img src="https://github.com/Fabiox7778.png" width="100px;" alt="Foto de Fabio Henrique"/><br>
        <sub><b>Fabio Henrique</b><br><i>Scrum Master · Dev Front-End</i></sub>
      </a>
    </td>
    <td align="center">
      <a href="https://github.com/CiaociaoStopiglia" title="João Stopiglia">
        <img src="https://github.com/CiaociaoStopiglia.png" width="100px;" alt="Foto de João Stopiglia"/><br>
        <sub><b>João Stopiglia</b><br><i>Designer</i></sub>
      </a>
    </td>
  </tr>
</table>

---

## Repositórios

| Camada | Repositório |
| --- | --- |
| **Back-end** | [github.com/arthurmorais0227/geogoats-backend](https://github.com/arthurmorais0227/geogoats-backend) |
| **Front-end** | [github.com/arthurmorais0227/geogoats-frontend](https://github.com/arthurmorais0227/geogoats-frontend) |

---

## Como Executar o Projeto Localmente

### Pré-requisitos

- **Node.js** versão 20 ou superior
- **npm** instalado
- **Git** instalado
- Acesso à internet para baixar as dependências

> O front-end atualmente não exige banco de dados, arquivo `.env` ou serviço de back-end para iniciar a aplicação base.

### Instalação

1. **Clonar o repositório**

    ```bash
    git clone https://github.com/arthurmorais0227/geogoats-frontend
    cd geogoats-frontend
    ```

2. **Instalar as dependências**

    ```bash
    npm install
    ```

3. **Iniciar o servidor de desenvolvimento**

    ```bash
    npm run dev
    ```

4. **Acessar a aplicação**

    Abra o navegador em [http://localhost:3000](http://localhost:3000).

### Scripts disponíveis

| Comando | Descrição |
| --- | --- |
| `npm run dev` | Inicia o servidor de desenvolvimento do Next.js. |
| `npm run lint` | Verifica o código utilizando o Biome. |
| `npm run format` | Formata os arquivos utilizando o Biome. |

> O script de build e os scripts de testes ainda serão adicionados ao projeto conforme a aplicação evoluir.

---

## Variáveis de Ambiente

No momento, o projeto **não possui variáveis de ambiente configuradas** e não contém um arquivo `.env.local`.

Quando a integração com o back-end for implementada, as variáveis deverão ser adicionadas em um arquivo `.env.local`, por exemplo:

```env
# URL base da API do GeoGoats
NEXT_PUBLIC_API_URL="http://localhost:3001"

# Chave pública do Clerk, quando a autenticação for integrada
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY="pk_test_..."
```

O arquivo `.env.local` não deve ser versionado. Nunca coloque chaves privadas, tokens ou credenciais diretamente no código-fonte.

---

## Integração com o Back-end

A integração com o back-end ainda está pendente. Quando estiver disponível, o front-end consumirá a API REST do repositório [GeoGoats Back-end](https://github.com/arthurmorais0227/geogoats-backend).

Os recursos previstos para consumo pela interface são:

| Recurso | Caminho previsto |
| --- | --- |
| Dicas | `/dicas` |
| Participantes | `/participantes` |
| Simulados | `/simulado` |
| Videoaulas | `/videoaulas` |
| Notícias | `/noticias` |
| Usuários | `/usuarios` |

Os caminhos e os métodos de autenticação devem ser confirmados no momento da integração. Não há, neste momento, chamadas de API implementadas no front-end.

---

## Testes Automatizados

Os testes E2E com Cypress ainda não foram configurados neste repositório. A suíte será adicionada após a conclusão das principais telas e da integração real com o back-end.

Quando configurados, os testes deverão cobrir, entre outros fluxos:

1. Acesso à página inicial.
2. Navegação entre as áreas do portal.
3. Consulta de notícias e conteúdos.
4. Acesso ao login administrativo.
5. Operações do painel administrativo, quando disponíveis.

---

## Como Testar Online

> ⏳ **Deploy em andamento.** A URL de produção do front-end será publicada nesta seção assim que o deploy na Vercel for concluído.

---

<p align="center">
  <b>🎓 Projeto Integrador Final — Técnico em Desenvolvimento de Sistemas</b><br>
  SESI/SENAI Valinhos · 2026<br>
  <i>Docentes: Thiago Ferreira · Marcelo Carboni · Guilherme Menna</i>
</p>
