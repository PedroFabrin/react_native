export type StatusLeitura = 'Quero ler' | 'Lendo' | 'Lido';

export const STATUS_LEITURA: StatusLeitura[] = ['Quero ler', 'Lendo', 'Lido'];

export type Livro = {
    id: number,
    titulo: string,
    autor: string,
    status: StatusLeitura,
    genero: string,
    anoPublicacao: number,
    paginas: number,
    paginaAtual: number,
    sinopse: string,
    dataConclusao: string | null,
}

export type LivroEntrada = Omit<Livro, 'id' | 'dataConclusao'>;

export type Resumo = {
    total: number,
    queroLer: number,
    lendo: number,
    lidos: number,
}
