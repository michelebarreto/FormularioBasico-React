import React, { useRef}from 'react';
import {Form} from '@unform/web';
import {Scope} from '@unform/core';
import './App.css';
import Input from './components/Form/input';
import * as Yup from 'yup';// o yup é uma biblioteca de validação dos dados

function App() {
  //o formRef e usado para manipular o formulário por fora dele
const formRef= useRef(null);
  // p método reset é para limpar a tela após clicar no botão cadastrar
  async function handleSubmit(data, {reset}){
    // if (data.name === ""){
    //   //o setFieldError é um método para mostrar mensagem de erro
    //   formRef.current.setFieldError('name', 'O nome é obrigatório ');
    // }
   try{
   const schema = Yup.object().shape({
    name: Yup.string().required(' O nome é obrigatório'),
    email:Yup.string().email().required('Digite um e-mail valido')
    });
      await schema.validate(data,{
        // esse método abortEarly é para que seja feita a validação de todos os campos do formulário
        abortEarly: false,
      })

      formRef.current.setErrors({});// aqui é para a limpeza dos erros
    reset();
    } catch(err){
      if(err instanceof Yup.ValidationError){
        const errorMessages ={};
        err.inner.forEach(error=>{
          errorMessages[error.path]= error.message;
        })
        
        formRef.current.setErrors(errorMessages);

      }
    }


   } 
     
   
     return (
    <div className="App">
    <h1>Formulário de cadastro</h1>
      <Form ref={formRef} onSubmit={handleSubmit}>

      Nome<Input name="name"/>
      Email<Input type="email" name="email"/>

      <Scope path="address">
      Endereço<Input name="street"/>
      Telefone<Input name="number"/>
      </Scope>
      <button type="submit"> Cadastrar </button>

      </Form>  
    </div>
  );
}

export default App;
