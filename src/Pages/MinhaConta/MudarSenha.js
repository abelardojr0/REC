import React from "react";
import api from "../../api";
import Footer from "../../Components/Footer/Footer";
import Header from "../../Components/Header/Header";
import { ContainerCarregando } from "../../GlobalStyles";
import { useJwtToken } from "../../useJwtToken";
import Input from "../Cadastro/Formulário/Components/Input";
import { CadastroMsgDeErro } from "../Cadastro/Formulário/StylesFormulario";
import {
  MinhaContaAtualizar,
  MinhaContaBotao,
  MinhaContaTextoSucesso,
  MinhaContaTitulo,
} from "./StylesMinhaConta";
import { ClipLoader } from "react-spinners";

const MudarSenha = () => {
  const [senha, setSenha] = React.useState();
  const [confirmarSenha, setConfirmarSenha] = React.useState();
  const [senhaAtual, setSenhaAtual] = React.useState();
  const [checkSenhaMsgErro, setCheckSenhaMsgErro] = React.useState(false);
  const [senhaFraca, setSenhaFraca] = React.useState(false);
  const [senhaErrada, setSenhaErrada] = React.useState();
  const [sucesso, setSucesso] = React.useState();
  const [carregando, setCarregando] = React.useState(false);
  const [token] = useJwtToken();
  const tokenTemporario = sessionStorage.getItem("token");

  function trocarSenha(e) {
    e.preventDefault();
    setSenhaErrada(false);
    setSenhaFraca(false);
    setCheckSenhaMsgErro(false);

    if (senha === confirmarSenha) {
      if (token || tokenTemporario) {
        setCarregando(true);
        api
          .post("/atualizarSenha", {
            senhaAtual,
            senha,
          })
          .then((response) => {
            console.log(response);
            if (response.data.status === "sucess") {
              setSucesso(true);
              setSenha("");
              setSenhaAtual("");
              setConfirmarSenha("");
              setSenhaFraca(false);
            } else if (response.data.status === "senhaFraca") {
              setSenhaFraca(true);
            } else if (response.data.status === "fail") {
              setCheckSenhaMsgErro(true);
            }
            setCarregando(false);
          })
          .catch((error) => {
            console.log(error);
          });
      }
    } else {
      setSenhaErrada(true);
    }
  }
  return (
    <>
      <Header />
      {carregando && (
        <>
          <ContainerCarregando>
            <ClipLoader size={100} />
          </ContainerCarregando>
        </>
      )}
      <MinhaContaAtualizar onSubmit={trocarSenha}>
        <MinhaContaTitulo>Trocar Senha</MinhaContaTitulo>
        {checkSenhaMsgErro && (
          <CadastroMsgDeErro>Senha atual está incorreta</CadastroMsgDeErro>
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
          dados={senhaAtual}
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
          dados={senha}
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
          dados={confirmarSenha}
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
