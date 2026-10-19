from datetime import date

from sqlalchemy import Date, String, Text
from sqlalchemy.orm import Mapped, mapped_column

from db.database import Base


class Livro(Base):
    __tablename__ = "livros"

    id: Mapped[int] = mapped_column(primary_key=True)
    titulo: Mapped[str] = mapped_column(String(255))
    autor: Mapped[str] = mapped_column(String(255))
    status: Mapped[str] = mapped_column(String(20))  # Quero ler | Lendo | Lido
    genero: Mapped[str] = mapped_column(String(100))
    ano_publicacao: Mapped[int]
    paginas: Mapped[int]
    pagina_atual: Mapped[int]
    sinopse: Mapped[str] = mapped_column(Text)
    data_conclusao: Mapped[date | None] = mapped_column(Date)
