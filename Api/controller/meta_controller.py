from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from db.database import get_db
from schema.meta_schema import MetaSchema
from service import meta_service

router = APIRouter(tags=["Metas"])


@router.get("/metas", response_model=list[MetaSchema])
def listar_metas(db: Session = Depends(get_db)):
    return meta_service.listar_metas(db)
