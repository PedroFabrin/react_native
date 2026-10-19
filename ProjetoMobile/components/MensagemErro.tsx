import { StyleSheet, Text, View } from "react-native";
import Botao from "./Botao";
import { Cores } from "../models/Cores";

type MensagemErroProps = {
    mensagem: string,
    onTentarNovamente: () => void,
}

export default function MensagemErro({mensagem, onTentarNovamente}: MensagemErroProps) {
    return (
        <View style={styles.card}>
            <Text style={styles.titulo}>Algo deu errado</Text>
            <Text style={styles.mensagem}>{mensagem}</Text>
            <Botao titulo="Tentar novamente" secundario onPress={onTentarNovamente} />
        </View>
    );
}

const styles = StyleSheet.create({
    card: {
        backgroundColor: '#FEF2F2',
        borderWidth: 1,
        borderColor: '#FECACA',
        borderRadius: 12,
        padding: 18,
    },

    titulo: {
        fontSize: 17,
        fontWeight: '700',
        color: Cores.erro,
        marginBottom: 6,
    },

    mensagem: {
        fontSize: 15,
        lineHeight: 22,
        color: Cores.texto,
    },
});
