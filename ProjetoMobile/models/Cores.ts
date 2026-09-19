import { StatusLeitura } from './Livro';

export const Cores = {
    fundo: '#FBF7F0',
    superficie: '#FFFFFF',
    borda: '#E7DDCF',
    texto: '#3B2A20',
    textoSuave: '#7A6656',
    primaria: '#5B3A29',
    primariaTexto: '#FFFFFF',
    erro: '#B91C1C',
    sucesso: '#166534',
};

export const CoresStatus: Record<StatusLeitura, { fundo: string, texto: string }> = {
    'Quero ler': { fundo: '#E0E7FF', texto: '#3730A3' },
    'Lendo': { fundo: '#FEF3C7', texto: '#92400E' },
    'Lido': { fundo: '#DCFCE7', texto: '#166534' },
};
