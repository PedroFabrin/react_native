import { useState } from "react";
import { Button, Text, View } from "react-native";

export default function Status() {
    const [status, setStatus] = useState("Aguardando");

    function alterarStatus(novoStatus: string){
        setStatus(novoStatus);
    }

    return (
        <View>
            <Text>Status: {status}</Text>
            {
                status === "Aguardando" ? 
                (<Button
                    title="Iniciar"
                    onPress={() => alterarStatus("Em Andamento")}
                ></Button>
                )
                :
                (
                    <Button
                        title="Concluir"
                        onPress={() => alterarStatus("Concluído")}
                    ></Button>
                )
            }     
        </View>
    );
}
