import { StyleSheet, Text, View } from "react-native";


export default function Cabecalho(){

    return (
        <View>
            <Text style={styles.titulo}>TaskList</Text>
            <Text style={styles.subtitulo}>Gerenciamento de Tarefas</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    titulo: {
		fontSize: 28,
		fontWeight: '800',
		color: '#27272A',
	},

	subtitulo: {
		fontSize: 16,
		marginTop: 8,
		color: '#71717A',
	},
});

