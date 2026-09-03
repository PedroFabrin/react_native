import { Pressable, StyleSheet, Text, View } from "react-native";
import { useState } from "react";


type CardProps = {
	id: number,
	titulo: string,
	descricao: string,
}

export default function CardAtividade({id, titulo, descricao}: CardProps) {

	const [concluida, setConcluida] = useState(false)

	function alterarStatus() {
		setConcluida(!concluida);
	}

    return(
        <Pressable style={styles.card} onPress={alterarStatus}>
            <Text style={styles.titulo}>{titulo}</Text>
			<Text style={styles.subtitulo}>{descricao}</Text>
			<Text style={concluida && styles.concluido}>
				{ concluida ? 'Concluída' : 'Pendente' }
			</Text>
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