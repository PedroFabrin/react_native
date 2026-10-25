# Documentação – Checkpoint 3

**Aluno:** Pedro Henrique Parizoto Fabrin
**Disciplina:** Desenvolvimento Mobile (React Native)
**Projeto:** MeusLivros – Biblioteca pessoal
**Data de entrega:** 25/10/2026
**Repositório:** https://github.com/PedroFabrin/react_native

---

## 1. Evolução do projeto

### 1.1 O que existia no Checkpoint 2

- Aplicação React Native (Expo + TypeScript) com as telas **Início**, **Livros**, **Cadastrar**, **Metas** e **Detalhes do Livro**;
- Navegação com **React Navigation** (Native Stack + Bottom Tabs);
- Web API própria em **FastAPI + SQLAlchemy + MySQL**, executada em Docker, com **apenas consultas (`GET`)**;
- Tratamento de carregamento, lista vazia, falha de comunicação e erro do servidor;
- Tela Cadastrar somente com o formulário e o aviso *Disponível no Checkpoint 3*.

### 1.2 O que foi implementado no Checkpoint 3

| Item | Descrição |
|------|-----------|
| **CRUD completo na API** | Novos endpoints `POST /livros`, `PUT /livros/{id}` e `DELETE /livros/{id}` |
| **Validação na API** | Regras de negócio no `service` com mensagens em português (campos obrigatórios, status, ano, páginas) |
| **Cadastro funcional** | A tela Cadastrar envia o livro para a API e exibe mensagem de sucesso ou de erro |
| **Edição de livros** | Nova tela **Editar Livro** (`EdicaoScreen`), aberta pelos Detalhes |
| **Exclusão de livros** | Botão **Excluir** nos Detalhes, com confirmação antes de apagar |
| **`useFocusEffect`** | As telas de consulta passaram a recarregar os dados sempre que ganham foco |
| **Camada de serviços** | A função `get` de `services/api.ts` virou `requisicao`, que recebe também o método e o corpo |

### 1.3 Funcionalidades alteradas

| Funcionalidade | Checkpoint 2 | Checkpoint 3 |
|----------------|--------------|--------------|
| Tela Cadastrar | Formulário com título, autor e status; envio desativado | Formulário com título, autor, gênero, ano, páginas e status, enviado com `POST /livros` |
| Tela Detalhes | Apenas exibia o livro | Botões **Editar** e **Excluir** |
| Carregamento das listas | `useEffect` (executava só ao montar a tela) | `useFocusEffect` (executa sempre que a tela volta a ficar visível) |
| Data de conclusão | Vinha fixa do banco | Preenchida automaticamente pela API quando o status vira `Lido` |
| Erro de validação (422) | Mensagem genérica | Mensagem informando quais campos estão inválidos |

### 1.4 Por que `useFocusEffect`

Com o `useEffect`, as telas que ficam nas abas (Início, Livros, Metas) carregavam os dados apenas na primeira vez em que eram abertas. Depois de cadastrar, editar ou excluir um livro, ao voltar para a lista ela continuava mostrando os dados antigos.

O `useFocusEffect` (do React Navigation) executa a função **toda vez que a tela recebe o foco**, então as listas sempre mostram o estado atual da API. A função é envolvida em `useCallback` para que só seja recriada quando os filtros mudam:

```tsx
useFocusEffect(
    useCallback(() => {
        carregarLivros();
    }, [filtro, busca])
);
```

| Tela | Dependências |
|------|--------------|
| `InicioScreen` | – |
| `LivrosScreen` | `filtro`, `busca` |
| `MetasScreen` | – |
| `DetalhesLivroScreen` | `id` |

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
| Editar Livro | `screens/EdicaoScreen.tsx` | Tela empilhada (stack) |

### 2.2 Estrutura de navegação

