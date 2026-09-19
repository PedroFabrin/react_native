import { Pressable, StyleSheet, Text, View } from "react-native";
import { Cores } from "../models/Cores";
import { Tela, TELAS } from "../models/Tela";

type BarraNavegacaoProps = {
    telaAtual: Tela,
    onMudarTela: (tela: Tela) => void,
}

export default function BarraNavegacao({telaAtual, onMudarTela}: BarraNavegacaoProps) {
    return (
        <View style={styles.barra}>
            {
                TELAS.map((tela) => (
                    <Pressable key={tela} style={styles.aba} onPress={() => onMudarTela(tela)}>
                        <Text style={[styles.texto, tela === telaAtual && styles.textoAtivo]}>
                            {tela}
                        </Text>
                        <View style={[styles.indicador, tela === telaAtual && styles.indicadorAtivo]} />
                    </Pressable>
                ))
            }
        </View>
    );
}

const styles = StyleSheet.create({
    barra: {
        flexDirection: 'row',
        backgroundColor: Cores.superficie,
        borderTopWidth: 1,
        borderTopColor: Cores.borda,
        paddingBottom: 12,
    },

    aba: {
        flex: 1,
        alignItems: 'center',
        paddingTop: 14,
        gap: 6,
    },

    texto: {
        fontSize: 14,
        fontWeight: '600',
        color: Cores.textoSuave,
    },

    textoAtivo: {
        color: Cores.primaria,
        fontWeight: '800',
    },

    indicador: {
        width: 24,
        height: 3,
        borderRadius: 2,
        backgroundColor: 'transparent',
    },

    indicadorAtivo: {
        backgroundColor: Cores.primaria,
    },
});
