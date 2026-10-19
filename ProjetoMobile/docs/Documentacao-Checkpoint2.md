# Documentação – Checkpoint 2

**Aluno:** Pedro Henrique Parizoto Fabrin
**Disciplina:** Desenvolvimento Mobile (React Native)
**Projeto:** MeusLivros – Biblioteca pessoal
**Data de entrega:** 19/10/2026
**Repositório:** https://github.com/PedroFabrin/react_native

---

## 1. Evolução do projeto

### 1.1 O que existia no Checkpoint 1

- Aplicação React Native (Expo + TypeScript) com quatro telas: **Início**, **Livros**, **Cadastrar** e **Metas**;
- Lista de livros **fixa no código** (`useState` no `App.tsx`, com 3 livros), sem nenhuma comunicação externa;
- Troca de telas feita com estado (`useState<Tela>`) e uma barra inferior própria (`BarraNavegacao`);
- Cadastro, avanço de status e exclusão de livros alterando apenas o estado local;
- Tela Metas apenas como *Em desenvolvimento*.

### 1.2 O que foi implementado no Checkpoint 2

| Item | Descrição |
|------|-----------|
| **Web API própria** | API REST em **Python (FastAPI + SQLAlchemy)** com banco **MySQL**, executada em **Docker** (pasta `Api/`) |
| **Camada de serviços no app** | Pasta `services/` com as funções responsáveis pelas requisições HTTP, separadas dos componentes visuais |
| **Biblioteca de navegação** | **React Navigation** (Native Stack + Bottom Tabs) no lugar da troca de telas por estado |
| **Nova tela Detalhes do Livro** | Abre ao tocar em um livro e busca os dados completos na API pelo `id` recebido via parâmetro de rota |
| **Tela Metas funcional** | Exibe as metas anuais e o progresso calculado pela API |
| **Tratamento de estados** | Carregamento, lista vazia, falha de comunicação e erro do servidor em todas as telas que consultam a API |
| **Busca e filtro no servidor** | Filtro por status e busca por título/autor enviados como parâmetros da requisição |
| **Novos componentes** | `Carregando`, `MensagemErro`, `MensagemVazia` e `BarraProgresso` |
| **Novos dados do livro** | Gênero, ano de publicação, páginas, página atual, sinopse e data de conclusão |

### 1.3 Funcionalidades alteradas

| Funcionalidade | Checkpoint 1 | Checkpoint 2 |
|----------------|--------------|--------------|
| Origem dos dados | Array fixo no `App.tsx` | Requisições `GET` à Web API |
| Tela Início | Contadores calculados no app | Totais vindos de `GET /resumo` e livros em leitura de `GET /livros?status=Lendo`, com barra de progresso de páginas |
| Tela Livros | Filtro feito no app sobre a lista local | Filtro e busca feitos pela API; cada card abre a tela de Detalhes |
| Cards de livro | Botões *Avançar status* e *Excluir* | Card clicável com gênero e ano; os botões foram retirados, pois nesta etapa a API possui apenas consultas (`GET`) |
| Tela Cadastrar | Adicionava o livro ao estado local | Formulário e validação mantidos, com o aviso *Disponível no Checkpoint 3*; o envio (`POST /livros`) será implementado na próxima etapa |
| Tela Metas | Somente texto *Em desenvolvimento* | Lista de metas com progresso vinda de `GET /metas` |
| Navegação | `useState` + renderização condicional | React Navigation, mantendo o componente `BarraNavegacao` como barra de abas |

---

## 2. Navegação

### 2.1 Telas existentes

| Tela | Arquivo | Tipo |
|------|---------|------|
| Início | `screens/InicioScreen.tsx` | Aba |
| Livros | `screens/LivrosScreen.tsx` | Aba |
| Cadastrar | `screens/CadastroScreen.tsx` | Aba |
| Metas | `screens/MetasScreen.tsx` | Aba |
| Detalhes do Livro | `screens/DetalhesLivroScreen.tsx` | Tela empilhada (stack) |

### 2.2 Estrutura de navegação

A navegação foi construída com **React Navigation** e possui dois níveis:

