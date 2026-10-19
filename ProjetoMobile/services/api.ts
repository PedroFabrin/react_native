import Constants from 'expo-constants';

const host = Constants.expoConfig?.hostUri?.split(':')[0] ?? 'localhost';

export const API_URL = `http://${host}:8000`;

const TEMPO_LIMITE_MS = 15000;

export async function get<T>(caminho: string): Promise<T> {
    const controle = new AbortController();
    const temporizador = setTimeout(() => controle.abort(), TEMPO_LIMITE_MS);

    let resposta: Response;
    try {
        resposta = await fetch(`${API_URL}${caminho}`, { signal: controle.signal });
    } catch {
        if (controle.signal.aborted) {
            throw new Error('O servidor demorou demais para responder. Tente novamente.');
        }
        throw new Error('Não foi possível conectar à API. Verifique se o servidor está ligado.');
    } finally {
        clearTimeout(temporizador);
    }

    const dados = await resposta.json().catch(() => null);

    if (!resposta.ok) {
        throw new Error(dados?.mensagem ?? `Erro ${resposta.status} ao consultar o servidor.`);
    }

    return dados as T;
}
