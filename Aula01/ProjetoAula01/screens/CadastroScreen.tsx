import { StyleSheet, Text, View } from "react-native";
import Botao from "../components/Botao";


export default function CadastroScreen({navigation} : any) {
    
    return(
        <View style={styles.container}>
            <Text style={styles.titulo}>
                Cadastro Screen
            </Text>

            <Botao 
                titulo = "Cancelar"
                onPress={() => navigation.goBack()}
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
    }
})