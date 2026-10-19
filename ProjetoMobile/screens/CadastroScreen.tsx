import { useState } from "react";
import { KeyboardAvoidingView, Platform, ScrollView, StyleSheet, Text } from "react-native";
import Cabecalho from "../components/Cabecalho";
import CampoTexto from "../components/CampoTexto";
import SeletorOpcoes from "../components/SeletorOpcoes";
import Botao from "../components/Botao";
import { Cores } from "../models/Cores";
import { STATUS_LEITURA, StatusLeitura } from "../models/Livro";

export default function CadastroScreen() {
    const [titulo, setTitulo] = useState('');
    const [autor, setAutor] = useState('');
    const [status, setStatus] = useState<StatusLeitura>('Quero ler');
    const [erro, setErro] = useState('');
    const [aviso, setAviso] = useState('');

    function cadastrar() {
        if (titulo.trim() === '' || autor.trim() === '') {
            setAviso('');
            setErro('Preencha o título e o autor');
            return;
        }

        setErro('');
        setAviso('O envio do cadastro para a API (POST /livros) será implementado no Checkpoint 3.');
    }

    return (
        <KeyboardAvoidingView style={styles.container} behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
            <ScrollView contentContainerStyle={styles.conteudo} keyboardShouldPersistTaps="handled">
                <Cabecalho titulo="Novo Livro" subtitulo="Adicione um livro à sua biblioteca" />

                <Text style={styles.selo}>Disponível no Checkpoint 3</Text>

                <CampoTexto
                    rotulo="Título"
                    placeholder="Insira o título"
                    valor={titulo}
                    onChangeText={(texto) => { setTitulo(texto); setAviso(''); }}
                />

                <CampoTexto
                    rotulo="Autor"
                    placeholder="Insira o autor"
                    valor={autor}
                    onChangeText={(texto) => { setAutor(texto); setAviso(''); }}
                />

                <Text style={styles.rotulo}>Status de leitura</Text>
                <SeletorOpcoes
                    opcoes={STATUS_LEITURA}
                    selecionada={status}
                    onSelecionar={(opcao) => setStatus(opcao as StatusLeitura)}
                />

                {erro !== '' && <Text style={styles.erro}>{erro}</Text>}
                {aviso !== '' && <Text style={styles.aviso}>{aviso}</Text>}

                <Botao titulo="Adicionar" onPress={cadastrar} />
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

    aviso: {
        marginTop: 12,
        fontWeight: '600',
        color: '#92400E',
    },

    selo: {
        fontSize: 13,
        fontWeight: '700',
        color: '#92400E',
        backgroundColor: '#FEF3C7',
        alignSelf: 'flex-start',
        paddingHorizontal: 10,
        paddingVertical: 4,
        borderRadius: 999,
        overflow: 'hidden',
        marginTop: -8,
        marginBottom: 8,
    },
});
