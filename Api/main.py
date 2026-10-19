from fastapi import FastAPI, HTTPException, Request
from fastapi.exceptions import RequestValidationError
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import JSONResponse
from sqlalchemy.exc import SQLAlchemyError

from controller import livro_controller, meta_controller

app = FastAPI(title="MeusLivros API", description="Web API do app MeusLivros (Checkpoint 2)")

app.add_middleware(CORSMiddleware, allow_origins=["*"], allow_methods=["*"], allow_headers=["*"])

app.include_router(livro_controller.router)
app.include_router(meta_controller.router)


@app.exception_handler(HTTPException)
def erro_http(request: Request, erro: HTTPException):
    return JSONResponse(status_code=erro.status_code, content={"mensagem": erro.detail})


@app.exception_handler(RequestValidationError)
def erro_validacao(request: Request, erro: RequestValidationError):
    return JSONResponse(status_code=422, content={"mensagem": "Parâmetros inválidos na requisição."})


@app.exception_handler(SQLAlchemyError)
def erro_banco(request: Request, erro: SQLAlchemyError):
    return JSONResponse(status_code=500, content={"mensagem": "Não foi possível acessar o banco de dados."})