```
NavigationContainer
└── Pilha (Native Stack)
    ├── "Abas"  (Bottom Tabs – barra própria BarraNavegacao)
    │   ├── Início
    │   ├── Livros
    │   ├── Cadastrar
    │   └── Metas
    └── "DetalhesLivro"  (abre por cima das abas, com botão de voltar)
```

- As **abas** são as telas principais e ficam sempre acessíveis pela barra inferior. O componente `BarraNavegacao` criado no Checkpoint 1 foi reaproveitado através da propriedade `tabBar` do navegador de abas.
- A tela **Detalhes do Livro** pertence à pilha: ao ser aberta, fica sobre as abas e exibe um cabeçalho com o título do livro e o botão de voltar.

### 2.3 Fluxo de navegação

```
Início ──(toque em "Lendo agora")────────────► Detalhes do Livro
Início ──(botão "Ver todos os livros")───────► Livros
Início ──(botão "Ver metas de leitura")──────► Metas
Livros ──(toque em um card)──────────────────► Detalhes do Livro
Detalhes do Livro ──(voltar)─────────────────► tela anterior
Barra inferior ──────────────────────────────► Início | Livros | Cadastrar | Metas
```

---

## 3. Integração com a Web API

### 3.1 Web API utilizada

A Web API foi desenvolvida para o projeto e está na pasta **`Api/`** do repositório.

| Item | Valor |
|------|-------|
| Tecnologia | Python 3.13, FastAPI, SQLAlchemy 2.0, PyMySQL |
| Banco de dados | MySQL 8 (banco `meuslivros_db`) |
| Execução | Docker (`docker compose up -d --build`) |
| **Endereço base** | `http://<IP-do-computador>:8000` (no navegador: `http://localhost:8000`) |
| Documentação interativa | `http://localhost:8000/docs` (Swagger gerado pelo FastAPI) |

Organização em camadas:

```
Api/
├── main.py         # cria o app, registra as rotas e padroniza os erros
├── controller/     # rotas (APIRouter)
├── service/        # regras de negócio e consultas
├── model/          # tabelas (SQLAlchemy)
├── schema/         # formato do JSON de resposta (Pydantic)
└── db/             # conexão com o banco e script banco.sql
```

No aplicativo, o endereço base é definido em `services/api.ts`. O IP é obtido automaticamente do servidor de desenvolvimento do Expo (`expo-constants`), o que permite usar o mesmo código no navegador e no celular conectado à mesma rede.

### 3.2 Recursos e entidades

**Livro** (tabela `livros`)

| Campo (JSON) | Tipo | Descrição |
|--------------|------|-----------|
| `id` | number | Identificador |
| `titulo` | string | Título |
| `autor` | string | Autor |
| `status` | string | `Quero ler`, `Lendo` ou `Lido` |
| `genero` | string | Gênero literário |
| `anoPublicacao` | number | Ano de publicação |
| `paginas` | number | Total de páginas |
| `paginaAtual` | number | Página em que o leitor está |
| `sinopse` | string | Resumo do livro |
| `dataConclusao` | string \| null | Data em que foi lido (`AAAA-MM-DD`) |

**Meta** (tabela `metas`)

| Campo (JSON) | Tipo | Descrição |
|--------------|------|-----------|
| `id` | number | Identificador |
| `ano` | number | Ano da meta |
| `quantidadeLivros` | number | Quantidade de livros que se deseja ler |
| `livrosLidos` | number | Livros com status `Lido` concluídos naquele ano (calculado) |
| `percentual` | number | Progresso de 0 a 100 (calculado) |

**Resumo** (calculado a partir da tabela `livros`)

| Campo (JSON) | Tipo | Descrição |
|--------------|------|-----------|
| `total` | number | Total de livros |
| `queroLer` | number | Livros com status `Quero ler` |
| `lendo` | number | Livros com status `Lendo` |
| `lidos` | number | Livros com status `Lido` |

### 3.3 Endpoints

Todos os endpoints utilizam o método **HTTP GET** e retornam **JSON**.

