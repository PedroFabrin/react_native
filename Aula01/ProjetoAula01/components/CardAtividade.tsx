import { Pressable, StyleSheet, Text, View } from "react-native";


type CardProps = {
	id: number,
	titulo: string,
	descricao: string,
	status: string,
	onPress: (id: number) => void,
}

export default function CardAtividade({id, titulo, descricao, status, onPress}: CardProps) {
    return(
        <Pressable onPress={() => onPress(id)} style={styles.card}>
            <Text style={styles.titulo}>{titulo}</Text>
			<Text style={styles.subtitulo}>{descricao}</Text>
			<Text style={ status === 'Finalizado' && styles.concluido }>{status}</Text>
        </Pressable>
    );
}

const styles = StyleSheet.create({ 
	container: { 
		flex: 1, 
		padding: 30, 
		justifyContent: 'center', 
		alignItems: 'center'
	}, 
	
	titulo: { 
		fontSize: 16, 
		fontWeight: 'bold', 
	}, 
	
	subtitulo: { 
		fontSize: 14, 
		marginTop: 20, 
	}, 

	concluido: {
		color: '#0f0'
	},
	
	card: { 
		padding: 15, 
		marginTop: 10, 
		borderWidth: 1, 
	}, 
	
	botao: { 
		padding: 15, 
		marginTop: 20, 
		borderWidth: 1, 
	}, 
});