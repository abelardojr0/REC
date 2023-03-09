import React from "react";
import LoginComSociais from "../../Login/LoginComSociais/LoginComSociais";
import Input from "./Components/Input";
import {
  Botao,
  ContainerFormulario,
  FormularioJaTenhoConta,
  FormularioJaTenhoContaTitulo,
  FormularioSociaisCadastro,
  SubtituloFormulario,
  TituloFormulario,
} from "./StylesFormulario";

import facebook from "../../../Images/logo_facebook.png";
import google from "../../../Images/logo_google.png";
import { EntrarCom, FormularioSociais } from "../../Login/StyleLogin";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Formulario = () => {
  const navigate = useNavigate();
  const [nome, setNome] = React.useState();
  const [email, setEmail] = React.useState();
  const [senha, setSenha] = React.useState();

  function finalizar(e) {
    e.preventDefault();
    // ("https://teste-api-projeto.vercel.app/cadastro"
    // ("http://localhost:5000/inserirUsuario"
    axios
      .post("http://localhost:5000/inserirUsuario", {
        nome,
        email,
        senha,
      })
      .then((response) => {
        console.log(response);
        navigate("/finalizado");
      })
      .catch((error) => {
        console.log(error);
      });
  }
  return (
    <>
      <ContainerFormulario onSubmit={finalizar}>
        <TituloFormulario>Dados do cadastro</TituloFormulario>
        <SubtituloFormulario>Dados Pessoais</SubtituloFormulario>
        <Input
          htmlFor={"usuario"}
          texto={"Usuário *"}
          tipo={"text"}
          nome={"usuario"}
          id={"usuario"}
          tamanho={"grande"}
          required={true}
          setDados={setNome}
        />
        <Input
          htmlFor={"email"}
          texto={"Email *"}
          tipo={"email"}
          nome={"email"}
          id={"email"}
          tamanho={"grande"}
          required
          setDados={setEmail}
        />
        <Input
          htmlFor={"senha"}
          texto={"Senha *"}
          tipo={"password"}
          nome={"senha"}
          id={"senha"}
          tamanho={"grande"}
          required
          setDados={setSenha}
        />
        <Input
          htmlFor={"confirmarSenha"}
          texto={"Confirmar senha *"}
          tipo={"password"}
          nome={"confirmarSenha"}
          id={"confirmarSenha"}
          tamanho={"grande"}
          required
          setDados={setSenha}
        />
        <Botao type="submit">Cadastrar</Botao>

        <FormularioJaTenhoConta>
          <FormularioJaTenhoContaTitulo>
            Já possui uma conta?
          </FormularioJaTenhoContaTitulo>
          <Botao>Entrar</Botao>

          <FormularioSociaisCadastro>
            <EntrarCom style={{ color: "white" }}>Entrar com: </EntrarCom>
            <FormularioSociais>
              <LoginComSociais social={facebook} />
              <LoginComSociais social={google} />
            </FormularioSociais>
          </FormularioSociaisCadastro>
        </FormularioJaTenhoConta>
      </ContainerFormulario>
    </>
  );
};

export default Formulario;
