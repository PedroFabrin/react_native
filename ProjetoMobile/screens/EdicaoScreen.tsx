import { useEffect, useState } from "react";
import { ScrollView, StyleSheet, Text, View } from "react-native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import CampoTexto from "../components/CampoTexto";
import SeletorOpcoes from "../components/SeletorOpcoes";
import Botao from "../components/Botao";
import Carregando from "../components/Carregando";
import MensagemErro from "../components/MensagemErro";
import { Cores } from "../models/Cores";
import { STATUS_LEITURA, StatusLeitura } from "../models/Livro";
import { RotasParamList } from "../models/Navegacao";
import { atualizarLivro, buscarLivro } from "../services/livrosService";

type EdicaoScreenProps = NativeStackScreenProps<RotasParamList, 'EditarLivro'>;

export default function EdicaoScreen({route, navigation}: EdicaoScreenProps) {
    const { id } = route.params;

    const [titulo, setTitulo] = useState('');
    const [autor, setAutor] = useState('');
    const [genero, setGenero] = useState('');
    const [ano, setAno] = useState('');
    const [paginas, setPaginas] = useState('');
    const [paginaAtual, setPaginaAtual] = useState('');
    const [sinopse, setSinopse] = useState('');
    const [status, setStatus] = useState<StatusLeitura>('Quero ler');

    const [carregando, setCarregando] = useState(true);
    const [erroCarregar, setErroCarregar] = useState('');
    const [salvando, setSalvando] = useState(false);
    const [erro, setErro] = useState('');

    async function carregarLivro() {
        try {
            setCarregando(true);
            setErroCarregar('');

            const livro = await buscarLivro(id);
            setTitulo(livro.titulo);
            setAutor(livro.autor);
            setGenero(livro.genero);
            setAno(livro.anoPublicacao.toString());
            setPaginas(livro.paginas.toString());
            setPaginaAtual(livro.paginaAtual.toString());
            setSinopse(livro.sinopse);
            setStatus(livro.status);
        } catch (e) {
            setErroCarregar(e instanceof Error ? e.message : 'Erro inesperado.');
        } finally {
            setCarregando(false);
        }
    }

    useEffect(() => {
        carregarLivro();
    }, [id]);

    async function salvar() {
        if (titulo.trim() === '' || autor.trim() === '' || genero.trim() === '' || ano === '' || paginas === '') {
            setErro('Preencha título, autor, gênero, ano e páginas');
            return;
        }

        try {
            setSalvando(true);
            setErro('');

            await atualizarLivro(id, {
                titulo: titulo,
                autor: autor,
                genero: genero,
                status: status,
                anoPublicacao: Number(ano),
                paginas: Number(paginas),
                paginaAtual: Number(paginaAtual),
                sinopse: sinopse,
            });

            navigation.goBack();
        } catch (e) {
            setErro(e instanceof Error ? e.message : 'Erro inesperado.');
        } finally {
            setSalvando(false);
        }
    }

    if (carregando) {
        return <Carregando mensagem="Carregando livro..." />;
    }

    if (erroCarregar !== '') {
        return (
            <View style={styles.conteudo}>
                <MensagemErro mensagem={erroCarregar} onTentarNovamente={carregarLivro} />
            </View>
        );
    }

    return (
        <ScrollView contentContainerStyle={styles.conteudo} keyboardShouldPersistTaps="handled">
            <CampoTexto rotulo="Título" valor={titulo} onChangeText={setTitulo} />
            <CampoTexto rotulo="Autor" valor={autor} onChangeText={setAutor} />
            <CampoTexto rotulo="Gênero" valor={genero} onChangeText={setGenero} />
            <CampoTexto rotulo="Ano de publicação" valor={ano} onChangeText={setAno} />
            <CampoTexto rotulo="Páginas" valor={paginas} onChangeText={setPaginas} />
            <CampoTexto rotulo="Página atual" valor={paginaAtual} onChangeText={setPaginaAtual} />
            <CampoTexto rotulo="Sinopse" valor={sinopse} onChangeText={setSinopse} />

            <Text style={styles.rotulo}>Status de leitura</Text>
            <SeletorOpcoes
                opcoes={STATUS_LEITURA}
                selecionada={status}
                onSelecionar={(opcao) => setStatus(opcao as StatusLeitura)}
            />

            {erro !== '' && <Text style={styles.erro}>{erro}</Text>}

            <Botao titulo={salvando ? 'Salvando...' : 'Salvar'} onPress={salvar} />
            <Botao titulo="Cancelar" secundario onPress={() => navigation.goBack()} />
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    conteudo: {
        padding: 24,
    },

    rotulo: {
        fontSize: 14,
        fontWeight: '600',
        marginTop: 16,
        marginBottom: 8,
        color: Cores.texto,
    },

    erro: {
        marginTop: 12,
        fontWeight: '600',
        color: Cores.erro,
    },
});
