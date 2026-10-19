import { useEffect, useState } from "react";
import { Pressable, ScrollView, StyleSheet, Text, View } from "react-native";
import { useNavigation } from "@react-navigation/native";
import Cabecalho from "../components/Cabecalho";
import CardResumo from "../components/CardResumo";
import Botao from "../components/Botao";
import Carregando from "../components/Carregando";
import MensagemErro from "../components/MensagemErro";
import BarraProgresso from "../components/BarraProgresso";
import { Cores, CoresStatus } from "../models/Cores";
import { Livro, Resumo } from "../models/Livro";
import { Navegacao } from "../models/Navegacao";
import { buscarResumo, listarLivros } from "../services/livrosService";

export default function InicioScreen() {
    const navigation = useNavigation<Navegacao>();

    const [resumo, setResumo] = useState<Resumo | null>(null);
    const [lendo, setLendo] = useState<Livro[]>([]);
    const [carregando, setCarregando] = useState(true);
    const [erro, setErro] = useState('');

    async function carregarDados() {
        setCarregando(true);
        setErro('');
        try {
            const [dadosResumo, dadosLendo] = await Promise.all([
                buscarResumo(),
                listarLivros('Lendo'),
            ]);
            setResumo(dadosResumo);
            setLendo(dadosLendo);
        } catch (e) {
            setErro(e instanceof Error ? e.message : 'Erro inesperado.');
        } finally {
            setCarregando(false);
        }
    }

    useEffect(() => {
        carregarDados();
    }, []);

    function renderizarConteudo() {
        if (carregando) {
            return <Carregando mensagem="Carregando sua biblioteca..." />;
        }

        if (erro !== '' || resumo === null) {
            return <MensagemErro mensagem={erro} onTentarNovamente={carregarDados} />;
        }

        return (
            <View>
                <View style={styles.resumo}>
                    <CardResumo
                        rotulo="Quero ler"
                        valor={resumo.queroLer}
                        corFundo={CoresStatus['Quero ler'].fundo}
                        corTexto={CoresStatus['Quero ler'].texto}
                    />
                    <CardResumo
                        rotulo="Lendo"
                        valor={resumo.lendo}
                        corFundo={CoresStatus['Lendo'].fundo}
                        corTexto={CoresStatus['Lendo'].texto}
                    />
                    <CardResumo
                        rotulo="Lidos"
                        valor={resumo.lidos}
                        corFundo={CoresStatus['Lido'].fundo}
                        corTexto={CoresStatus['Lido'].texto}
                    />
                </View>

                <Text style={styles.secao}>Lendo agora</Text>
                {
                    lendo.length > 0 ? (
                        lendo.map((livro) => (
                            <Pressable
                                key={livro.id}
                                style={styles.itemLendo}
                                onPress={() => navigation.navigate('DetalhesLivro', { id: livro.id, titulo: livro.titulo })}
                            >
                                <Text style={styles.tituloLivro}>{livro.titulo}</Text>
                                <Text style={styles.autorLivro}>{livro.autor}</Text>
                                <View style={styles.progresso}>
                                    <BarraProgresso percentual={livro.paginaAtual / livro.paginas * 100} />
                                    <Text style={styles.paginas}>Página {livro.paginaAtual} de {livro.paginas}</Text>
                                </View>
                            </Pressable>
                        ))
                    ) : (
                        <Text style={styles.vazio}>
                            {resumo.total === 0 ? 'Nenhum livro cadastrado ainda.' : 'Nenhum livro em leitura no momento.'}
                        </Text>
                    )
                }
            </View>
        );
    }

    return (
        <ScrollView contentContainerStyle={styles.conteudo}>
            <Cabecalho titulo="MeusLivros" subtitulo="Sua biblioteca pessoal" />

            {renderizarConteudo()}

            <Botao titulo="Ver todos os livros" onPress={() => navigation.navigate('Abas', { screen: 'Livros' })} />
            <Botao titulo="Ver metas de leitura" secundario onPress={() => navigation.navigate('Abas', { screen: 'Metas' })} />
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    conteudo: {
        paddingHorizontal: 24,
        paddingBottom: 24,
    },

    resumo: {
        flexDirection: 'row',
        gap: 10,
    },

    secao: {
        fontSize: 20,
        fontWeight: '700',
        marginTop: 32,
        marginBottom: 12,
        color: Cores.texto,
    },

    itemLendo: {
        backgroundColor: Cores.superficie,
        borderWidth: 1,
        borderColor: Cores.borda,
        borderRadius: 12,
        padding: 16,
        marginBottom: 10,
    },

    tituloLivro: {
        fontSize: 16,
        fontWeight: '700',
        color: Cores.texto,
    },

    autorLivro: {
        fontSize: 14,
        marginTop: 2,
        color: Cores.textoSuave,
    },

    progresso: {
        marginTop: 12,
        gap: 6,
    },

    paginas: {
        fontSize: 13,
        color: Cores.textoSuave,
    },

    vazio: {
        fontSize: 15,
        color: Cores.textoSuave,
    },
});
