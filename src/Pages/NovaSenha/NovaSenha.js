import React from "react";
import { useSearchParams } from "react-router-dom";
import api from "../../api";
import Footer from "../../Components/Footer/Footer";
import Header from "../../Components/Header/Header";
import { ContainerCarregando } from "../../GlobalStyles";
import Input from "../Cadastro/Formulário/Components/Input";
import { CadastroMsgDeErro } from "../Cadastro/Formulário/StylesFormulario";
import {
  MinhaContaAtualizar,
  MinhaContaBotao,
  MinhaContaTextoSucesso,
  MinhaContaTitulo,
} from "../MinhaConta/StylesMinhaConta";
import { ClipLoader } from "react-spinners";

const NovaSenha = () => {
  const [senha, setSenha] = React.useState();
  const [senhaRepetida, setSenhaRepetida] = React.useState();
  const [senhasDiferentes, setSenhasDiferentes] = React.useState(true);
  const [senhaFraca, setSenhaFraca] = React.useState(false);
  const [sucesso, setSucesso] = React.useState();
  const [carregando, setCarrengando] = React.useState(false);
  const [searchParams] = useSearchParams();
  const tokenURL = searchParams.get("q");

  function atualizarSenha(e) {
    e.preventDefault();
    setCarrengando(true);
    setSenhasDiferentes(true);
    setSenhaFraca(false);
    if (senha === senhaRepetida) {
      api
        .post("/novaSenha/" + tokenURL, {
          senha,
        })
        .then((response) => {
          console.log(response);
          if (response.data.status === "sucess") {
            setSenhasDiferentes(true);
            setSenhaFraca(false);
            setSucesso(true);
            setSenha("");
            setSenhaRepetida("");
          } else if (response.data.status === "senhaFraca") {
            setSenhaFraca(true);
            setSenha("");
            setSenhaRepetida("");
          }
          setCarrengando(false);
        })
        .catch((error) => {
          console.log(error);
        });
    } else {
      setSenhasDiferentes(false);
      setSenhaFraca(false);
      setCarrengando(false);
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
      <Header />
      <MinhaContaAtualizar onSubmit={atualizarSenha}>
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
          dados={senha}
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
          dados={senhaRepetida}
        />
        {!senhasDiferentes && (
          <CadastroMsgDeErro>As senhas devem ser iguais.</CadastroMsgDeErro>
        )}
        <MinhaContaBotao>Atualizar</MinhaContaBotao>
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