| Método | Endpoint | Parâmetros | Descrição | Usado em |
|--------|----------|------------|-----------|----------|
| GET | `/livros` | `status` (opcional), `busca` (opcional) | Lista os livros, ordenados por título | Livros, Início |
| GET | `/livros/{id}` | `id` na URL | Retorna um livro | Detalhes do Livro |
| GET | `/resumo` | – | Quantidade de livros por status | Início |
| GET | `/metas` | – | Metas anuais com progresso | Metas |

### 3.4 Formato dos dados recebidos

**`GET /livros?status=Lendo`** → `200 OK`

```json
[
  {
    "id": 2,
    "titulo": "O Hobbit",
    "autor": "J. R. R. Tolkien",
    "status": "Lendo",
    "genero": "Fantasia",
    "anoPublicacao": 1937,
    "paginas": 336,
    "paginaAtual": 142,
    "sinopse": "Bilbo Bolseiro é arrastado por um mago e treze anões para recuperar um tesouro guardado por um dragão.",
    "dataConclusao": null
  }
]
```

**`GET /livros/{id}`** → `200 OK` com um único objeto no mesmo formato acima.

**`GET /resumo`** → `200 OK`

```json
{ "total": 10, "queroLer": 4, "lendo": 2, "lidos": 4 }
```

**`GET /metas`** → `200 OK`

```json
[
  { "id": 2, "ano": 2026, "quantidadeLivros": 12, "livrosLidos": 3, "percentual": 25 },
  { "id": 1, "ano": 2025, "quantidadeLivros": 6, "livrosLidos": 1, "percentual": 17 }
]
```

**Lista sem registros** → `200 OK` com `[]`.

**Erros** → todas as respostas de erro seguem o formato `{ "mensagem": "..." }`:

| Situação | Código | Mensagem |
|----------|--------|----------|
| Livro inexistente (`/livros/99`) | 404 | `Livro não encontrado.` |
| Status inválido (`/livros?status=xx`) | 400 | `Status inválido. Use: Quero ler, Lendo ou Lido.` |
| Parâmetro com tipo errado (`/livros/abc`) | 422 | `Parâmetros inválidos na requisição.` |
| Banco de dados indisponível | 500 | `Não foi possível acessar o banco de dados.` |

---

### 4.3 Apresentação dos erros ao usuário

- Erros lançados pelos serviços são capturados no `catch` e guardados no estado `erro`;
- Quando `erro` não está vazio, a tela exibe o componente **`MensagemErro`**: um card com o título *Algo deu errado*, a mensagem recebida e o botão **Tentar novamente**, que chama a função de carregamento outra vez;
- Quando o servidor responde com erro, a mensagem exibida é a enviada pela própria API (campo `mensagem`);
- Quando a requisição é concluída sem registros, a tela exibe o componente **`MensagemVazia`** (ex.: *Nenhum livro encontrado*, *Nenhuma meta de leitura cadastrada*).

### 4.4 Situações tratadas

| Situação | Comportamento do app | Como reproduzir |
|----------|----------------------|-----------------|
| **WebAPI disponível e com dados** | Exibe resumo, listas, detalhes e metas | Uso normal |
| **WebAPI disponível sem registros** | `MensagemVazia` (*Nenhum livro encontrado*); na Início, os contadores ficam em 0 e aparece *Nenhum livro cadastrado ainda* | Buscar um texto inexistente (ex.: `xyz`) ou esvaziar as tabelas no banco |
| **Aplicação aguardando resposta** | `Carregando` com indicador de atividade e mensagem | Visível ao abrir cada tela; para observar melhor, limitar a rede no navegador (DevTools → Network → *Slow 3G*) |
| **Falha na comunicação** | `MensagemErro`: *Não foi possível conectar à API. Verifique se o servidor está ligado.* (ou *O servidor demorou demais para responder* após 15 segundos) | Parar a API: `docker compose stop` na pasta `Api/` |
| **Erro enviado pelo servidor** | `MensagemErro` com a mensagem da API, ex.: *Não foi possível acessar o banco de dados.* (500) | Parar o MySQL com a API ligada |

