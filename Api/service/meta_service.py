from sqlalchemy import extract, func, select
from sqlalchemy.orm import Session

from model.livro import Livro
from model.meta import Meta
from schema.meta_schema import MetaSchema


def contar_lidos_no_ano(db: Session, ano: int) -> int:
    return db.scalar(
        select(func.count())
        .select_from(Livro)
        .where(Livro.status == "Lido", extract("year", Livro.data_conclusao) == ano)
    )


def listar_metas(db: Session) -> list[MetaSchema]:
    metas = db.scalars(select(Meta).order_by(Meta.ano.desc())).all()
    resultado = []

    for meta in metas:
        livros_lidos = contar_lidos_no_ano(db, meta.ano)
        resultado.append(MetaSchema(
            id=meta.id,
            ano=meta.ano,
            quantidade_livros=meta.quantidade_livros,
            livros_lidos=livros_lidos,
            percentual=min(100, round(livros_lidos / meta.quantidade_livros * 100)),
        ))

    return resultado
