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
  LoginMsgErro,
  LoginTitulo,
} from "./StyleLogin";
import facebook from "../../Images/logo_facebook.png";
import google from "../../Images/logo_google.png";
import LoginComSociais from "./LoginComSociais/LoginComSociais";
import axios from "axios";

const Login = ({ setLoginStatus }) => {
  const [email, setEmail] = React.useState();
  const [senha, setSenha] = React.useState();
  const [errorLogin, setErrorLogin] = React.useState();

  function fecharModal(e) {
    if (
      e.target.getAttribute("id") === "modal" ||
      e.target.getAttribute("id") === "fechar"
    ) {
      setLoginStatus(false);
    }
  }
  function checarLogin(e) {
    e.preventDefault();
    axios
      .get("http://localhost:5000/usuarios")
      .then((response) => {
        response.data.every((usuario) => {
          if (email === usuario[2] && senha === usuario[3]) {
            localStorage.setItem("id", usuario[0]);
            localStorage.setItem("nome", usuario[1]);
            setLoginStatus(false);
            setErrorLogin(false);
            return false;
          } else {
            setErrorLogin(true);
            return true;
          }
        });
      })
      .catch((error) => {
        console.log(error);
      });
  }
  return (
    <LoginModalContainer id="modal" onClick={fecharModal}>
      <LoginModal>
        <LoginBotaoFechar id="fechar" onClick={fecharModal}>
          X
        </LoginBotaoFechar>

        <LoginFormulario onSubmit={checarLogin}>
          <LoginTitulo>Entrar</LoginTitulo>
          {errorLogin && <LoginMsgErro>Email/Senha incorreto</LoginMsgErro>}
          <Input
            htmlFor={"userEmail"}
            texto={"E-mail *"}
            tipo={"text"}
            nome={"userEmail"}
            id={"userEmail"}
            tamanho={"grande"}
            required={true}
            setDados={setEmail}
          />
          <Input
            htmlFor={"senhaLogin"}
            texto={"Senha"}
            tipo={"password"}
            nome={"senhaLogin"}
            id={"senhaLogin"}
            tamanho={"grande"}
            required
            setDados={setSenha}
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
