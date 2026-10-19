import { Meta } from '../models/Meta';
import { get } from './api';

export async function listarMetas(): Promise<Meta[]> {
    return await get<Meta[]>('/metas');
}
