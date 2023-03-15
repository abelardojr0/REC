import React from "react";
import Input from "../Cadastro/Formulário/Components/Input";
import {
  // EntrarCom,
  // FormularioSociais,
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
// import facebook from "../../Images/logo_facebook.png";
// import google from "../../Images/logo_google.png";
// import LoginComSociais from "./LoginComSociais/LoginComSociais";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Login = ({ setLoginStatus }) => {
  const [email, setEmail] = React.useState();
  const [senha, setSenha] = React.useState();
  const [errorLogin, setErrorLogin] = React.useState();
  const navigate = useNavigate();
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
      .post("http://localhost:5000/usuarios", {
        email,
        senha,
      })
      .then((response) => {
        console.log(response);
        if (response.data.status === "fail") {
          setErrorLogin(true);
        } else {
          localStorage.setItem("id", response.data.id);
          localStorage.setItem("nome", response.data.nome);
          localStorage.setItem("token", response.data.access_token);
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
