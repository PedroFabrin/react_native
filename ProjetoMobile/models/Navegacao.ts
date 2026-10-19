import { NavigatorScreenParams } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';

export type AbasParamList = {
    'Início': undefined,
    'Livros': undefined,
    'Cadastrar': undefined,
    'Metas': undefined,
}

export type RotasParamList = {
    Abas: NavigatorScreenParams<AbasParamList>,
    DetalhesLivro: { id: number, titulo: string },
}

export type Navegacao = NativeStackNavigationProp<RotasParamList>;
