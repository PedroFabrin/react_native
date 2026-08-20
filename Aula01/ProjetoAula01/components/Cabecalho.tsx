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
		fontWeight: 'bold', 
	}, 
	
	subtitulo: { 
		fontSize: 20, 
		marginTop: 20, 
	},
});

