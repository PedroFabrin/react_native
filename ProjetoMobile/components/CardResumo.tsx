import { StyleSheet, Text, View } from "react-native";
import { Cores } from "../models/Cores";

type CardResumoProps = {
    rotulo: string,
    valor: number,
    corFundo?: string,
    corTexto?: string,
}

export default function CardResumo({rotulo, valor, corFundo, corTexto}: CardResumoProps) {
    return (
        <View style={[styles.card, corFundo ? { backgroundColor: corFundo } : null]}>
            <Text style={[styles.valor, corTexto ? { color: corTexto } : null]}>{valor}</Text>
            <Text style={[styles.rotulo, corTexto ? { color: corTexto } : null]}>{rotulo}</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    card: {
        flex: 1,
        alignItems: 'center',
        backgroundColor: Cores.superficie,
        borderWidth: 1,
        borderColor: Cores.borda,
        borderRadius: 12,
        paddingVertical: 16,
    },

    valor: {
        fontSize: 28,
        fontWeight: '800',
        color: Cores.texto,
    },

    rotulo: {
        fontSize: 13,
        fontWeight: '600',
        marginTop: 2,
        color: Cores.textoSuave,
    },
});
