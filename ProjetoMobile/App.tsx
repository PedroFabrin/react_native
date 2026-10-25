import { StatusBar } from 'expo-status-bar';
import { StyleSheet, View } from 'react-native';
import { DefaultTheme, NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import BarraNavegacao from './components/BarraNavegacao';
import InicioScreen from './screens/InicioScreen';
import LivrosScreen from './screens/LivrosScreen';
import CadastroScreen from './screens/CadastroScreen';
import MetasScreen from './screens/MetasScreen';
import DetalhesLivroScreen from './screens/DetalhesLivroScreen';
import EdicaoScreen from './screens/EdicaoScreen';
import { AbasParamList, RotasParamList } from './models/Navegacao';
import { Tela } from './models/Tela';
import { Cores } from './models/Cores';

const Pilha = createNativeStackNavigator<RotasParamList>();
const Abas = createBottomTabNavigator<AbasParamList>();

const tema = {
	...DefaultTheme,
	colors: {
		...DefaultTheme.colors,
		background: Cores.fundo,
		primary: Cores.primaria,
	},
};

function NavegacaoAbas() {
	return (
		<Abas.Navigator
			screenOptions={{ headerShown: false, sceneStyle: styles.cena }}
			tabBar={({state, navigation}) => (
				<BarraNavegacao
					telaAtual={state.routeNames[state.index] as Tela}
					onMudarTela={(tela) => navigation.navigate(tela)}
				/>
			)}
		>
			<Abas.Screen name="Início" component={InicioScreen} />
			<Abas.Screen name="Livros" component={LivrosScreen} />
			<Abas.Screen name="Cadastrar" component={CadastroScreen} />
			<Abas.Screen name="Metas" component={MetasScreen} />
		</Abas.Navigator>
	);
}

export default function App() {
	return (
		<View style={styles.container}>
			<StatusBar style="dark" />

			<View style={styles.app}>
				<NavigationContainer theme={tema}>
					<Pilha.Navigator
						screenOptions={{
							headerStyle: { backgroundColor: Cores.fundo },
							headerTintColor: Cores.primaria,
							headerShadowVisible: false,
							contentStyle: { backgroundColor: Cores.fundo },
						}}
					>
						<Pilha.Screen name="Abas" component={NavegacaoAbas} options={{ headerShown: false }} />
						<Pilha.Screen
							name="DetalhesLivro"
							component={DetalhesLivroScreen}
							options={({route}) => ({ title: route.params.titulo })}
						/>
						<Pilha.Screen
							name="EditarLivro"
							component={EdicaoScreen}
							options={{ title: 'Editar livro' }}
						/>
					</Pilha.Navigator>
				</NavigationContainer>
			</View>
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: Cores.fundo,
		alignItems: 'center',
	},

	app: {
		flex: 1,
		width: '100%',
		maxWidth: 640,
	},

	cena: {
		backgroundColor: Cores.fundo,
		paddingTop: 56,
	},
});
