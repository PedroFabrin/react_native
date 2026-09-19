import { Pressable, StyleSheet, Text } from "react-native";
import { Cores } from "../models/Cores";

type BotaoProps = {
    titulo: string,
    onPress?: () => void,
    secundario?: boolean,
}

export default function Botao({titulo, onPress, secundario}: BotaoProps) {
    return (
        <Pressable
            style={[styles.botao, secundario && styles.botaoSecundario]}
            onPress={onPress}
        >
            <Text style={[styles.texto, secundario && styles.textoSecundario]}>{titulo}</Text>
        </Pressable>
    );
}

const styles = StyleSheet.create({
    botao: {
        backgroundColor: Cores.primaria,
        borderRadius: 10,
        paddingVertical: 14,
        alignItems: 'center',
        marginTop: 14,
        shadowColor: '#3B2A20',
        shadowOffset: { width: 0, height: 3 },
        shadowOpacity: 0.2,
        shadowRadius: 6,
        elevation: 3,
    },

    botaoSecundario: {
        backgroundColor: Cores.superficie,
        borderWidth: 1,
        borderColor: Cores.borda,
        shadowOpacity: 0,
        elevation: 0,
    },

    texto: {
        fontSize: 16,
        fontWeight: '700',
        color: Cores.primariaTexto,
        letterSpacing: 0.5,
    },

    textoSecundario: {
        color: Cores.primaria,
    },
});
