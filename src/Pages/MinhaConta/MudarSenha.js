import React from "react";
import api from "../../api";
import Footer from "../../Components/Footer/Footer";
import Header from "../../Components/Header/Header";
import { useJwtToken } from "../../useJwtToken";
import Input from "../Cadastro/Formulário/Components/Input";
import { CadastroMsgDeErro } from "../Cadastro/Formulário/StylesFormulario";
import {
  MinhaContaAtualizar,
  MinhaContaBotao,
  MinhaContaTextoSucesso,
  MinhaContaTitulo,
} from "./StylesMinhaConta";

const MudarSenha = () => {
  const [senha, setSenha] = React.useState();
  const [confirmarSenha, setConfirmarSenha] = React.useState();
  const [senhaAtual, setSenhaAtual] = React.useState();
  // const [checkSenha, setCheckSenha] = React.useState(false);
  const [checkSenhaMsgErro, setCheckSenhaMsgErro] = React.useState(false);

  const [senhaFraca, setSenhaFraca] = React.useState(false);
  const [senhaErrada, setSenhaErrada] = React.useState();
  const [sucesso, setSucesso] = React.useState();
  const [token] = useJwtToken();
  const tokenTemporario = sessionStorage.getItem("token");

  function trocarSenha(e) {
    e.preventDefault();
    setSenhaErrada(false);
    setSenhaFraca(false);
    setCheckSenhaMsgErro(false);
    // setCheckSenha(false)

    // api
    //   .post("/checarSenha", {
    //     senha: senhaAtual,
    //   })
    //   .then((response) => {
    //     if (response.data.status === "sucess") {
    //       setCheckSenha(true);
    //     } else if (response.data.status === "fail") {
    //       setCheckSenha(false);
    //     }
    //   })
    //   .catch((error) => {
    //     console.log(error);
    //   });

    // if (checkSenha) {
    if (senha === confirmarSenha) {
      if (token || tokenTemporario) {
        api
          .post("/atualizarSenha", {
            senhaAtual,
            senha,
          })
          .then((response) => {
            console.log(response);
            if (response.data.status === "sucess") {
              setSucesso(true);
              setSenhaFraca(false);
            } else if (response.data.status === "senhaFraca") {
              setSenhaFraca(true);
            } else if (response.data.status === "fail") {
              setCheckSenhaMsgErro(true);
            }
          })
          .catch((error) => {
            console.log(error);
          });
      }
    } else {
      setSenhaErrada(true);
    }
    // } else {
    //   setCheckSenhaMsgErro(true);
    // }
  }
  return (
    <>
      <Header />
      <MinhaContaAtualizar onSubmit={trocarSenha}>
        <MinhaContaTitulo>Trocar Senha</MinhaContaTitulo>
        {senhaFraca && (
          <CadastroMsgDeErro>
            Senha fraca, digite uma senha com no minimo um caracter maiúsculo,
            minúsculo, especial e um número
          </CadastroMsgDeErro>
        )}
        <Input
          htmlFor={"senhaAnterior"}
          texto={"Senha Atual"}
          tipo={"password"}
          nome={"senhaAnterior"}
          id={"senhaAnterior"}
          tamanho={"grande"}
          required={true}
          setDados={setSenhaAtual}
        />
        {checkSenhaMsgErro && (
          <CadastroMsgDeErro>Senha atual está incorreta</CadastroMsgDeErro>
        )}
        <Input
          htmlFor={"novaSenha"}
          texto={"Nova Senha"}
          tipo={"password"}
          nome={"novaSenha"}
          id={"novaSenha"}
          tamanho={"grande"}
          required={true}
          setDados={setSenha}
        />
        {senhaErrada && (
          <CadastroMsgDeErro>As senhas devem ser iguais.</CadastroMsgDeErro>
        )}
        <Input
          htmlFor={"confirmarSenha"}
          texto={"Confirmar Senha"}
          tipo={"password"}
          nome={"confirmarSenha"}
          id={"confirmarSenha"}
          tamanho={"grande"}
          required={true}
          setDados={setConfirmarSenha}
        />
        <MinhaContaBotao>Trocar Senha</MinhaContaBotao>
        {sucesso && (
          <MinhaContaTextoSucesso>
            Atualizado com sucesso
          </MinhaContaTextoSucesso>
        )}
      </MinhaContaAtualizar>
      <Footer />
    </>
  );
};

export default MudarSenha;
