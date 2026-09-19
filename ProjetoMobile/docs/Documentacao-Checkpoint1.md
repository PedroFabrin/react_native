# Documentação – Checkpoint 1

**Aluno:** Pedro Henrique Parizoto Fabrin
**Disciplina:** Desenvolvimento Mobile (React Native)
**Data de entrega:** 22/09/2026

---

## 1. Nome do projeto

**MeusLivros** – Biblioteca pessoal

## 2. Objetivo da aplicação

Permitir que o usuário organize sua vida de leitor em um só lugar: cadastrar os livros que possui ou deseja ler, acompanhar o status de leitura de cada um (*Quero ler*, *Lendo* ou *Lido*) e visualizar um resumo do seu progresso.

## 3. Funcionalidades previstas para o projeto completo

- Cadastro de livros (título, autor e status de leitura);
- Listagem de livros com filtro por status;
- Atualização do status de leitura (Quero ler → Lendo → Lido);
- Exclusão de livros;
- Tela inicial com resumo (quantidade de livros por status) e livros em leitura;
- Metas de leitura (ex.: meta anual de livros lidos);
- Acompanhamento do progresso por páginas;
- Avaliação dos livros com nota e comentário;
- Persistência dos dados no dispositivo;
- Navegação entre telas com biblioteca de navegação (Checkpoints 2 e 3);
- Consumo de API externa para buscar dados/capas de livros (Checkpoints 2 e 3).

## 4. Funcionalidades implementadas até o Checkpoint 1

| Tela | O que está implementado |
|------|-------------------------|
| **Início** | Cards de resumo (Quero ler / Lendo / Lidos) calculados a partir da lista, lista de livros em leitura, atalhos para cadastrar e ver todos os livros |
| **Livros** | Lista de livros (`FlatList`), filtro por status, botão para avançar o status, botão para excluir, mensagem de lista vazia |
| **Cadastrar** | Formulário com título, autor e status; validação de campos vazios; mensagens de erro e de sucesso |
| **Metas** | Tela criada, marcada como *Em desenvolvimento*, com as funcionalidades previstas |

Navegação entre as quatro telas por uma barra inferior própria, controlada por estado (`useState`).

### Requisitos do checkpoint atendidos

| Requisito | Onde está |
|-----------|-----------|
| React Native (Expo) | Projeto inteiro |
| TypeScript | Todos os arquivos `.ts` / `.tsx`, com `strict: true` |
| Organização de arquivos | Pastas `components/`, `screens/`, `models/` e `docs/` |
| Componentes próprios | `Cabecalho`, `Botao`, `CampoTexto`, `SeletorOpcoes`, `CardLivro`, `CardResumo`, `BarraNavegacao` |
| Componentes básicos do RN | `View`, `Text`, `TextInput`, `Pressable`, `FlatList`, `ScrollView`, `KeyboardAvoidingView` |
| Props | Comunicação entre `App` → telas → componentes (dados e funções como `onExcluir`, `onAvancar`, `onCadastrar`) |
| Estado (`useState`) | Lista de livros e tela atual (`App`), campos do formulário (`CadastroScreen`), filtro (`LivrosScreen`) |
| Estilos | `StyleSheet.create` em todos os componentes, cores centralizadas em `models/Cores.ts` |
| Flexbox | `flexDirection`, `flex`, `justifyContent`, `alignItems`, `flexWrap` e `gap` (barra de navegação, cards de resumo, cards de livro, seletor) |
| Renderização de informações | Listas, contadores, status e mensagens condicionais |
| Principais telas | Início, Livros, Cadastrar e Metas |

## 5. Estrutura do projeto

```
ProjetoMobile/
├── App.tsx                  # estado global (livros, tela atual) e navegação
├── index.ts
├── components/
│   ├── BarraNavegacao.tsx
│   ├── Botao.tsx
│   ├── Cabecalho.tsx
│   ├── CampoTexto.tsx
│   ├── CardLivro.tsx
│   ├── CardResumo.tsx
│   └── SeletorOpcoes.tsx
├── screens/
│   ├── InicioScreen.tsx
│   ├── LivrosScreen.tsx
│   ├── CadastroScreen.tsx
│   └── MetasScreen.tsx
├── models/
│   ├── Livro.ts             # tipo Livro e StatusLeitura
│   ├── Tela.ts              # tipo Tela
│   └── Cores.ts             # paleta de cores
└── docs/
```

## 6. Como executar

```bash
npm install
npx expo start
```

Depois, abrir no Expo Go (celular) ou pressionar `w` para abrir no navegador.

## 7. Dificuldades encontradas

- **Navegação entre telas:** como a biblioteca de navegação ainda não foi estudada, a troca de telas foi feita com estado (`useState`) e uma barra inferior própria.
- **Tipagem do status:** para evitar valores inválidos, o status foi tipado como união de strings (`'Quero ler' | 'Lendo' | 'Lido'`) em vez de `string`, o que exigiu ajustar os componentes que recebem esse valor.
- **Compartilhar estado entre telas:** a lista de livros precisa ser vista por várias telas, então o estado ficou no `App` e é repassado por props, incluindo as funções que alteram a lista.
- **Layout no celular e na web:** foi necessário limitar a largura máxima do conteúdo e ajustar o espaçamento superior para funcionar nos dois ambientes.
