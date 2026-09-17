import { StyleSheet, Text, View } from "react-native";



export default function Flex() {
    return(
        <View style={styles.container}>
            <Text style={styles.item01}>Item 01</Text>
            <Text style={styles.item02}>Item 02</Text>
        </View>
    );
}


const styles = StyleSheet.create({
    container: {
        flex:1,
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
    },

    item01: {
        flex: 1,
        backgroundColor: 'red',
    },

    item02: {
        flex: 1,
        backgroundColor: 'blue',
    }

})