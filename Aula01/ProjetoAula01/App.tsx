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
import Flex from './components/Flex';

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
				contentContainerStyle={styles.conteudo}
				
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
	  backgroundColor: '#F4F4F5',
	  alignItems: 'center',
	},

	conteudo: {
	  width: '100%',
	  maxWidth: 640,
	  alignSelf: 'center',
	  paddingHorizontal: 24,
	  paddingTop: 56,
	  paddingBottom: 40,
	},

	tituloApp: {
	  fontSize: 32,
	  fontWeight: '800',
	  textAlign: 'center',
	  color: '#27272A',
	  letterSpacing: 1,
	},

	subtituloApp: {
	  fontSize: 15,
	  textAlign: 'center',
	  marginBottom: 32,
	  color: '#71717A',
	},

	tituloFormulario: {
	  fontSize: 20,
	  fontWeight: '700',
	  marginBottom: 16,
	  color: '#27272A',
	},

	label: {
	  fontSize: 14,
	  fontWeight: '600',
	  marginTop: 12,
	  marginBottom: 6,
	  color: '#3F3F46',
	},

	input: {
	  borderWidth: 1,
	  borderColor: '#D4D4D8',
	  borderRadius: 10,
	  padding: 12,
	  fontSize: 16,
	  backgroundColor: '#FFFFFF',
	  color: '#27272A',
	},

	inputDescricao: {
	  borderWidth: 1,
	  borderColor: '#D4D4D8',
	  borderRadius: 10,
	  padding: 12,
	  fontSize: 16,
	  backgroundColor: '#FFFFFF',
	  color: '#27272A',
	  minHeight: 90,
	  textAlignVertical: 'top',
	},

	erro: {
	  marginTop: 10,
	  fontWeight: '600',
	  color: '#B91C1C',
	},

	tituloLista: {
	  fontSize: 20,
	  fontWeight: '700',
	  marginTop: 36,
	  marginBottom: 16,
	  color: '#27272A',
	},

	listaVazia: {
	  borderWidth: 1,
	  borderColor: '#E4E4E7',
	  borderRadius: 12,
	  padding: 24,
	  alignItems: 'center',
	  backgroundColor: '#FFFFFF',
	},

	textoListaVazia: {
	  fontSize: 16,
	  fontWeight: '600',
	  marginBottom: 5,
	  color: '#71717A',
	},

  });