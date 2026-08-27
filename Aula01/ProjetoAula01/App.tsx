import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import Cabecalho from './components/Cabecalho';
import CardAtividade from './components/CardAtividade';
import Botao from './components/Botao';
import Aluno from './components/Aluno';

function selecionarCard(id: number) {
	return(console.log("Tarefa Selecionada " + id));
}

export default function App() {

  return (
    <View style={styles.container}>
      <Cabecalho />
	  <Aluno nome='Fabrin' curso='Sistemas de Informação' termo={8} nota={10}/>
      <CardAtividade id={1} titulo='Atividade01' descricao='Atividade 1' status='Finalizado' onPress={selecionarCard}/>
      <CardAtividade  id={2} titulo='Atividade02' descricao='Atividade 2' status='Em Andamento' onPress={selecionarCard}/>
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

