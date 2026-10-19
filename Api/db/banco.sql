DROP TABLE IF EXISTS livros;
DROP TABLE IF EXISTS metas;

CREATE TABLE livros (
    id             INT AUTO_INCREMENT PRIMARY KEY,
    titulo         VARCHAR(255) NOT NULL,
    autor          VARCHAR(255) NOT NULL,
    status         ENUM('Quero ler', 'Lendo', 'Lido') NOT NULL,
    genero         VARCHAR(100) NOT NULL,
    ano_publicacao SMALLINT NOT NULL,
    paginas        SMALLINT NOT NULL,
    pagina_atual   SMALLINT NOT NULL DEFAULT 0,
    sinopse        TEXT NOT NULL,
    data_conclusao DATE NULL
) DEFAULT CHARSET = utf8mb4;

CREATE TABLE metas (
    id                INT AUTO_INCREMENT PRIMARY KEY,
    ano               SMALLINT NOT NULL UNIQUE,
    quantidade_livros SMALLINT NOT NULL
) DEFAULT CHARSET = utf8mb4;

INSERT INTO livros (titulo, autor, status, genero, ano_publicacao, paginas, pagina_atual, sinopse, data_conclusao) VALUES
('Dom Casmurro', 'Machado de Assis', 'Lido', 'Romance', 1899, 256, 256,
 'Bentinho narra sua história com Capitu e a dúvida que atravessa o livro: houve ou não traição?', '2026-02-10'),
('O Hobbit', 'J. R. R. Tolkien', 'Lendo', 'Fantasia', 1937, 336, 142,
 'Bilbo Bolseiro é arrastado por um mago e treze anões para recuperar um tesouro guardado por um dragão.', NULL),
('Código Limpo', 'Robert C. Martin', 'Quero ler', 'Tecnologia', 2008, 425, 0,
 'Princípios e práticas para escrever código legível, fácil de manter e de evoluir.', NULL),
('1984', 'George Orwell', 'Lido', 'Distopia', 1949, 416, 416,
 'Winston Smith vive sob a vigilância constante do Grande Irmão e começa a questionar o regime.', '2026-04-22'),
('A Hora da Estrela', 'Clarice Lispector', 'Lido', 'Romance', 1977, 88, 88,
 'A vida simples de Macabéa, uma jovem nordestina no Rio de Janeiro, contada por um narrador inquieto.', '2025-11-03'),
('O Pequeno Príncipe', 'Antoine de Saint-Exupéry', 'Lido', 'Fábula', 1943, 96, 96,
 'Um aviador perdido no deserto conhece um pequeno príncipe vindo de outro planeta.', '2026-07-15'),
('Sapiens', 'Yuval Noah Harari', 'Lendo', 'História', 2011, 472, 310,
 'Uma breve história da humanidade, da Idade da Pedra às revoluções científica e tecnológica.', NULL),
('Vidas Secas', 'Graciliano Ramos', 'Quero ler', 'Romance', 1938, 176, 0,
 'A família de Fabiano atravessa o sertão fugindo da seca em busca de sobrevivência.', NULL),
('O Programador Pragmático', 'Andrew Hunt e David Thomas', 'Quero ler', 'Tecnologia', 1999, 352, 0,
 'Conselhos práticos para evoluir na carreira de desenvolvimento de software.', NULL),
('Grande Sertão: Veredas', 'João Guimarães Rosa', 'Quero ler', 'Romance', 1956, 624, 0,
 'O ex-jagunço Riobaldo relembra suas travessias pelo sertão e seu amor por Diadorim.', NULL);

INSERT INTO metas (ano, quantidade_livros) VALUES
(2025, 6),
(2026, 12);
