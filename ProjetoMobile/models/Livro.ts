export type StatusLeitura = 'Quero ler' | 'Lendo' | 'Lido';

export const STATUS_LEITURA: StatusLeitura[] = ['Quero ler', 'Lendo', 'Lido'];

export type Livro = {
    id: number,
    titulo: string,
    autor: string,
    status: StatusLeitura,
}
