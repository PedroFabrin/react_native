import { StyleSheet, Text, View } from "react-native";

type AlunoProps = {
    nome?: string,
    curso?: string, 
    termo?: number,
    nota: number,
}

export default function Aluno({nome, curso, termo, nota}: AlunoProps){

    return (
        <View>
            <Text style={[styles.linha, nota < 7 && styles.destacar]}>Nome: {nome}</Text>
            <Text>Curso: {curso}</Text>
            {
                termo && (
                    <Text>Termo: {termo}°</Text>
                )
            }
            <Text>Nota: {nota}</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    linha: {
        fontSize: 16,
    },
    destacar: {
        color: '#f00'
    }
})