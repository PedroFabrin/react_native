import { useState } from "react";
import { FlatList, StyleSheet, Text, View } from "react-native";
import Cabecalho from "../components/Cabecalho";
import CardLivro from "../components/CardLivro";
import SeletorOpcoes from "../components/SeletorOpcoes";
import { Cores } from "../models/Cores";
import { Livro, STATUS_LEITURA } from "../models/Livro";

type LivrosScreenProps = {
    livros: Livro[],
    onAvancar: (id: number) => void,
    onExcluir: (id: number) => void,
}

const FILTROS = ['Todos', ...STATUS_LEITURA];

export default function LivrosScreen({livros, onAvancar, onExcluir}: LivrosScreenProps) {
    const [filtro, setFiltro] = useState('Todos');

    const livrosVisiveis = filtro === 'Todos'
        ? livros
        : livros.filter((livro) => livro.status === filtro);

    return (
        <FlatList
            data={livrosVisiveis}
            keyExtractor={(item) => item.id.toString()}
            contentContainerStyle={styles.conteudo}

            ListHeaderComponent={
                <View>
                    <Cabecalho titulo="Meus Livros" subtitulo={`${livros.length} livro(s) cadastrado(s)`} />
                    <SeletorOpcoes opcoes={FILTROS} selecionada={filtro} onSelecionar={setFiltro} />
                    <View style={styles.espaco} />
                </View>
            }

            ListEmptyComponent={
                <View style={styles.vazio}>
                    <Text style={styles.textoVazio}>Nenhum livro encontrado</Text>
                </View>
            }

            renderItem={({item}) => (
                <CardLivro
                    id={item.id}
                    titulo={item.titulo}
                    autor={item.autor}
                    status={item.status}
                    onAvancar={onAvancar}
                    onExcluir={onExcluir}
                />
            )}
        />
    );
}

const styles = StyleSheet.create({
    conteudo: {
        paddingHorizontal: 24,
        paddingBottom: 24,
    },

    espaco: {
        height: 20,
    },

    vazio: {
        borderWidth: 1,
        borderColor: Cores.borda,
        borderRadius: 12,
        padding: 24,
        alignItems: 'center',
        backgroundColor: Cores.superficie,
    },

    textoVazio: {
        fontSize: 16,
        fontWeight: '600',
        color: Cores.textoSuave,
    },
});
