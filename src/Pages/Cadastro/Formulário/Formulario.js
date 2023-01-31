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

const Formulario = () => {
  function finalizar() {
    window.history.pushState({}, null, "/finalizado");
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
        />
        <Input
          htmlFor={"email"}
          texto={"Email *"}
          tipo={"email"}
          nome={"email"}
          id={"email"}
          tamanho={"grande"}
          required
        />
        <Input
          htmlFor={"senha"}
          texto={"Senha *"}
          tipo={"password"}
          nome={"senha"}
          id={"senha"}
          tamanho={"grande"}
          required
        />
        <Input
          htmlFor={"confirmarSenha"}
          texto={"Confirmar senha *"}
          tipo={"password"}
          nome={"confirmarSenha"}
          id={"confirmarSenha"}
          tamanho={"grande"}
          required
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
