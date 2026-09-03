import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import Cabecalho from './components/Cabecalho';
import CardAtividade from './components/CardAtividade';
import Botao from './components/Botao';
import Aluno from './components/Aluno';
import Status from './components/Status';
import Contador from './components/Contador';

export default function App() {

  return (
    <View style={styles.container}>
	  <Contador></Contador>
	  <Status></Status>
      <Cabecalho />
	  <Aluno nome='Fabrin' curso='Sistemas de Informação' termo={8} nota={10}/>
      <CardAtividade id={1} titulo='Atividade01' descricao='Atividade 1' />
      <CardAtividade  id={2} titulo='Atividade02' descricao='Atividade 2' />
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

