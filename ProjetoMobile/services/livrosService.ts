import { Livro, Resumo, StatusLeitura } from '../models/Livro';
import { get } from './api';

export async function listarLivros(status?: StatusLeitura, busca?: string): Promise<Livro[]> {
    const parametros = new URLSearchParams();

    if (status) {
        parametros.append('status', status);
    }
    if (busca) {
        parametros.append('busca', busca);
    }

    const query = parametros.toString();
    return await get<Livro[]>(query ? `/livros?${query}` : '/livros');
}

export async function buscarLivro(id: number): Promise<Livro> {
    return await get<Livro>(`/livros/${id}`);
}

export async function buscarResumo(): Promise<Resumo> {
    return await get<Resumo>('/resumo');
}