```
NavigationContainer
└── Pilha (Native Stack)
    ├── "Abas"  (Bottom Tabs – barra própria BarraNavegacao)
    │   ├── Início
    │   ├── Livros
    │   ├── Cadastrar
    │   └── Metas
    ├── "DetalhesLivro"  (abre por cima das abas, com botão de voltar)
    └── "EditarLivro"    (abre por cima dos detalhes, com botão de voltar)
```

A tela **Editar Livro** recebe apenas o `id` do livro, busca os dados atuais na API (`GET /livros/{id}`), preenche o formulário e salva com `PUT /livros/{id}`. Depois de salvar (ou ao tocar em **Cancelar**), volta para os Detalhes.

### 2.3 Parâmetros entre telas

| Rota | Parâmetros | Uso |
|------|------------|-----|
| `DetalhesLivro` | `{ id: number, titulo: string }` | `id` para buscar o livro na API; `titulo` para o cabeçalho |
| `EditarLivro` | `{ id: number }` | Buscar o livro na API e preencher o formulário |

### 2.4 Fluxo de navegação

```
Início ──(toque em "Lendo agora")────────────► Detalhes do Livro
Início ──(botão "Ver todos os livros")───────► Livros
Início ──(botão "Ver metas de leitura")──────► Metas
Livros ──(toque em um card)──────────────────► Detalhes do Livro
Detalhes do Livro ──(botão "Editar")─────────► Editar Livro
Editar Livro ──(salvar ou cancelar)──────────► Detalhes do Livro (recarregado)
Detalhes do Livro ──(excluir)────────────────► tela anterior (recarregada)
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
├── service/        # regras de negócio, validações e consultas
├── model/          # tabelas (SQLAlchemy)
├── schema/         # formato do JSON de entrada e de resposta (Pydantic)
└── db/             # conexão com o banco e script banco.sql
```

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
| `dataConclusao` | string \| null | Data em que foi lido (`AAAA-MM-DD`), preenchida pela API |

**Meta** e **Resumo** permanecem iguais ao Checkpoint 2.

### 3.3 Endpoints

| Método | Endpoint | Parâmetros | Descrição | Usado em |
|--------|----------|------------|-----------|----------|
| GET | `/livros` | `status` (opcional), `busca` (opcional) | Lista os livros, ordenados por título | Livros, Início |
| GET | `/livros/{id}` | `id` na URL | Retorna um livro | Detalhes do Livro |
| **POST** | `/livros` | Livro no corpo (JSON) | Cadastra um livro | Cadastrar |
| **PUT** | `/livros/{id}` | `id` na URL + livro no corpo | Atualiza um livro | Editar Livro |
| **DELETE** | `/livros/{id}` | `id` na URL | Exclui um livro | Detalhes do Livro |
| GET | `/resumo` | – | Quantidade de livros por status | Início |
| GET | `/metas` | – | Metas anuais com progresso | Metas |

### 3.4 Formato dos dados enviados e recebidos

**`POST /livros`** (o `PUT /livros/{id}` usa o mesmo corpo)

```json
{
  "titulo": "O Hobbit",
  "autor": "J. R. R. Tolkien",
  "status": "Lendo",
  "genero": "Fantasia",
  "anoPublicacao": 1937,
  "paginas": 336,
  "paginaAtual": 142,
  "sinopse": "Bilbo Bolseiro é arrastado por um mago e treze anões..."
}
```

→ `201 Created` (POST) ou `200 OK` (PUT), com o livro salvo, incluindo `id` e `dataConclusao`.

**`DELETE /livros/{id}`** → `204 No Content` (sem corpo).

Regras aplicadas pela API ao salvar:

- `titulo`, `autor` e `genero` são obrigatórios;
- `status` deve ser `Quero ler`, `Lendo` ou `Lido`;
- `anoPublicacao` deve estar entre 1 e o ano atual;
- `paginas` deve ser maior que zero e `paginaAtual` deve estar entre 0 e `paginas`;
- Quando o status é `Lido`, a `paginaAtual` passa a ser o total de páginas e a `dataConclusao` recebe a data do dia (se ainda não tiver). Para os outros status, a `dataConclusao` é apagada. Assim o progresso das **Metas** é atualizado automaticamente.