---

## 5. Estrutura do projeto

```
react_native/
├── Api/                          # Web API (FastAPI)
│   ├── main.py
│   ├── controller/  livro_controller.py, meta_controller.py
│   ├── service/     livro_service.py, meta_service.py
│   ├── model/       livro.py, meta.py
│   ├── schema/      livro_schema.py, meta_schema.py
│   ├── db/          database.py, banco.sql
│   ├── requirements.txt
│   ├── Dockerfile
│   └── docker-compose.yml
└── ProjetoMobile/                # Aplicativo React Native
    ├── App.tsx                   # NavigationContainer, pilha e abas
    ├── services/                 # comunicação com a Web API
    │   ├── api.ts
    │   ├── livrosService.ts
    │   └── metasService.ts
    ├── screens/
    │   ├── InicioScreen.tsx
    │   ├── LivrosScreen.tsx
    │   ├── DetalhesLivroScreen.tsx
    │   ├── CadastroScreen.tsx
    │   └── MetasScreen.tsx
    ├── components/
    │   ├── BarraNavegacao.tsx  BarraProgresso.tsx  Botao.tsx  Cabecalho.tsx
    │   ├── CampoTexto.tsx  CardLivro.tsx  CardResumo.tsx  SeletorOpcoes.tsx
    │   └── Carregando.tsx  MensagemErro.tsx  MensagemVazia.tsx
    ├── models/
    │   ├── Livro.ts              # Livro, StatusLeitura, Resumo
    │   ├── Meta.ts
    │   ├── Navegacao.ts          # tipos das rotas e parâmetros
    │   ├── Tela.ts
    │   └── Cores.ts
    └── docs/
```

### Uso de Flexbox

| Onde | Propriedades |
|------|--------------|
| Cards de resumo (Início) e informações do livro (Detalhes) | `flexDirection: 'row'`, `flex: 1`, `gap` |
| Card de livro | `flexDirection: 'row'`, `justifyContent: 'space-between'`, `alignItems` |
| `BarraProgresso` | Dois `View` lado a lado com `flex` proporcional ao percentual |
| `Carregando` | `alignItems` e `justifyContent: 'center'` |
| Filtros (`SeletorOpcoes`) | `flexDirection: 'row'`, `flexWrap: 'wrap'`, `gap` |
| Barra de navegação | `flexDirection: 'row'`, `flex: 1` em cada aba |

---

## 6. Como executar

**1. Banco de dados:** executar o script `Api/db/banco.sql` no banco `meuslivros_db` (MySQL, usuário `root`, senha `root`).

**2. Web API:**

```bash
cd Api
docker compose up -d --build
```

A API fica disponível em `http://localhost:8000` (documentação em `http://localhost:8000/docs`).

**3. Aplicativo:**

```bash
cd ProjetoMobile
npm install
npx expo start
```

Pressionar `w` para abrir no navegador ou ler o QR Code com o Expo Go. No celular, o aparelho precisa estar na mesma rede Wi-Fi do computador e a porta 8000 precisa estar liberada no firewall.

---

## 7. Dificuldades encontradas

- **Escolha da tecnologia da API:** a primeira tentativa foi com PHP/Laravel, mas a estrutura do framework era grande demais para uma API somente de consultas. A API foi refeita em FastAPI com SQLAlchemy, organizada em camadas (controller, service, model, db).
- **Acesso à API pelo celular:** `localhost` no celular aponta para o próprio aparelho. A solução foi obter o IP do computador a partir do servidor do Expo (`expo-constants`).
- **Conexão da API com o MySQL:** como a API roda em um container Docker, o banco é acessado por `host.docker.internal`.
- **Banco fora do ar:** sem tempo limite, a requisição ficava esperando indefinidamente. Foram adicionados tempos limite na conexão da API com o banco e no `fetch` do aplicativo.
- **Funcionalidades de escrita:** como esta etapa exige apenas consultas (`GET`), cadastrar, avançar status e excluir foram desativados no app e serão implementados com `POST`, `PUT` e `DELETE` no Checkpoint 3.
