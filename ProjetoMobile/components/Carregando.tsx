import { ActivityIndicator, StyleSheet, Text, View } from "react-native";
import { Cores } from "../models/Cores";

type CarregandoProps = {
    mensagem?: string,
}

export default function Carregando({mensagem = 'Carregando...'}: CarregandoProps) {
    return (
        <View style={styles.container}>
            <ActivityIndicator size="large" color={Cores.primaria} />
            <Text style={styles.texto}>{mensagem}</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 40,
        gap: 12,
    },

    texto: {
        fontSize: 15,
        color: Cores.textoSuave,
    },
});
