from datetime import date

from fastapi import HTTPException
from sqlalchemy import func, or_, select
from sqlalchemy.orm import Session

from model.livro import Livro
from schema.livro_schema import LivroEntradaSchema, ResumoSchema

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


def validar_livro(dados: LivroEntradaSchema):
    if dados.titulo.strip() == "" or dados.autor.strip() == "" or dados.genero.strip() == "":
        raise HTTPException(status_code=400, detail="Preencha o título, o autor e o gênero.")

    if dados.status not in STATUS_LEITURA:
        raise HTTPException(status_code=400, detail="Status inválido. Use: Quero ler, Lendo ou Lido.")

    if dados.ano_publicacao < 1 or dados.ano_publicacao > date.today().year:
        raise HTTPException(status_code=400, detail="Ano de publicação inválido.")

    if dados.paginas < 1:
        raise HTTPException(status_code=400, detail="O número de páginas deve ser maior que zero.")

    if dados.pagina_atual < 0 or dados.pagina_atual > dados.paginas:
        raise HTTPException(status_code=400, detail="A página atual deve estar entre 0 e o total de páginas.")


def preencher_livro(livro: Livro, dados: LivroEntradaSchema):
    validar_livro(dados)

    livro.titulo = dados.titulo.strip()
    livro.autor = dados.autor.strip()
    livro.genero = dados.genero.strip()
    livro.status = dados.status
    livro.ano_publicacao = dados.ano_publicacao
    livro.paginas = dados.paginas
    livro.pagina_atual = dados.pagina_atual
    livro.sinopse = dados.sinopse.strip()

    if dados.status == "Lido":
        livro.pagina_atual = dados.paginas
        livro.data_conclusao = livro.data_conclusao or date.today()
    else:
        livro.data_conclusao = None


def cadastrar_livro(db: Session, dados: LivroEntradaSchema) -> Livro:
    livro = Livro()
    preencher_livro(livro, dados)

    db.add(livro)
    db.commit()
    db.refresh(livro)
    return livro


def atualizar_livro(db: Session, id: int, dados: LivroEntradaSchema) -> Livro:
    livro = buscar_livro(db, id)
    preencher_livro(livro, dados)

    db.commit()
    db.refresh(livro)
    return livro


def excluir_livro(db: Session, id: int):
    livro = buscar_livro(db, id)

    db.delete(livro)
    db.commit()
