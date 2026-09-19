import { StyleSheet, Text, View } from "react-native";
import { Cores } from "../models/Cores";

type CabecalhoProps = {
    titulo: string,
    subtitulo?: string,
}

export default function Cabecalho({titulo, subtitulo}: CabecalhoProps) {
    return (
        <View style={styles.container}>
            <Text style={styles.titulo}>{titulo}</Text>
            {
                subtitulo && (
                    <Text style={styles.subtitulo}>{subtitulo}</Text>
                )
            }
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        marginBottom: 24,
    },

    titulo: {
        fontSize: 28,
        fontWeight: '800',
        color: Cores.texto,
    },

    subtitulo: {
        fontSize: 16,
        marginTop: 6,
        color: Cores.textoSuave,
    },
});