Os endpoints `GET` continuam com o mesmo formato do Checkpoint 2.

**Erros** → todas as respostas de erro seguem o formato `{ "mensagem": "..." }`:

| Situação | Código | Mensagem |
|----------|--------|----------|
| Livro inexistente (`GET`, `PUT` ou `DELETE` em `/livros/99`) | 404 | `Livro não encontrado.` |
| Status inválido | 400 | `Status inválido. Use: Quero ler, Lendo ou Lido.` |
| Campo obrigatório vazio | 400 | `Preencha o título, o autor e o gênero.` |
| Ano inválido | 400 | `Ano de publicação inválido.` |
| Páginas inválidas | 400 | `O número de páginas deve ser maior que zero.` |
| Página atual maior que o total | 400 | `A página atual deve estar entre 0 e o total de páginas.` |
| Campo faltando ou com tipo errado | 422 | `Dados inválidos na requisição. Verifique: <campos>.` |
| Banco de dados indisponível | 500 | `Não foi possível acessar o banco de dados.` |

---

## 4. Tratamento de estados e erros

### 4.1 Requisições no aplicativo

Todas as requisições passam pela função `requisicao(caminho, metodo, corpo)` em `services/api.ts`. O método é `GET` por padrão; o corpo, quando informado, é enviado em JSON. Ela é responsável por:

- Montar a URL com o endereço base da API;
- Cancelar a requisição após **15 segundos** (`AbortController`);
- Transformar falhas de conexão em mensagens amigáveis;
- Ler o campo `mensagem` das respostas de erro da API e lançar como `Error`.

Os arquivos `livrosService.ts` e `metasService.ts` usam essa função e são os únicos chamados pelas telas.

### 4.2 Estados das telas

Cada tela que consulta a API controla três estados:

| Estado | Tipo | Função |
|--------|------|--------|
| `carregando` | `boolean` | Exibir o componente `Carregando` enquanto aguarda a resposta |
| `erro` | `string` | Mensagem a ser exibida quando algo falha |
| dados (`livros`, `livro`, `metas`, `resumo`) | conforme o modelo | Conteúdo recebido da API |

Nas telas de cadastro e edição, cada campo do formulário tem seu próprio estado, além de `salvando` (o botão mostra *Salvando...*), `erro` e, no cadastro, `sucesso`. A tela de edição também tem `carregando` e `erroCarregar` para a busca inicial do livro.

### 4.3 Apresentação dos erros ao usuário

- Erros lançados pelos serviços são capturados no `catch` e guardados no estado `erro`;
- Nas telas de consulta, quando `erro` não está vazio, é exibido o componente **`MensagemErro`** com o botão **Tentar novamente**;
- No formulário, o erro aparece em vermelho acima do botão, e o sucesso aparece em verde (*Livro cadastrado com sucesso!*);
- Quando o servidor responde com erro, a mensagem exibida é a enviada pela própria API (campo `mensagem`);
- Quando a requisição é concluída sem registros, a tela exibe o componente **`MensagemVazia`**.

### 4.4 Situações tratadas

