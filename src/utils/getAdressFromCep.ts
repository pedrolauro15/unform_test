import cepPromise from 'cep-promise';
export interface Adress {
  cep?: string;
  state?: string;
  city?: string;
  street?: string;
  neighborhood?: string;
  logradouro_type?: number;
}

const getAdressFromCep = async (cep: string ): Promise<Adress | Error | undefined> => {
  if(cep.length === 0){
    return;
  }

  try {
    if(cep.length < 8){
      const error = new Error();
      error.message = "Formato de CEP inválido";
      throw error;
    }
    const adress = await cepPromise(cep);
    return adress;
  } catch (error) {
    throw error;
  }
}
export default getAdressFromCep;