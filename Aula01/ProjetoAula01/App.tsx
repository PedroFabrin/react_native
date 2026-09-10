import { StatusBar } from 'expo-status-bar';
import { FlatList, KeyboardAvoidingView, Platform, StyleSheet, Text, View } from 'react-native';
import Cabecalho from './components/Cabecalho';
import CardAtividade from './components/CardAtividade';
import Botao from './components/Botao';
import Aluno from './components/Aluno';
import Status from './components/Status';
import Contador from './components/Contador';
import { useState } from 'react';
import { Tarefa } from './models/Tarefa';
import { TextInput } from 'react-native';

export default function App() {

	const[tarefas, setTarefas] = useState<Tarefa[]>([
		{
			id: 1,
			titulo: 'Estudar Desenvolvimento Mobile',
			descricao: 'Revisar Estados e Propriedades',
			status: 'Pendente',
		},
		{
			id: 2,
			titulo: 'Preparar Enade',
			descricao: 'Revisar Todo o Conteúdo',
			status: 'Pendente',	
		}
	])
	
	const[titulo, setTitulo] = useState('');
	const[descricao, setDescricao] = useState('');
	const[erro, setErro] = useState('');
 
	function cadastrar() {
		if(titulo.trim() === '' ||
		descricao.trim() === ''){
			setErro('Preencha os campos')
			return;
		}
		
		const novaTarefa: Tarefa = {
			id: Date.now(),
			titulo: titulo,
			descricao: descricao,
			status: 'Pendente',
		}

		setTarefas([
			...tarefas,
			novaTarefa
		]);

		setTitulo('');
		setDescricao('');
		setErro('');
		
	}

	function excluir(id: number){
		const novaLista = tarefas.filter((tarefa) => tarefa.id !== id);
		setTarefas(novaLista); 
	}

	return (
		<KeyboardAvoidingView style={styles.container} behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
			<FlatList 
				data={tarefas}
				keyExtractor={(item) => item.id.toString()} 
				keyboardShouldPersistTaps='handled' 
				contentContainerStyle={styles.container}
				
				ListHeaderComponent={
					<View>
						<Text style={styles.tituloApp}>TASKLIST</Text>
						<Text style={styles.subtituloApp}>Gerenciados de Tarefas</Text>

						<Text style={styles.tituloFormulario}>Nova Tarefa</Text>

						<Text style={styles.label} >Titulo</Text>
						<TextInput style={styles.input} placeholder='Insira o título' value={titulo} onChangeText={setTitulo}></TextInput>

						<Text style={styles.label}>Descrição</Text>
						<TextInput style={styles.inputDescricao} placeholder='Insira a descrição' value={descricao} onChangeText={setDescricao}></TextInput>
					
						{erro != '' &&
							<Text style={styles.erro}>{erro}</Text>
						}

						<Botao titulo='Adicionar'
							onPress={cadastrar}
						 />

						<Text style={styles.tituloLista}>Lista</Text>

					</View>
				}

				renderItem={({item}) => <CardAtividade id={item.id} titulo={item.titulo} descricao={item.descricao} status={item.status} onDelete={excluir}/>}



				> 	

			</FlatList>
		</KeyboardAvoidingView>
	)
}

const styles = StyleSheet.create({ 
	container: {
	  flex: 1,
	},
  
	conteudo: {
	  padding: 24,
	  paddingTop: 50,
	},
  
	tituloApp: {
	  fontSize: 30,
	  fontWeight: 'bold',
	  textAlign: 'center',
	},
  
	subtituloApp: {
	  fontSize: 16,
	  textAlign: 'center',
	  marginBottom: 30,
	},
  
	tituloFormulario: {
	  fontSize: 22,
	  fontWeight: 'bold',
	  marginBottom: 15,
	},
  
	label: {
	  fontSize: 15,
	  fontWeight: 'bold',
	  marginTop: 10,
	  marginBottom: 5,
	},
  
	input: {
	  borderWidth: 1,
	  borderRadius: 8,
	  padding: 12,
	  fontSize: 16,
	},
  
	inputDescricao: {
	  minHeight: 80,
	  textAlignVertical: 'top',
	},
  
	erro: {
	  marginTop: 10,
	  fontWeight: 'bold',
	},
  
	tituloLista: {
	  fontSize: 22,
	  fontWeight: 'bold',
	  marginTop: 35,
	  marginBottom: 15,
	},
  
	listaVazia: {
	  borderWidth: 1,
	  borderRadius: 8,
	  padding: 20,
	  alignItems: 'center',
	},
  
	textoListaVazia: {
	  fontSize: 17,
	  fontWeight: 'bold',
	  marginBottom: 5,
	},
	  
  });