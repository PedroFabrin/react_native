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
	  backgroundColor: '#FFFFFF',
	  borderWidth: 1,
	  borderColor: '#E4E4E7',
	  borderRadius: 12,
	  padding: 18,
	  marginBottom: 14,
	  shadowColor: '#18181B',
	  shadowOffset: { width: 0, height: 2 },
	  shadowOpacity: 0.05,
	  shadowRadius: 6,
	  elevation: 2,
	},

	titulo: {
	  fontSize: 18,
	  fontWeight: '700',
	  marginBottom: 6,
	  color: '#27272A',
	},

	descricao: {
	  fontSize: 15,
	  marginBottom: 10,
	  color: '#52525B',
	  lineHeight: 20,
	},

	status: {
	  fontSize: 13,
	  fontWeight: '700',
	  color: '#3F3F46',
	  backgroundColor: '#E4E4E7',
	  alignSelf: 'flex-start',
	  paddingHorizontal: 10,
	  paddingVertical: 4,
	  borderRadius: 999,
	  overflow: 'hidden',
	},

	botaoExcluir: {
	  borderWidth: 1,
	  borderColor: '#E4E4E7',
	  backgroundColor: '#FAFAFA',
	  borderRadius: 8,
	  padding: 10,
	  marginTop: 14,
	  alignItems: 'center',
	},

	textoExcluir: {
	  fontWeight: '700',
	  color: '#B91C1C',
	},
  });