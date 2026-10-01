import { StyleSheet, Text, View } from "react-native";
import Botao from "../components/Botao";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList } from "../navigation/types";
import { FlatList } from "react-native";
import { useState } from "react";
import { Tarefa } from "../models/Tarefa";
import CardAtividade from "../components/CardAtividade";


type Props = NativeStackScreenProps<
    RootStackParamList,
    'Lista'
>;

export default function ListaScreen({navigation}: Props) {


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
	]);
    
    return(
        <View style={styles.container}>
            <FlatList 
                data={ tarefas }
                keyExtractor={(item => item.id.toString())}
                keyboardShouldPersistTaps = 'handled'
                contentContainerStyle = {styles.conteudo}
                renderItem={({item}) => 
                    <CardAtividade 
                        id={item.id}
                        titulo={item.titulo}
                        descricao={item.descricao}
                        status={item.status}
                        onPress={() => navigation.navigate('Detalhe', {id:item.id})}
                    />
                }

                ListEmptyComponent={
                    <View style={styles.listaVazia}>
                        <Text style={styles.textoListaVazia}>
                            Nenhuma tarefa cadastrada
                        </Text>
                    </View>
                }
            />
        </View>
    );
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