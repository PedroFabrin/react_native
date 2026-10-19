from fastapi import HTTPException
from sqlalchemy import func, or_, select
from sqlalchemy.orm import Session

from model.livro import Livro
from schema.livro_schema import ResumoSchema

STATUS_LEITURA = ["Quero ler", "Lendo", "Lido"]


def listar_livros(db: Session, status: str | None, busca: str | None) -> list[Livro]:
    if status is not None and status not in STATUS_LEITURA:
        raise HTTPException(status_code=400, detail="Status inválido. Use: Quero ler, Lendo ou Lido.")

    consulta = select(Livro).order_by(Livro.titulo)

    if status:
        consulta = consulta.where(Livro.status == status)

    if busca:
        consulta = consulta.where(or_(Livro.titulo.like(f"%{busca}%"), Livro.autor.like(f"%{busca}%")))

    return list(db.scalars(consulta).all())


def buscar_livro(db: Session, id: int) -> Livro:
    livro = db.get(Livro, id)
    if livro is None:
        raise HTTPException(status_code=404, detail="Livro não encontrado.")

    return livro


def gerar_resumo(db: Session) -> ResumoSchema:
    linhas = db.execute(select(Livro.status, func.count()).group_by(Livro.status)).all()
    contagem = {status: quantidade for status, quantidade in linhas}

    return ResumoSchema(
        total=sum(contagem.values()),
        quero_ler=contagem.get("Quero ler", 0),
        lendo=contagem.get("Lendo", 0),
        lidos=contagem.get("Lido", 0),
    )
