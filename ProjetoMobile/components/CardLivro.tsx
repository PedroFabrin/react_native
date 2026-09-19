import { Pressable, StyleSheet, Text, View } from "react-native";
import { Cores, CoresStatus } from "../models/Cores";
import { StatusLeitura } from "../models/Livro";

type CardLivroProps = {
    id: number,
    titulo: string,
    autor: string,
    status: StatusLeitura,
    onAvancar: (id: number) => void,
    onExcluir: (id: number) => void,
}

export default function CardLivro({id, titulo, autor, status, onAvancar, onExcluir}: CardLivroProps) {
    return (
        <View style={styles.card}>
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

            <View style={styles.acoes}>
                {
                    status !== 'Lido' && (
                        <Pressable style={[styles.botao, styles.botaoAvancar]} onPress={() => onAvancar(id)}>
                            <Text style={styles.textoAvancar}>
                                {status === 'Quero ler' ? 'Começar a ler' : 'Marcar como lido'}
                            </Text>
                        </Pressable>
                    )
                }
                <Pressable style={styles.botao} onPress={() => onExcluir(id)}>
                    <Text style={styles.textoExcluir}>Excluir</Text>
                </Pressable>
            </View>
        </View>
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

    acoes: {
        flexDirection: 'row',
        gap: 10,
        marginTop: 14,
    },

    botao: {
        flex: 1,
        borderWidth: 1,
        borderColor: Cores.borda,
        backgroundColor: '#FAF6EF',
        borderRadius: 8,
        padding: 10,
        alignItems: 'center',
    },

    botaoAvancar: {
        backgroundColor: Cores.primaria,
        borderColor: Cores.primaria,
    },

    textoAvancar: {
        fontWeight: '700',
        color: Cores.primariaTexto,
    },

    textoExcluir: {
        fontWeight: '700',
        color: Cores.erro,
    },
});
