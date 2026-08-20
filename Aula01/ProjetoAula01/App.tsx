import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import Cabecalho from './components/Cabecalho';
import CardAtividade from './components/CardAtividade';
import Botao from './components/Botao';

export default function App() {

  return (
    <View style={styles.container}>
      <Cabecalho />
      <CardAtividade />
      <CardAtividade />
      <Botao />
      <StatusBar style="auto" />
    </View>
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
		fontSize: 28, 
		fontWeight: 'bold', 
	}, 
	
	subtitulo: { 
		fontSize: 20, 
		marginTop: 20, 
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

