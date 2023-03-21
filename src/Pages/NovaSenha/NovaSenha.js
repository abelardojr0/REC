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
} from "../MinhaConta/StylesMinhaConta";

const NovaSenha = () => {
  const [senha, setSenha] = React.useState();
  const [senhaFraca, setSenhaFraca] = React.useState(false);
  const [sucesso, setSucesso] = React.useState();
  const [token] = useJwtToken();
  const tokenTemporario = sessionStorage.getItem("token");

  function atualizarBanco(e) {
    e.preventDefault();
    if (token || tokenTemporario) {
      api
        .post("/atualizarUsuario", {
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
  }
  return (
    <>
      <Header />
      <MinhaContaAtualizar>
        <MinhaContaTitulo>Atualizar Usuário</MinhaContaTitulo>

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
        />
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
