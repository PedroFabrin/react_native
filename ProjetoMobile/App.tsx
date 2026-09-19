import { StatusBar } from 'expo-status-bar';
import { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import BarraNavegacao from './components/BarraNavegacao';
import InicioScreen from './screens/InicioScreen';
import LivrosScreen from './screens/LivrosScreen';
import CadastroScreen from './screens/CadastroScreen';
import MetasScreen from './screens/MetasScreen';
import { Livro, StatusLeitura } from './models/Livro';
import { Tela } from './models/Tela';
import { Cores } from './models/Cores';

export default function App() {

	const [tela, setTela] = useState<Tela>('Início');

	const [livros, setLivros] = useState<Livro[]>([
		{
			id: 1,
			titulo: 'Dom Casmurro',
			autor: 'Machado de Assis',
			status: 'Lido',
		},
		{
			id: 2,
			titulo: 'O Hobbit',
			autor: 'J. R. R. Tolkien',
			status: 'Lendo',
		},
		{
			id: 3,
			titulo: 'Código Limpo',
			autor: 'Robert C. Martin',
			status: 'Quero ler',
		},
	]);

	function cadastrar(titulo: string, autor: string, status: StatusLeitura) {
		const novoLivro: Livro = {
			id: Date.now(),
			titulo: titulo,
			autor: autor,
			status: status,
		};

		setLivros([
			...livros,
			novoLivro
		]);
	}

	function avancarStatus(id: number) {
		const novaLista = livros.map((livro) => {
			if (livro.id !== id) {
				return livro;
			}
			const proximo: StatusLeitura = livro.status === 'Quero ler' ? 'Lendo' : 'Lido';
			return { ...livro, status: proximo };
		});
		setLivros(novaLista);
	}

	function excluir(id: number) {
		const novaLista = livros.filter((livro) => livro.id !== id);
		setLivros(novaLista);
	}

	return (
		<View style={styles.container}>
			<StatusBar style="dark" />

			<View style={styles.app}>
				<View style={styles.conteudo}>
					{tela === 'Início' && <InicioScreen livros={livros} onIrPara={setTela} />}
					{tela === 'Livros' && <LivrosScreen livros={livros} onAvancar={avancarStatus} onExcluir={excluir} />}
					{tela === 'Cadastrar' && <CadastroScreen onCadastrar={cadastrar} />}
					{tela === 'Metas' && <MetasScreen />}
				</View>

				<BarraNavegacao telaAtual={tela} onMudarTela={setTela} />
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

	conteudo: {
		flex: 1,
		paddingTop: 56,
	},
});
