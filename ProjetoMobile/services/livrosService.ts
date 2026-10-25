import { Livro, LivroEntrada, Resumo, StatusLeitura } from '../models/Livro';
import { requisicao } from './api';

export async function listarLivros(status?: StatusLeitura, busca?: string): Promise<Livro[]> {
    const parametros = new URLSearchParams();

    if (status) {
        parametros.append('status', status);
    }
    if (busca) {
        parametros.append('busca', busca);
    }

    const query = parametros.toString();
    return await requisicao<Livro[]>(query ? `/livros?${query}` : '/livros');
}

export async function buscarLivro(id: number): Promise<Livro> {
    return await requisicao<Livro>(`/livros/${id}`);
}

export async function cadastrarLivro(livro: LivroEntrada): Promise<Livro> {
    return await requisicao<Livro>('/livros', 'POST', livro);
}

export async function atualizarLivro(id: number, livro: LivroEntrada): Promise<Livro> {
    return await requisicao<Livro>(`/livros/${id}`, 'PUT', livro);
}

export async function excluirLivro(id: number): Promise<void> {
    await requisicao(`/livros/${id}`, 'DELETE');
}

export async function buscarResumo(): Promise<Resumo> {
    return await requisicao<Resumo>('/resumo');
}
