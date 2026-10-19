import { StyleSheet, Text, View } from "react-native";
import { Cores } from "../models/Cores";

type MensagemVaziaProps = {
    texto: string,
}

export default function MensagemVazia({texto}: MensagemVaziaProps) {
    return (
        <View style={styles.vazio}>
            <Text style={styles.texto}>{texto}</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    vazio: {
        borderWidth: 1,
        borderColor: Cores.borda,
        borderRadius: 12,
        padding: 24,
        alignItems: 'center',
        backgroundColor: Cores.superficie,
    },

    texto: {
        fontSize: 16,
        fontWeight: '600',
        textAlign: 'center',
        color: Cores.textoSuave,
    },
});
