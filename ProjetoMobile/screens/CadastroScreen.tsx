import { useState } from "react";
import { KeyboardAvoidingView, Platform, ScrollView, StyleSheet, Text } from "react-native";
import Cabecalho from "../components/Cabecalho";
import CampoTexto from "../components/CampoTexto";
import SeletorOpcoes from "../components/SeletorOpcoes";
import Botao from "../components/Botao";
import { Cores } from "../models/Cores";
import { STATUS_LEITURA, StatusLeitura } from "../models/Livro";
import { cadastrarLivro } from "../services/livrosService";

export default function CadastroScreen() {
    const [titulo, setTitulo] = useState('');
    const [autor, setAutor] = useState('');
    const [genero, setGenero] = useState('');
    const [ano, setAno] = useState('');
    const [paginas, setPaginas] = useState('');
    const [status, setStatus] = useState<StatusLeitura>('Quero ler');
    const [salvando, setSalvando] = useState(false);
    const [erro, setErro] = useState('');
    const [sucesso, setSucesso] = useState('');

    async function cadastrar() {
        setSucesso('');

        if (titulo.trim() === '' || autor.trim() === '' || genero.trim() === '' || ano === '' || paginas === '') {
            setErro('Preencha todos os campos');
            return;
        }

        try {
            setSalvando(true);
            setErro('');

            await cadastrarLivro({
                titulo: titulo,
                autor: autor,
                genero: genero,
                status: status,
                anoPublicacao: Number(ano),
                paginas: Number(paginas),
                paginaAtual: 0,
                sinopse: '',
            });

            setTitulo('');
            setAutor('');
            setGenero('');
            setAno('');
            setPaginas('');
            setStatus('Quero ler');
            setSucesso('Livro cadastrado com sucesso!');
        } catch (e) {
            setErro(e instanceof Error ? e.message : 'Erro inesperado.');
        } finally {
            setSalvando(false);
        }
    }

    return (
        <KeyboardAvoidingView style={styles.container} behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
            <ScrollView contentContainerStyle={styles.conteudo} keyboardShouldPersistTaps="handled">
                <Cabecalho titulo="Novo Livro" subtitulo="Adicione um livro à sua biblioteca" />

                <CampoTexto rotulo="Título" placeholder="Insira o título" valor={titulo} onChangeText={setTitulo} />
                <CampoTexto rotulo="Autor" placeholder="Insira o autor" valor={autor} onChangeText={setAutor} />
                <CampoTexto rotulo="Gênero" placeholder="Insira o gênero" valor={genero} onChangeText={setGenero} />
                <CampoTexto rotulo="Ano de publicação" placeholder="Ex.: 1937" valor={ano} onChangeText={setAno} />
                <CampoTexto rotulo="Páginas" placeholder="Total de páginas" valor={paginas} onChangeText={setPaginas} />

                <Text style={styles.rotulo}>Status de leitura</Text>
                <SeletorOpcoes
                    opcoes={STATUS_LEITURA}
                    selecionada={status}
                    onSelecionar={(opcao) => setStatus(opcao as StatusLeitura)}
                />

                {erro !== '' && <Text style={styles.erro}>{erro}</Text>}
                {sucesso !== '' && <Text style={styles.sucesso}>{sucesso}</Text>}

                <Botao titulo={salvando ? 'Salvando...' : 'Adicionar'} onPress={cadastrar} />
            </ScrollView>
        </KeyboardAvoidingView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },

    conteudo: {
        paddingHorizontal: 24,
        paddingBottom: 24,
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

    sucesso: {
        marginTop: 12,
        fontWeight: '600',
        color: Cores.sucesso,
    },
});
