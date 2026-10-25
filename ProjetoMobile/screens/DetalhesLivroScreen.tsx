import { useCallback, useState } from "react";
import { ScrollView, StyleSheet, Text, View } from "react-native";
import { useFocusEffect } from "@react-navigation/native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import Cabecalho from "../components/Cabecalho";
import Carregando from "../components/Carregando";
import MensagemErro from "../components/MensagemErro";
import BarraProgresso from "../components/BarraProgresso";
import Botao from "../components/Botao";
import { Cores, CoresStatus } from "../models/Cores";
import { Livro } from "../models/Livro";
import { RotasParamList } from "../models/Navegacao";
import { buscarLivro, excluirLivro } from "../services/livrosService";

type DetalhesLivroScreenProps = NativeStackScreenProps<RotasParamList, 'DetalhesLivro'>;

function formatarData(data: string) {
    return data.split('-').reverse().join('/');
}

export default function DetalhesLivroScreen({route, navigation}: DetalhesLivroScreenProps) {
    const { id } = route.params;

    const [livro, setLivro] = useState<Livro | null>(null);
    const [carregando, setCarregando] = useState(true);
    const [erro, setErro] = useState('');
    const [confirmarExclusao, setConfirmarExclusao] = useState(false);

    async function carregarLivro() {
        setCarregando(true);
        setErro('');
        setConfirmarExclusao(false);
        try {
            const dados = await buscarLivro(id);
            setLivro(dados);
            navigation.setOptions({ title: dados.titulo });
        } catch (e) {
            setErro(e instanceof Error ? e.message : 'Erro inesperado.');
        } finally {
            setCarregando(false);
        }
    }

    useFocusEffect(
        useCallback(() => {
            carregarLivro();
        }, [id])
    );

    async function excluir() {
        try {
            await excluirLivro(id);
            navigation.goBack();
        } catch (e) {
            setErro(e instanceof Error ? e.message : 'Erro inesperado.');
        }
    }

    if (carregando) {
        return <Carregando mensagem="Carregando livro..." />;
    }

    if (erro !== '' || livro === null) {
        return (
            <View style={styles.conteudo}>
                <MensagemErro mensagem={erro} onTentarNovamente={carregarLivro} />
            </View>
        );
    }

    const percentual = livro.paginaAtual / livro.paginas * 100;

    return (
        <ScrollView contentContainerStyle={styles.conteudo}>
            <Cabecalho titulo={livro.titulo} subtitulo={livro.autor} />

            <Text style={[
                styles.status,
                { backgroundColor: CoresStatus[livro.status].fundo, color: CoresStatus[livro.status].texto }
            ]}>
                {livro.status}
            </Text>

            <View style={styles.infos}>
                <View style={styles.info}>
                    <Text style={styles.infoRotulo}>Gênero</Text>
                    <Text style={styles.infoValor}>{livro.genero}</Text>
                </View>
                <View style={styles.info}>
                    <Text style={styles.infoRotulo}>Ano</Text>
                    <Text style={styles.infoValor}>{livro.anoPublicacao}</Text>
                </View>
                <View style={styles.info}>
                    <Text style={styles.infoRotulo}>Páginas</Text>
                    <Text style={styles.infoValor}>{livro.paginas}</Text>
                </View>
            </View>

            <Text style={styles.secao}>Progresso</Text>
            <BarraProgresso percentual={percentual} />
            <Text style={styles.textoSuave}>
                Página {livro.paginaAtual} de {livro.paginas} ({Math.round(percentual)}%)
            </Text>
            {
                livro.dataConclusao && (
                    <Text style={styles.textoSuave}>Concluído em {formatarData(livro.dataConclusao)}</Text>
                )
            }

            <Text style={styles.secao}>Sinopse</Text>
            <Text style={styles.sinopse}>{livro.sinopse}</Text>

            <View style={styles.acoes}>
                <Botao titulo="Editar" onPress={() => navigation.navigate('EditarLivro', { id: livro.id })} />
                {
                    confirmarExclusao ? (
                        <View>
                            <Text style={styles.aviso}>Deseja mesmo excluir este livro?</Text>
                            <Botao titulo="Sim, excluir" onPress={excluir} />
                            <Botao titulo="Cancelar" secundario onPress={() => setConfirmarExclusao(false)} />
                        </View>
                    ) : (
                        <Botao titulo="Excluir" secundario onPress={() => setConfirmarExclusao(true)} />
                    )
                }
            </View>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    conteudo: {
        padding: 24,
    },

    status: {
        alignSelf: 'flex-start',
        fontSize: 13,
        fontWeight: '700',
        paddingHorizontal: 12,
        paddingVertical: 5,
        borderRadius: 999,
        overflow: 'hidden',
        marginTop: -8,
        marginBottom: 20,
    },

    infos: {
        flexDirection: 'row',
        gap: 10,
    },

    info: {
        flex: 1,
        backgroundColor: Cores.superficie,
        borderWidth: 1,
        borderColor: Cores.borda,
        borderRadius: 12,
        paddingVertical: 12,
        paddingHorizontal: 10,
        alignItems: 'center',
    },

    infoRotulo: {
        fontSize: 12,
        fontWeight: '600',
        color: Cores.textoSuave,
    },

    infoValor: {
        fontSize: 15,
        fontWeight: '700',
        marginTop: 4,
        textAlign: 'center',
        color: Cores.texto,
    },

    secao: {
        fontSize: 18,
        fontWeight: '700',
        marginTop: 28,
        marginBottom: 10,
        color: Cores.texto,
    },

    textoSuave: {
        fontSize: 14,
        marginTop: 8,
        color: Cores.textoSuave,
    },

    sinopse: {
        fontSize: 15,
        lineHeight: 24,
        color: Cores.texto,
    },

    acoes: {
        marginTop: 28,
    },

    aviso: {
        marginTop: 16,
        fontWeight: '600',
        color: Cores.erro,
    },
});
