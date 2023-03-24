import React from "react";
// import LoginComSociais from "../../Login/LoginComSociais/LoginComSociais";
import Input from "./Components/Input";
import {
  Botao,
  BotaoFalso,
  CadastroMsgDeErro,
  ContainerFormulario,
  FormularioJaTenhoConta,
  FormularioJaTenhoContaTitulo,
  // FormularioSociaisCadastro,
  TituloFormulario,
} from "./StylesFormulario";

// import facebook from "../../../Images/logo_facebook.png";
// import google from "../../../Images/logo_google.png";
// import { EntrarCom, FormularioSociais } from "../../Login/StyleLogin";
import { useNavigate } from "react-router-dom";
import api from "../../../api";
import Login from "../../Login/Login";
import { ContainerCarregando } from "../../../GlobalStyles";
import { ClipLoader } from "react-spinners";

const Formulario = () => {
  const navigate = useNavigate();
  const [nome, setNome] = React.useState();
  const [email, setEmail] = React.useState();
  const [senha, setSenha] = React.useState();
  const [confirmarSenha, setConfirmarSenha] = React.useState();
  const [msgErroEmail, setMsgErroEmail] = React.useState(false);
  const [msgErroSenha, setMsgErroSenha] = React.useState(false);
  const [msgErroSenhaFraca, setMsgErroSenhaFraca] = React.useState(false);
  const [loginStatus, setLoginStatus] = React.useState(false);
  const [carregando, setCarregando] = React.useState(false);

  function finalizar(e) {
    e.preventDefault();
    setMsgErroEmail(false);
    setMsgErroSenha(false);
    setMsgErroSenhaFraca(false);
    if (senha === confirmarSenha && msgErroEmail === false) {
      setCarregando(true);
      api
        .post("/inserirUsuario", {
          nome,
          email,
          senha,
        })
        .then((response) => {
          console.log(response);
          if (response.data.status === "sucess") {
            navigate(`/checarEmail?q=${email}`);
          } else if (response.data.status === "fail") {
            setMsgErroEmail(true);
          } else if (response.data.status === "senhaFraca") {
            setMsgErroSenhaFraca(true);
          }
          setCarregando(false);
        })
        .catch((error) => {
          console.log(error);
        });
    } else {
      setMsgErroSenha(true);
      setCarregando(false);
    }
  }
  function abrirLogin() {
    if (loginStatus === true) {
      setLoginStatus(false);
    } else {
      setLoginStatus(true);
    }
  }

  return (
    <>
      {carregando && (
        <>
          <ContainerCarregando>
            <ClipLoader size={100} />
          </ContainerCarregando>
        </>
      )}
      {loginStatus && (
        <>
          <Login setLoginStatus={setLoginStatus} />
        </>
      )}
      <ContainerFormulario onSubmit={finalizar}>
        <TituloFormulario>Dados do cadastro</TituloFormulario>
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
        {msgErroEmail && (
          <CadastroMsgDeErro>Email já existe!</CadastroMsgDeErro>
        )}
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
        {msgErroSenhaFraca && (
          <CadastroMsgDeErro>
            Senha fraca, digite uma senha com no minimo um caracter maiúsculo,
            minúsculo, especial e um número
          </CadastroMsgDeErro>
        )}
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
        {msgErroSenha && (
          <CadastroMsgDeErro>Senhas não compativeis</CadastroMsgDeErro>
        )}
        <Input
          htmlFor={"confirmarSenha"}
          texto={"Confirmar senha *"}
          tipo={"password"}
          nome={"confirmarSenha"}
          id={"confirmarSenha"}
          tamanho={"grande"}
          required
          setDados={setConfirmarSenha}
        />
        <Botao type="submit">Cadastrar</Botao>

        <FormularioJaTenhoConta>
          <FormularioJaTenhoContaTitulo>
            Já possui uma conta?
          </FormularioJaTenhoContaTitulo>
          <BotaoFalso onClick={abrirLogin}>Entrar</BotaoFalso>

          {/* <FormularioSociaisCadastro>
            <EntrarCom style={{ color: "white" }}>Entrar com: </EntrarCom>
            <FormularioSociais>
              <LoginComSociais social={facebook} />
              <LoginComSociais social={google} />
            </FormularioSociais>
          </FormularioSociaisCadastro> */}
        </FormularioJaTenhoConta>
      </ContainerFormulario>
    </>
  );
};

export default Formulario;
