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
// import google from "../../Images/logo_google.png";
// import LoginComS ociais from "./LoginComSociais/LoginComSociais";
import { ClipLoader } from "react-spinners";
import { useNavigate } from "react-router-dom";
import api from "../../api";
import { useJwtToken } from "../../useJwtToken";
import { ContainerCarregando } from "../../GlobalStyles";

const Login = ({ setLoginStatus }) => {
  const [email, setEmail] = React.useState();
  const [senha, setSenha] = React.useState();
  const [errorLogin, setErrorLogin] = React.useState();
  const [lembrar, setLembrar] = React.useState(false);
  const [carregando, setCarregando] = React.useState(false);
  const [token, setToken] = useJwtToken(5);
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
    setCarregando(true);
    api
      .post("/usuarios", {
        email,
        senha,
      })
      .then((response) => {
        console.log(response);
        if (response.data.status === "fail") {
          setErrorLogin(true);
          setSenha("");
          console.log(senha);
        } else if (response.data.status === "sucess") {
          if (lembrar) {
            setToken(response.data.access_token);
            localStorage.setItem("nome", response.data.nome);
            console.log(token);
          } else {
            sessionStorage.setItem("nome", response.data.nome);
            sessionStorage.setItem("token", response.data.access_token);
          }
          setLoginStatus(false);
          setErrorLogin(false);
          navigate("/");
          window.location.reload(true);
        }
        setCarregando(false);
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
          {errorLogin && <LoginMsgErro>Email/Senha incorretos</LoginMsgErro>}
          <Input
            htmlFor={"userEmail"}
            texto={"E-mail *"}
            tipo={"text"}
            nome={"userEmail"}
            id={"userEmail"}
            tamanho={"grande"}
            required={true}
            setDados={setEmail}
            dados={email}
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
            dados={senha}
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
          {carregando ? (
            <LoginBotaoEntrar>
              Entrando
              <ClipLoader size={15} />
            </LoginBotaoEntrar>
          ) : (
            <LoginBotaoEntrar>Entrar </LoginBotaoEntrar>
          )}
          {/* <LoginBotaoEntrar>Entrar</LoginBotaoEntrar> */}

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