| Situação | Comportamento do app | Como reproduzir |
|----------|----------------------|-----------------|
| **WebAPI disponível e com dados** | Exibe resumo, listas, detalhes e metas | Uso normal |
| **WebAPI disponível sem registros** | `MensagemVazia` (*Nenhum livro encontrado*) | Buscar um texto inexistente (ex.: `xyz`) |
| **Aplicação aguardando resposta** | `Carregando` nas consultas; *Salvando...* no botão do formulário | Abrir as telas ou salvar um livro |
| **Falha na comunicação / API indisponível** | *Não foi possível conectar à API. Verifique se o servidor está ligado.* (ou *O servidor demorou demais para responder*) | Parar a API: `docker compose stop` na pasta `Api/` |
| **Erro de validação no app** | *Preencha todos os campos* (cadastro) / *Preencha título, autor, gênero, ano e páginas* (edição) | Tentar salvar com campos vazios |
| **Erro de validação na API** | Mensagem da API, ex.: *A página atual deve estar entre 0 e o total de páginas.* | Informar página atual maior que o total |
| **Dados não encontrados** | *Livro não encontrado.* | Excluir um livro em outro aparelho/Swagger e tentar abrir ou editar |
| **Erro enviado pelo servidor** | Mensagem da API, ex.: *Não foi possível acessar o banco de dados.* (500) | Parar o MySQL com a API ligada |
| **Ação concluída** | Mensagem de sucesso no cadastro; após editar ou excluir, volta à tela anterior já atualizada | Cadastrar, editar ou excluir um livro |

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
    │   ├── api.ts                # função requisicao (GET, POST, PUT e DELETE)
    │   ├── livrosService.ts
    │   └── metasService.ts
    ├── screens/
    │   ├── InicioScreen.tsx
    │   ├── LivrosScreen.tsx
    │   ├── DetalhesLivroScreen.tsx
    │   ├── CadastroScreen.tsx
    │   ├── EdicaoScreen.tsx
    │   └── MetasScreen.tsx
    ├── components/
    │   ├── BarraNavegacao.tsx  BarraProgresso.tsx  Botao.tsx  Cabecalho.tsx
    │   ├── CampoTexto.tsx  CardLivro.tsx  CardResumo.tsx  SeletorOpcoes.tsx
    │   └── Carregando.tsx  MensagemErro.tsx  MensagemVazia.tsx
    ├── models/
    │   ├── Livro.ts              # Livro, LivroEntrada, StatusLeitura, Resumo
    │   ├── Meta.ts
    │   ├── Navegacao.ts          # tipos das rotas e parâmetros
    │   ├── Tela.ts
    │   └── Cores.ts
    └── docs/
```

### Conceitos de React Native utilizados

| Conceito | Onde |
|----------|------|
| Componentes reutilizáveis e propriedades | `Botao`, `CampoTexto`, `SeletorOpcoes`, `Carregando`, `MensagemErro`, etc., usados nas telas de cadastro, edição e detalhes |
| Estados | `useState` em todas as telas (dados, carregamento, erro, formulário) |
| Eventos | `onPress`, `onChangeText`, `onSubmitEditing` |
| Renderização condicional | Carregando / erro / vazio / conteúdo; mensagens de erro e sucesso do formulário; confirmação de exclusão |
| Renderização de listas | `FlatList` na tela Livros; `map` em Início, Metas e `SeletorOpcoes` |
| Ciclo de vida da tela | `useFocusEffect` + `useCallback` nas telas de consulta; `useEffect` na edição (carrega o livro uma vez) |

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

- **Listas desatualizadas:** depois de cadastrar ou excluir um livro, as telas das abas continuavam mostrando os dados antigos, porque o `useEffect` só executava ao montar a tela. A solução foi trocar por `useFocusEffect`.
- **Edição com dados atualizados:** em vez de passar o livro inteiro por parâmetro, a tela de edição recebe só o `id` e busca o livro na API, garantindo que o formulário mostre os dados mais recentes.
- **Confirmação de exclusão:** o `Alert` com botões não funciona no navegador (Expo Web), então a confirmação foi feita na própria tela, com renderização condicional.
- **Data de conclusão e metas:** para o progresso das metas continuar correto, a API passou a preencher a data de conclusão automaticamente quando o livro é marcado como `Lido`.
- **Resposta sem corpo:** o `DELETE` retorna `204` sem JSON; a função de requisição trata esse caso sem gerar erro.
