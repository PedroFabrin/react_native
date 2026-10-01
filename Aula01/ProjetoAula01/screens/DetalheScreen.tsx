import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { StyleSheet, Text, View } from "react-native";
import { RootStackParamList } from "../navigation/types";
import { Tarefa } from "../models/Tarefa";
import { useState } from "react";
import EdicaoScreen from "./EdicaoScreen";
import Botao from "../components/Botao";


type Props = NativeStackScreenProps<
    RootStackParamList,
    'Detalhe'
>;

export default function DetalheScreen({route, navigation} : Props) {
    
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
		},
	]);

    const {id} = route.params;

    const tarefa = tarefas.find(
        item => item.id === id
    );

    if (!tarefa) {
        return(
            <View style={styles.container}>
                <Text style={styles.titulo}>
                    Tarefa Não Encontrda ;-;
                </Text>
            </View>
        );
    }


    
    return(
        <View style={styles.container}>
            <Text style={styles.titulo}>
                {tarefa.titulo}
            </Text>
            <Text>
                {tarefa.descricao}
            </Text>
            <Text>
                {tarefa.status}
            </Text>

            <Botao
                titulo = "Editar"
                onPress={() => navigation.navigate('Edicao', {id: tarefa.id})}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 24,
    },

    titulo: {
        fontWeight: 'bold',
        fontSize: 24,
    },

    descricao: {
        fontWeight: 500,
        fontSize: 18,
    },

    status: {
        fontWeight: 400,
        fontSize: 16,
    }
})