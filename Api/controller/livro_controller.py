from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from db.database import get_db
from schema.livro_schema import LivroSchema, ResumoSchema
from service import livro_service

router = APIRouter(tags=["Livros"])


@router.get("/livros", response_model=list[LivroSchema])
def listar_livros(status: str | None = None, busca: str | None = None, db: Session = Depends(get_db)):
    return livro_service.listar_livros(db, status, busca)


@router.get("/livros/{id}", response_model=LivroSchema)
def buscar_livro(id: int, db: Session = Depends(get_db)):
    return livro_service.buscar_livro(db, id)


@router.get("/resumo", response_model=ResumoSchema)
def resumo(db: Session = Depends(get_db)):
    return livro_service.gerar_resumo(db)
