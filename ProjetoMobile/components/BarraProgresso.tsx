import { StyleSheet, View } from "react-native";
import { Cores } from "../models/Cores";

type BarraProgressoProps = {
    percentual: number,
}

export default function BarraProgresso({percentual}: BarraProgressoProps) {
    const limitado = Math.max(0, Math.min(100, percentual));

    return (
        <View style={styles.trilho}>
            <View style={[styles.preenchido, { flex: limitado }]} />
            <View style={{ flex: 100 - limitado }} />
        </View>
    );
}

const styles = StyleSheet.create({
    trilho: {
        flexDirection: 'row',
        height: 10,
        borderRadius: 999,
        overflow: 'hidden',
        backgroundColor: Cores.borda,
    },

    preenchido: {
        backgroundColor: Cores.primaria,
    },
});
