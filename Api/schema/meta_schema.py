from schema.livro_schema import SchemaBase


class MetaSchema(SchemaBase):
    id: int
    ano: int
    quantidade_livros: int
    livros_lidos: int
    percentual: int
