import { Pressable, StyleSheet, Text, View } from "react-native";
import { Cores } from "../models/Cores";

type SeletorOpcoesProps = {
    opcoes: string[],
    selecionada: string,
    onSelecionar: (opcao: string) => void,
}

export default function SeletorOpcoes({opcoes, selecionada, onSelecionar}: SeletorOpcoesProps) {
    return (
        <View style={styles.container}>
            {
                opcoes.map((opcao) => (
                    <Pressable
                        key={opcao}
                        style={[styles.opcao, opcao === selecionada && styles.opcaoAtiva]}
                        onPress={() => onSelecionar(opcao)}
                    >
                        <Text style={[styles.texto, opcao === selecionada && styles.textoAtivo]}>
                            {opcao}
                        </Text>
                    </Pressable>
                ))
            }
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        gap: 8,
    },

    opcao: {
        paddingHorizontal: 14,
        paddingVertical: 8,
        borderRadius: 999,
        borderWidth: 1,
        borderColor: Cores.borda,
        backgroundColor: Cores.superficie,
    },

    opcaoAtiva: {
        backgroundColor: Cores.primaria,
        borderColor: Cores.primaria,
    },

    texto: {
        fontSize: 14,
        fontWeight: '600',
        color: Cores.textoSuave,
    },

    textoAtivo: {
        color: Cores.primariaTexto,
    },
});
