import { ScrollView, StyleSheet, Text, View } from "react-native";
import Cabecalho from "../components/Cabecalho";
import { Cores } from "../models/Cores";

const FUNCIONALIDADES_PREVISTAS = [
    'Definir meta anual de livros lidos',
    'Acompanhar o progresso por páginas',
    'Avaliar livros com notas e comentários',
    'Salvar os dados no dispositivo',
];

export default function MetasScreen() {
    return (
        <ScrollView contentContainerStyle={styles.conteudo}>
            <Cabecalho titulo="Metas de Leitura" subtitulo="Acompanhe seus objetivos" />

            <View style={styles.card}>
                <Text style={styles.selo}>Em desenvolvimento</Text>
                <Text style={styles.titulo}>Funcionalidades previstas</Text>
                {
                    FUNCIONALIDADES_PREVISTAS.map((item) => (
                        <Text key={item} style={styles.item}>• {item}</Text>
                    ))
                }
            </View>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    conteudo: {
        paddingHorizontal: 24,
        paddingBottom: 24,
    },

    card: {
        backgroundColor: Cores.superficie,
        borderWidth: 1,
        borderColor: Cores.borda,
        borderRadius: 12,
        padding: 18,
    },

    selo: {
        fontSize: 13,
        fontWeight: '700',
        color: '#92400E',
        backgroundColor: '#FEF3C7',
        alignSelf: 'flex-start',
        paddingHorizontal: 10,
        paddingVertical: 4,
        borderRadius: 999,
        overflow: 'hidden',
        marginBottom: 12,
    },

    titulo: {
        fontSize: 18,
        fontWeight: '700',
        marginBottom: 10,
        color: Cores.texto,
    },

    item: {
        fontSize: 15,
        lineHeight: 24,
        color: Cores.textoSuave,
    },
});
