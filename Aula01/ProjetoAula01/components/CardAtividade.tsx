import { Pressable, StyleSheet, Text, View } from "react-native";
import { useState } from "react";


type CardProps = {
	id: number,
	titulo: string,
	descricao: string,
	status: string,
	onDelete: (id: number) => void
}

export default function CardAtividade({id, titulo, descricao, status, onDelete}: CardProps) {

    return(
        <View style={styles.card}>
			<Text style={styles.titulo}>{titulo}</Text>
			<Text style={styles.descricao}>{descricao}</Text>
			<Text style={styles.status}>{status}</Text>
			<Pressable style={styles.botaoExcluir} onPress={() => onDelete(id)}>
				<Text style={styles.textoExcluir}>Excluir</Text>
			</Pressable>
		</View>
    );
}

const styles = StyleSheet.create({
	card: {
	  borderWidth: 1,
	  borderRadius: 8,
	  padding: 16,
	  marginBottom: 12,
	},
  
	titulo: {
	  fontSize: 18,
	  fontWeight: 'bold',
	  marginBottom: 6,
	},
  
	descricao: {
	  fontSize: 15,
	  marginBottom: 8,
	},
  
	status: {
	  fontSize: 14,
	  fontWeight: 'bold',
	},
  
	botaoExcluir: {
	  borderWidth: 1,
	  borderRadius: 6,
	  padding: 8,
	  marginTop: 12,
	  alignItems: 'center',
	},
  
	textoExcluir: {
	  fontWeight: 'bold',
	},
  });