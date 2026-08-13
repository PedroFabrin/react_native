import { StatusBar } from 'expo-status-bar';
import { Pressable, StyleSheet, Text, View } from 'react-native';

export default function App() {

  function alert(){
    console.log("Meu alerta");
  }

  return (
    <View style={styles.container}>
      <Text>Pedro Henrique</Text>
      <Text>Parizoto Fabrin</Text>

      <Pressable onPress={alert}><Text>8° Termo</Text></Pressable>

      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
