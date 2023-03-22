import React from "react";
import { useSearchParams } from "react-router-dom";
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
} from "../MinhaConta/StylesMinhaConta";

const NovaSenha = () => {
  const [senha, setSenha] = React.useState();
  const [senhaRepetida, setSenhaRepetida] = React.useState();
  const [senhaFraca, setSenhaFraca] = React.useState(false);
  const [sucesso, setSucesso] = React.useState();
  const [token] = useJwtToken();
  const tokenTemporario = sessionStorage.getItem("token");
  const [searchParams] = useSearchParams();
  const tokenURL = searchParams.get("q");
  function atualizarBanco(e) {
    e.preventDefault();
    if (senha === senhaRepetida) {
      if (token || tokenTemporario) {
        api
          .post("/alterarSenha/" + tokenURL, {
            senha,
          })
          .then((response) => {
            console.log(response);
            if (response.data.status === "sucess") {
              setSucesso(true);
              setSenhaFraca(false);
            } else if (response.data.status === "senhaFraca") {
              setSenhaFraca(true);
            }
          })
          .catch((error) => {
            console.log(error);
          });
      }
    } else {
      setSenhaRepetida(false);
    }
  }
  return (
    <>
      <Header />
      <MinhaContaAtualizar>
        <MinhaContaTitulo>Redefinir Senha</MinhaContaTitulo>

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
        {senhaFraca && (
          <CadastroMsgDeErro>
            Senha fraca, digite uma senha com no minimo um caracter maiúsculo,
            minúsculo, especial e um número
          </CadastroMsgDeErro>
        )}
        <Input
          htmlFor={"novaSenhaRepete"}
          texto={"Digite a senha novamente"}
          tipo={"password"}
          nome={"novaSenhaRepete"}
          id={"novaSenhaRepete"}
          tamanho={"grande"}
          required={true}
          setDados={setSenhaRepetida}
        />
        {!senhaRepetida && (
          <CadastroMsgDeErro>As senhas devem ser iguais.</CadastroMsgDeErro>
        )}
        <MinhaContaBotao onClick={atualizarBanco}>Atualizar</MinhaContaBotao>
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

export default NovaSenha;
