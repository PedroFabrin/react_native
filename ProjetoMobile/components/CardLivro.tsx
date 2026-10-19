import { Pressable, StyleSheet, Text, View } from "react-native";
import { Cores, CoresStatus } from "../models/Cores";
import { StatusLeitura } from "../models/Livro";

type CardLivroProps = {
    titulo: string,
    autor: string,
    status: StatusLeitura,
    genero: string,
    anoPublicacao: number,
    onPress: () => void,
}

export default function CardLivro({titulo, autor, status, genero, anoPublicacao, onPress}: CardLivroProps) {
    return (
        <Pressable style={({pressed}) => [styles.card, pressed && styles.cardPressionado]} onPress={onPress}>
            <View style={styles.linhaTopo}>
                <View style={styles.dados}>
                    <Text style={styles.titulo}>{titulo}</Text>
                    <Text style={styles.autor}>{autor}</Text>
                </View>
                <Text style={[
                    styles.status,
                    { backgroundColor: CoresStatus[status].fundo, color: CoresStatus[status].texto }
                ]}>
                    {status}
                </Text>
            </View>

            <View style={styles.rodape}>
                <Text style={styles.info}>{genero} • {anoPublicacao}</Text>
                <Text style={styles.verDetalhes}>Ver detalhes ›</Text>
            </View>
        </Pressable>
    );
}

const styles = StyleSheet.create({
    card: {
        backgroundColor: Cores.superficie,
        borderWidth: 1,
        borderColor: Cores.borda,
        borderRadius: 12,
        padding: 18,
        marginBottom: 14,
        shadowColor: '#3B2A20',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.05,
        shadowRadius: 6,
        elevation: 2,
    },

    cardPressionado: {
        opacity: 0.7,
    },

    linhaTopo: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'flex-start',
        gap: 12,
    },

    dados: {
        flex: 1,
    },

    titulo: {
        fontSize: 18,
        fontWeight: '700',
        marginBottom: 4,
        color: Cores.texto,
    },

    autor: {
        fontSize: 15,
        color: Cores.textoSuave,
    },

    status: {
        fontSize: 13,
        fontWeight: '700',
        paddingHorizontal: 10,
        paddingVertical: 4,
        borderRadius: 999,
        overflow: 'hidden',
    },

    rodape: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginTop: 14,
    },

    info: {
        fontSize: 14,
        color: Cores.textoSuave,
    },

    verDetalhes: {
        fontSize: 14,
        fontWeight: '700',
        color: Cores.primaria,
    },
});
