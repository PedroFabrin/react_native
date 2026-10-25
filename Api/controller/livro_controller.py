from fastapi import APIRouter, Depends, Response
from sqlalchemy.orm import Session

from db.database import get_db
from schema.livro_schema import LivroEntradaSchema, LivroSchema, ResumoSchema
from service import livro_service

router = APIRouter(tags=["Livros"])


@router.get("/livros", response_model=list[LivroSchema])
def listar_livros(status: str | None = None, busca: str | None = None, db: Session = Depends(get_db)):
    return livro_service.listar_livros(db, status, busca)


@router.get("/livros/{id}", response_model=LivroSchema)
def buscar_livro(id: int, db: Session = Depends(get_db)):
    return livro_service.buscar_livro(db, id)


@router.post("/livros", response_model=LivroSchema, status_code=201)
def cadastrar_livro(dados: LivroEntradaSchema, db: Session = Depends(get_db)):
    return livro_service.cadastrar_livro(db, dados)


@router.put("/livros/{id}", response_model=LivroSchema)
def atualizar_livro(id: int, dados: LivroEntradaSchema, db: Session = Depends(get_db)):
    return livro_service.atualizar_livro(db, id, dados)


@router.delete("/livros/{id}", status_code=204)
def excluir_livro(id: int, db: Session = Depends(get_db)):
    livro_service.excluir_livro(db, id)
    return Response(status_code=204)


@router.get("/resumo", response_model=ResumoSchema)
def resumo(db: Session = Depends(get_db)):
    return livro_service.gerar_resumo(db)
