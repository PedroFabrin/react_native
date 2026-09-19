import { StyleSheet, Text, TextInput, View } from "react-native";
import { Cores } from "../models/Cores";

type CampoTextoProps = {
    rotulo: string,
    placeholder?: string,
    valor: string,
    onChangeText: (texto: string) => void,
}

export default function CampoTexto({rotulo, placeholder, valor, onChangeText}: CampoTextoProps) {
    return (
        <View>
            <Text style={styles.rotulo}>{rotulo}</Text>
            <TextInput
                style={styles.input}
                placeholder={placeholder}
                placeholderTextColor={Cores.textoSuave}
                value={valor}
                onChangeText={onChangeText}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    rotulo: {
        fontSize: 14,
        fontWeight: '600',
        marginTop: 12,
        marginBottom: 6,
        color: Cores.texto,
    },

    input: {
        borderWidth: 1,
        borderColor: Cores.borda,
        borderRadius: 10,
        padding: 12,
        fontSize: 16,
        backgroundColor: Cores.superficie,
        color: Cores.texto,
    },
});
