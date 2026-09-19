import { useState } from "react";
import { KeyboardAvoidingView, Platform, ScrollView, StyleSheet, Text } from "react-native";
import Cabecalho from "../components/Cabecalho";
import CampoTexto from "../components/CampoTexto";
import SeletorOpcoes from "../components/SeletorOpcoes";
import Botao from "../components/Botao";
import { Cores } from "../models/Cores";
import { STATUS_LEITURA, StatusLeitura } from "../models/Livro";

type CadastroScreenProps = {
    onCadastrar: (titulo: string, autor: string, status: StatusLeitura) => void,
}

export default function CadastroScreen({onCadastrar}: CadastroScreenProps) {
    const [titulo, setTitulo] = useState('');
    const [autor, setAutor] = useState('');
    const [status, setStatus] = useState<StatusLeitura>('Quero ler');
    const [erro, setErro] = useState('');
    const [sucesso, setSucesso] = useState('');

    function cadastrar() {
        if (titulo.trim() === '' || autor.trim() === '') {
            setSucesso('');
            setErro('Preencha o título e o autor');
            return;
        }

        onCadastrar(titulo.trim(), autor.trim(), status);

        setTitulo('');
        setAutor('');
        setStatus('Quero ler');
        setErro('');
        setSucesso('Livro cadastrado com sucesso!');
    }

    return (
        <KeyboardAvoidingView style={styles.container} behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
            <ScrollView contentContainerStyle={styles.conteudo} keyboardShouldPersistTaps="handled">
                <Cabecalho titulo="Novo Livro" subtitulo="Adicione um livro à sua biblioteca" />

                <CampoTexto
                    rotulo="Título"
                    placeholder="Insira o título"
                    valor={titulo}
                    onChangeText={(texto) => { setTitulo(texto); setSucesso(''); }}
                />

                <CampoTexto
                    rotulo="Autor"
                    placeholder="Insira o autor"
                    valor={autor}
                    onChangeText={(texto) => { setAutor(texto); setSucesso(''); }}
                />

                <Text style={styles.rotulo}>Status de leitura</Text>
                <SeletorOpcoes
                    opcoes={STATUS_LEITURA}
                    selecionada={status}
                    onSelecionar={(opcao) => setStatus(opcao as StatusLeitura)}
                />

                {erro !== '' && <Text style={styles.erro}>{erro}</Text>}
                {sucesso !== '' && <Text style={styles.sucesso}>{sucesso}</Text>}

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

    sucesso: {
        marginTop: 12,
        fontWeight: '600',
        color: Cores.sucesso,
    },
});
