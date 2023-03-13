import axios from "axios";
import React from "react";
import Footer from "../../Components/Footer/Footer";
import Header from "../../Components/Header/Header";
import Input from "../Cadastro/Formulário/Components/Input";
import { CadastroMsgDeErro } from "../Cadastro/Formulário/StylesFormulario";
import {
  MinhaContaAtualizar,
  MinhaContaBotao,
  MinhaContaTextoSucesso,
  MinhaContaTitulo,
} from "./StylesMinhaConta";

const AtualizarUsuario = () => {
  const [nome, setNome] = React.useState();
  const [email, setEmail] = React.useState();
  const [senha, setSenha] = React.useState();
  const [senhaFraca, setSenhaFraca] = React.useState(false);
  const [sucesso, setSucesso] = React.useState();
  const id_usuario = localStorage.getItem("id");

  function atualizarBanco(e) {
    e.preventDefault();
    localStorage.setItem("nome", nome);
    axios
      .post("http://localhost:5000/atualizarUsuario", {
        nome,
        email,
        senha,
        id_usuario,
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
  return (
    <>
      <Header />
      <MinhaContaAtualizar>
        <MinhaContaTitulo>Atualizar Usuário</MinhaContaTitulo>
        <Input
          htmlFor={"NovoNome"}
          texto={"Novo Nome"}
          tipo={"text"}
          nome={"NovoNome"}
          id={"NovoNome"}
          tamanho={"grande"}
          required={true}
          setDados={setNome}
        />
        <Input
          htmlFor={"novoEmail"}
          texto={"Novo Email"}
          tipo={"text"}
          nome={"novoEmail"}
          id={"novoEmail"}
          tamanho={"grande"}
          required={true}
          setDados={setEmail}
        />
        {senhaFraca && (
          <CadastroMsgDeErro>
            Senha fraca, digite uma senha com no minimo um caracter maiúsculo,
            minúsculo, especial e um número
          </CadastroMsgDeErro>
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

export default AtualizarUsuario;
