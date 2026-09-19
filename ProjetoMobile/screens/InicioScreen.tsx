import { ScrollView, StyleSheet, Text, View } from "react-native";
import Cabecalho from "../components/Cabecalho";
import CardResumo from "../components/CardResumo";
import Botao from "../components/Botao";
import { Cores, CoresStatus } from "../models/Cores";
import { Livro } from "../models/Livro";
import { Tela } from "../models/Tela";

type InicioScreenProps = {
    livros: Livro[],
    onIrPara: (tela: Tela) => void,
}

export default function InicioScreen({livros, onIrPara}: InicioScreenProps) {
    const querLer = livros.filter((livro) => livro.status === 'Quero ler').length;
    const lendo = livros.filter((livro) => livro.status === 'Lendo');
    const lidos = livros.filter((livro) => livro.status === 'Lido').length;

    return (
        <ScrollView contentContainerStyle={styles.conteudo}>
            <Cabecalho titulo="MeusLivros" subtitulo="Sua biblioteca pessoal" />

            <View style={styles.resumo}>
                <CardResumo
                    rotulo="Quero ler"
                    valor={querLer}
                    corFundo={CoresStatus['Quero ler'].fundo}
                    corTexto={CoresStatus['Quero ler'].texto}
                />
                <CardResumo
                    rotulo="Lendo"
                    valor={lendo.length}
                    corFundo={CoresStatus['Lendo'].fundo}
                    corTexto={CoresStatus['Lendo'].texto}
                />
                <CardResumo
                    rotulo="Lidos"
                    valor={lidos}
                    corFundo={CoresStatus['Lido'].fundo}
                    corTexto={CoresStatus['Lido'].texto}
                />
            </View>

            <Text style={styles.secao}>Lendo agora</Text>
            {
                lendo.length > 0 ? (
                    lendo.map((livro) => (
                        <View key={livro.id} style={styles.itemLendo}>
                            <Text style={styles.tituloLivro}>{livro.titulo}</Text>
                            <Text style={styles.autorLivro}>{livro.autor}</Text>
                        </View>
                    ))
                ) : (
                    <Text style={styles.vazio}>Nenhum livro em leitura no momento.</Text>
                )
            }

            <Botao titulo="Cadastrar novo livro" onPress={() => onIrPara('Cadastrar')} />
            <Botao titulo="Ver todos os livros" secundario onPress={() => onIrPara('Livros')} />
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

    vazio: {
        fontSize: 15,
        color: Cores.textoSuave,
    },
});
