import React from "react";
import Input from "../Cadastro/Formulário/Components/Input";
import {
  EntrarCom,
  FormularioSociais,
  LoginBotaoEntrar,
  LoginBotaoFechar,
  LoginFormulario,
  LoginLembrarDivisao,
  LoginLembrarInput,
  LoginLembrarLabel,
  LoginModal,
  LoginModalContainer,
  LoginTitulo,
} from "./StyleLogin";
import facebook from "../../Images/logo_facebook.png";
import google from "../../Images/logo_google.png";
import LoginComSociais from "./LoginComSociais/LoginComSociais";

const Login = ({ setLoginStatus }) => {
  function fecharModal(e) {
    if (
      e.target.getAttribute("id") === "modal" ||
      e.target.getAttribute("id") === "fechar"
    ) {
      setLoginStatus(false);
    }
  }
  return (
    <LoginModalContainer id="modal" onClick={fecharModal}>
      <LoginModal>
        <LoginBotaoFechar id="fechar" onClick={fecharModal}>
          X
        </LoginBotaoFechar>

        <LoginFormulario>
          <LoginTitulo>Entrar</LoginTitulo>
          <Input
            htmlFor={"userEmail"}
            texto={"Usuário/E-mail *"}
            tipo={"text"}
            nome={"userEmail"}
            id={"userEmail"}
            tamanho={"grande"}
            required={true}
          />
          <Input
            htmlFor={"senhaLogin"}
            texto={"Senha"}
            tipo={"password"}
            nome={"senhaLogin"}
            id={"senhaLogin"}
            tamanho={"grande"}
            required
          />
          <LoginLembrarDivisao>
            <LoginLembrarInput
              type={"checkbox"}
              name={"lembrar"}
              id={"lembrar"}
            />
            <LoginLembrarLabel htmlFor={"lembrar"}>Lembre-me</LoginLembrarLabel>
          </LoginLembrarDivisao>

          <LoginBotaoEntrar>Entrar</LoginBotaoEntrar>

          <EntrarCom>Entrar com: </EntrarCom>
          <FormularioSociais>
            <LoginComSociais social={facebook} />
            <LoginComSociais social={google} />
          </FormularioSociais>
        </LoginFormulario>
      </LoginModal>
    </LoginModalContainer>
  );
};

export default Login;
