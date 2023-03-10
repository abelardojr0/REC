import React from "react";
// import LoginComSociais from "../../Login/LoginComSociais/LoginComSociais";
import Input from "./Components/Input";
import {
  Botao,
  CadastroMsgDeErro,
  ContainerFormulario,
  FormularioJaTenhoConta,
  FormularioJaTenhoContaTitulo,
  // FormularioSociaisCadastro,
  SubtituloFormulario,
  TituloFormulario,
} from "./StylesFormulario";

// import facebook from "../../../Images/logo_facebook.png";
// import google from "../../../Images/logo_google.png";
// import { EntrarCom, FormularioSociais } from "../../Login/StyleLogin";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Formulario = () => {
  const navigate = useNavigate();
  const [nome, setNome] = React.useState();
  const [email, setEmail] = React.useState();
  const [senha, setSenha] = React.useState();
  const [confirmarSenha, setConfirmarSenha] = React.useState();
  const [msgErroEmail, setMsgErroEmail] = React.useState(false);
  const [msgErroSenha, setMsgErroSenha] = React.useState(false);
  const [msgErroSenhaFraca, setMsgErroSenhaFraca] = React.useState(false);

  function finalizar(e) {
    e.preventDefault();
    if (senha === confirmarSenha) {
      axios
        .post("http://localhost:5000/inserirUsuario", {
          nome,
          email,
          senha,
        })
        .then((response) => {
          console.log(response.data.status);
          if (response.data.status === "sucess") {
            navigate("/finalizado");
          } else if (response.data.status === "fail") {
            setMsgErroEmail(true);
          } else if (response.data.status === "senhaFraca") {
            setMsgErroSenhaFraca(true);
          }
        })
        .catch((error) => {
          console.log(error);
        });
    } else {
      setMsgErroSenha(true);
    }
  }
  return (
    <>
      <ContainerFormulario onSubmit={finalizar}>
        <TituloFormulario>Dados do cadastro</TituloFormulario>
        <SubtituloFormulario>Dados Pessoais</SubtituloFormulario>
        <Input
          htmlFor={"usuario"}
          texto={"Usu??rio *"}
          tipo={"text"}
          nome={"usuario"}
          id={"usuario"}
          tamanho={"grande"}
          required={true}
          setDados={setNome}
        />
        {msgErroEmail && (
          <CadastroMsgDeErro>Email j?? existe!</CadastroMsgDeErro>
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
            Senha fraca, digite uma senha com no minimo um caracter mai??sculo,
            min??sculo, especial e um n??mero
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
          <CadastroMsgDeErro>Senhas n??o compativeis</CadastroMsgDeErro>
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
            J?? possui uma conta?
          </FormularioJaTenhoContaTitulo>
          <Botao>Entrar</Botao>

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
