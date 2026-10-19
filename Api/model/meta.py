from sqlalchemy.orm import Mapped, mapped_column

from db.database import Base


class Meta(Base):
    __tablename__ = "metas"

    id: Mapped[int] = mapped_column(primary_key=True)
    ano: Mapped[int]
    quantidade_livros: Mapped[int]
