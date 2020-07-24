import { Form } from '@unform/web';
import React from 'react';
import './App.css';
import Input from './components/form/Input';

function App() {
	return (
		<div className="App">
			<Form onSubmit={() => {}}>
				<h1>Formulário de dados</h1>
				<Input name="dados.name" placeholder="Nome" />
				<Input name="dados.age" type="number" placeholder="Idade" />
				<button type="submit">Enviar dados</button>
			</Form>
		</div>
	);
}

export default App;
