from datetime import date

from pydantic import BaseModel, ConfigDict
from pydantic.alias_generators import to_camel


class SchemaBase(BaseModel):
    model_config = ConfigDict(alias_generator=to_camel, populate_by_name=True, from_attributes=True)


class LivroSchema(SchemaBase):
    id: int
    titulo: str
    autor: str
    status: str
    genero: str
    ano_publicacao: int
    paginas: int
    pagina_atual: int
    sinopse: str
    data_conclusao: date | None


class ResumoSchema(SchemaBase):
    total: int
    quero_ler: int
    lendo: int
    lidos: int
