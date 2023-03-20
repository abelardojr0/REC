import React from "react";
import Input from "../Cadastro/Formulário/Components/Input";
import {
  // EntrarCom,
  // FormularioSociais,
  LoginBotaoEntrar,
  LoginBotaoFechar,
  LoginEsqueceuSenha,
  LoginFormulario,
  LoginLembrarDivisao,
  LoginLembrarInput,
  LoginLembrarLabel,
  LoginModal,
  LoginModalContainer,
  LoginMsgErro,
  LoginTitulo,
} from "./StyleLogin";
// import facebook from "../../Images/logo_facebook.png";
// import google from "../../Images/logo_google.png";
// import LoginComS ociais from "./LoginComSociais/LoginComSociais";

import { useNavigate } from "react-router-dom";
import api from "../../api";
import { useJwtToken } from "../../useJwtToken";

const Login = ({ setLoginStatus }) => {
  const [email, setEmail] = React.useState();
  const [senha, setSenha] = React.useState();
  const [errorLogin, setErrorLogin] = React.useState();
  const [lembrar, setLembrar] = React.useState(false);
  const [token, setToken] = useJwtToken(5);
  console.log(token);
  const navigate = useNavigate();

  function fecharModal(e) {
    if (
      e.target.getAttribute("id") === "modal" ||
      e.target.getAttribute("id") === "fechar"
    ) {
      setLoginStatus(false);
    }
  }
  function checarLembrar(e) {
    setLembrar(e.target.checked);
  }
  function checarLogin(e) {
    e.preventDefault();
    api
      .post("/usuarios", {
        email,
        senha,
      })
      .then((response) => {
        console.log(response);
        if (response.data.status === "fail") {
          setErrorLogin(true);
        } else {
          if (lembrar) {
            setToken(response.data.access_token);
            localStorage.setItem("nome", response.data.nome);
          } else {
            sessionStorage.setItem("nome", response.data.nome);
            sessionStorage.setItem("token", response.data.access_token);
          }
          setLoginStatus(false);
          setErrorLogin(false);
          navigate("/");
          window.location.reload(true);
        }
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
          <LoginTitulo>Login</LoginTitulo>
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
          <LoginEsqueceuSenha to="/esqueceuSenha">
            Esqueceu a senha?
          </LoginEsqueceuSenha>
          <LoginLembrarDivisao>
            <LoginLembrarInput
              checked={lembrar}
              onChange={checarLembrar}
              type={"checkbox"}
              name={"lembrar"}
              id={"lembrar"}
            />
            <LoginLembrarLabel htmlFor={"lembrar"}>Lembre-me</LoginLembrarLabel>
          </LoginLembrarDivisao>

          <LoginBotaoEntrar>Entrar</LoginBotaoEntrar>

          {/* <EntrarCom>Entrar com: </EntrarCom> */}
          {/* <FormularioSociais>
            <LoginComSociais social={facebook} />
            <LoginComSociais social={google} />
          </FormularioSociais> */}
        </LoginFormulario>
      </LoginModal>
    </LoginModalContainer>
  );
};

export default Login;
