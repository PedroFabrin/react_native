import { useEffect, useState } from "react";
import { FlatList, StyleSheet, View } from "react-native";
import { useNavigation } from "@react-navigation/native";
import Cabecalho from "../components/Cabecalho";
import CardLivro from "../components/CardLivro";
import CampoTexto from "../components/CampoTexto";
import SeletorOpcoes from "../components/SeletorOpcoes";
import Carregando from "../components/Carregando";
import MensagemErro from "../components/MensagemErro";
import MensagemVazia from "../components/MensagemVazia";
import { Livro, STATUS_LEITURA, StatusLeitura } from "../models/Livro";
import { Navegacao } from "../models/Navegacao";
import { listarLivros } from "../services/livrosService";

const FILTROS = ['Todos', ...STATUS_LEITURA];

export default function LivrosScreen() {
    const navigation = useNavigation<Navegacao>();

    const [livros, setLivros] = useState<Livro[]>([]);
    const [carregando, setCarregando] = useState(true);
    const [erro, setErro] = useState('');

    const [filtro, setFiltro] = useState('Todos');
    const [textoBusca, setTextoBusca] = useState('');
    const [busca, setBusca] = useState('');

    async function carregarLivros() {
        setCarregando(true);
        setErro('');
        try {
            const status = filtro === 'Todos' ? undefined : filtro as StatusLeitura;
            const dados = await listarLivros(status, busca);
            setLivros(dados);
        } catch (e) {
            setErro(e instanceof Error ? e.message : 'Erro inesperado.');
        } finally {
            setCarregando(false);
        }
    }

    useEffect(() => {
        carregarLivros();
    }, [filtro, busca]);

    function renderizarSemItens() {
        if (carregando) {
            return <Carregando mensagem="Buscando livros..." />;
        }
        if (erro !== '') {
            return <MensagemErro mensagem={erro} onTentarNovamente={carregarLivros} />;
        }
        return <MensagemVazia texto="Nenhum livro encontrado" />;
    }

    return (
        <FlatList
            data={carregando || erro !== '' ? [] : livros}
            keyExtractor={(item) => item.id.toString()}
            contentContainerStyle={styles.conteudo}
            keyboardShouldPersistTaps="handled"

            ListHeaderComponent={
                <View>
                    <Cabecalho
                        titulo="Meus Livros"
                        subtitulo={carregando ? 'Carregando...' : `${livros.length} livro(s) encontrado(s)`}
                    />
                    <SeletorOpcoes opcoes={FILTROS} selecionada={filtro} onSelecionar={setFiltro} />
                    <CampoTexto
                        rotulo="Buscar"
                        placeholder="Título ou autor"
                        valor={textoBusca}
                        onChangeText={setTextoBusca}
                        onSubmitEditing={() => setBusca(textoBusca.trim())}
                    />
                    <View style={styles.espaco} />
                </View>
            }

            ListEmptyComponent={renderizarSemItens()}

            renderItem={({item}) => (
                <CardLivro
                    titulo={item.titulo}
                    autor={item.autor}
                    status={item.status}
                    genero={item.genero}
                    anoPublicacao={item.anoPublicacao}
                    onPress={() => navigation.navigate('DetalhesLivro', { id: item.id, titulo: item.titulo })}
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
});
