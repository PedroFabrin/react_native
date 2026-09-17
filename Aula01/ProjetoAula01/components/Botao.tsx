import { Pressable, StyleSheet, Text } from "react-native";

type BotaoProps = {
	titulo: string,
	onPress?: () => void
}

export default function Botao({titulo, onPress}: BotaoProps) {
    return (
        <Pressable style={styles.botao} onPress={onPress}>
            <Text style={styles.texto}> {titulo} </Text>
        </Pressable>
    );
}

const styles = StyleSheet.create({
	botao: {
	   backgroundColor: '#3F3F46',
	   borderRadius: 10,
	   paddingVertical: 14,
	   alignItems: 'center',
	   marginTop: 14,
	   shadowColor: '#18181B',
	   shadowOffset: { width: 0, height: 3 },
	   shadowOpacity: 0.2,
	   shadowRadius: 6,
	   elevation: 3,
	 },

	  texto: {
	   fontSize: 16,
	   fontWeight: '700',
	   color: '#FFFFFF',
	   letterSpacing: 0.5,
	 },
});