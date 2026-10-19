import { useEffect, useState } from "react";
import { ScrollView, StyleSheet, Text, View } from "react-native";
import Cabecalho from "../components/Cabecalho";
import Carregando from "../components/Carregando";
import MensagemErro from "../components/MensagemErro";
import MensagemVazia from "../components/MensagemVazia";
import BarraProgresso from "../components/BarraProgresso";
import { Cores } from "../models/Cores";
import { Meta } from "../models/Meta";
import { listarMetas } from "../services/metasService";

export default function MetasScreen() {
    const [metas, setMetas] = useState<Meta[]>([]);
    const [carregando, setCarregando] = useState(true);
    const [erro, setErro] = useState('');

    async function carregarMetas() {
        setCarregando(true);
        setErro('');
        try {
            const dados = await listarMetas();
            setMetas(dados);
        } catch (e) {
            setErro(e instanceof Error ? e.message : 'Erro inesperado.');
        } finally {
            setCarregando(false);
        }
    }

    useEffect(() => {
        carregarMetas();
    }, []);

    function renderizarConteudo() {
        if (carregando) {
            return <Carregando mensagem="Carregando metas..." />;
        }
        if (erro !== '') {
            return <MensagemErro mensagem={erro} onTentarNovamente={carregarMetas} />;
        }
        if (metas.length === 0) {
            return <MensagemVazia texto="Nenhuma meta de leitura cadastrada" />;
        }

        return metas.map((meta) => (
            <View key={meta.id} style={styles.card}>
                <View style={styles.linhaTopo}>
                    <Text style={styles.ano}>{meta.ano}</Text>
                    <Text style={styles.percentual}>{meta.percentual}%</Text>
                </View>
                <BarraProgresso percentual={meta.percentual} />
                <Text style={styles.detalhe}>
                    {meta.livrosLidos} de {meta.quantidadeLivros} livros lidos
                </Text>
                {
                    meta.livrosLidos >= meta.quantidadeLivros && (
                        <Text style={styles.concluida}>Meta concluída!</Text>
                    )
                }
            </View>
        ));
    }

    return (
        <ScrollView contentContainerStyle={styles.conteudo}>
            <Cabecalho titulo="Metas de Leitura" subtitulo="Acompanhe seus objetivos anuais" />
            {renderizarConteudo()}
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    conteudo: {
        paddingHorizontal: 24,
        paddingBottom: 24,
    },

    card: {
        backgroundColor: Cores.superficie,
        borderWidth: 1,
        borderColor: Cores.borda,
        borderRadius: 12,
        padding: 18,
        marginBottom: 14,
        gap: 10,
    },

    linhaTopo: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'baseline',
    },

    ano: {
        fontSize: 22,
        fontWeight: '800',
        color: Cores.texto,
    },

    percentual: {
        fontSize: 18,
        fontWeight: '700',
        color: Cores.primaria,
    },

    detalhe: {
        fontSize: 15,
        color: Cores.textoSuave,
    },

    concluida: {
        fontSize: 14,
        fontWeight: '700',
        color: Cores.sucesso,
    },
});
