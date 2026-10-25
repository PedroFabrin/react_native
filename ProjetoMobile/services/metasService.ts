import { Meta } from '../models/Meta';
import { requisicao } from './api';

export async function listarMetas(): Promise<Meta[]> {
    return await requisicao<Meta[]>('/metas');
}
