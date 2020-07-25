import { Form } from '@unform/web';
import React, { useRef, useState } from 'react';
import { SubmitHandler, FormHandles } from '@unform/core';
import swal from 'sweetalert2';
import ScaleLoader from "react-spinners/ScaleLoader";
import './App.css';
import Input from './components/form/Input';
import getAdressFromCep, { Adress } from './utils/getAdressFromCep';
import Select from './components/form/Select';
import tipos_logradouros from './Constants/tipos_logradouros';

interface FormData {
	data: {
		name?: string;
		age?: string | number;
	}
	adress: Adress;
}

const initialData: FormData = {
	data: {
		name: '',
		age: '',
	},
	adress: {
		cep: '',
		state: '',
		street: '',
		city: '',
		neighborhood: '',
		logradouro_type: 0
	}
}

function App() {
	const formRef = useRef<FormHandles>(null);
	const [loading, setLoading] = useState(false);
	const [jsonData, setJsonData] = useState(initialData);

	const setAdressInForm = async (cep: string) => {
		setLoading(true);
		const oldData = formRef.current?.getData() as FormData;
		try {
			const adress = await getAdressFromCep(cep);
			formRef.current?.setData({
        ...oldData,
        adress,
      });
		} catch (error) {
			const personal_data = oldData?.data;
			formRef.current?.reset();
			formRef.current?.setData({
        data: personal_data
      });
			swal.fire({
				icon: 'error',
				title: 'Oops',
				text: error.message
			})
		}
		setLoading(false);
	}

	const clearData = () => {
		formRef.current?.reset();
		setJsonData(initialData);
	}
	
	const handleSubmit: SubmitHandler<FormData> = (data) => {
		setJsonData(data);
	}

	return (
    <div className="App">
      <Form ref={formRef} onSubmit={handleSubmit}>
        <h1>Formulário de dados</h1>
        <h2>Dados pessoais</h2>
        <Input name="data.name" placeholder="Nome" />
        <Input name="data.age" type="number" placeholder="Idade" />
        <div className="divider" />
        <h2>Endereço</h2>
        <div className="input-cep-controller">
          <Input
            name="adress.cep"
            placeholder="Cep"
            onBlur={(e) => setAdressInForm(e.target.value)}
            maxLength={8}
          />
          <span>{loading && <ScaleLoader color="#D0D0D0" height={16} />}</span>
        </div>
        <span className="warn">
          Digite o CEP para obter os dados do endereço
        </span>
        <Input name="adress.state" placeholder="Estado" />
        <Input name="adress.city" placeholder="Cidade" />
        <Input name="adress.street" placeholder="Rua" />
        <Input name="adress.neighborhood" placeholder="Bairro" />
        <div id="Select_container">
          <Select
            name="adress.logradouro_type"
            options={tipos_logradouros}
            getOptionLabel={(option) => option.type}
            getOptionValue={(option) => option.id}
            defaultValue={{ id: 1, type: "rua" }}
          />
        </div>
        <button type="submit">Enviar dados</button>
      </Form>

      <section className="json_data">
        <h1>Retorno do Form</h1>
        <span className="chave">
          {"{"}
          <br />
        </span>
        <div>
          <span className="path">data: {"{"}</span>
          <section>
            <span>name: {jsonData.data.name}</span>
            <span>age: {jsonData.data.age}</span>
          </section>
          <span className="path">{"}"}</span>
        </div>
        <br />
        <div>
          <span className="path">adress: {"{"}</span>
          <section>
            <span>cep: {jsonData.adress.cep}</span>
            <span>state: {jsonData.adress.state}</span>
            <span>city: {jsonData.adress.city}</span>
            <span>street: {jsonData.adress.street}</span>
            <span>neighborhood: {jsonData.adress.neighborhood}</span>
            <span>logradouro_type: {jsonData.adress.logradouro_type}</span>
          </section>
          <span className="path">{"}"}</span>
        </div>
        <span className="chave">
          {"}"}
          <br />
        </span>
        <button onClick={clearData}>Limpar dados</button>
      </section>
    </div>
  );
}

export default App;
