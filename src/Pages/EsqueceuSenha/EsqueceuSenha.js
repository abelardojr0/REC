import React from "react";
import api from "../../api";
import Footer from "../../Components/Footer/Footer";
import Header from "../../Components/Header/Header";
import { ContainerCarregando } from "../../GlobalStyles";
import Input from "../Cadastro/Formulário/Components/Input";
import {
  EsqueceuSenhaBotao,
  EsqueceuSenhaContainer,
  EsqueceuSenhaMsgError,
  EsqueceuSenhaMsgSucesso,
  EsqueceuSenhaTitulo,
} from "./StylesEsqueceuSenha";
import { ClipLoader } from "react-spinners";

const EsqueceuSenha = () => {
  const [email, setEmail] = React.useState();
  const [emailEnviado, setEmailEnviado] = React.useState(false);
  const [emailError, setEmailError] = React.useState(false);
  const [carregando, setCarrengando] = React.useState(false);

  function enviarEmail(e) {
    e.preventDefault();
    setCarrengando(true);
    api
      .post("/recuperarSenha", {
        email,
      })
      .then((response) => {
        console.log(response);
        if (response.data.status === "fail") {
          setEmailError(true);
        } else if (response.data.status === "sucess") {
          setEmailEnviado(true);
          setEmailError(false);
          setEmail("");
        }
        setCarrengando(false);
      })
      .catch((error) => {
        console.log(error);
      });
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
      <EsqueceuSenhaContainer onSubmit={enviarEmail}>
        {emailEnviado && (
          <EsqueceuSenhaMsgSucesso>
            Cheque sua caixa de entrada.(Cheque também o span)
          </EsqueceuSenhaMsgSucesso>
        )}

        {emailError && (
          <EsqueceuSenhaMsgError>
            O e-mail informado é inválido/não possui cadastro.
          </EsqueceuSenhaMsgError>
        )}

        <EsqueceuSenhaTitulo>Recuperar Senha</EsqueceuSenhaTitulo>
        <Input
          htmlFor={"confirmarEmail"}
          texto={"Confirme seu Email"}
          tipo={"text"}
          nome={"confirmarEmail"}
          id={"confirmarEmail"}
          tamanho={"grande"}
          required={true}
          setDados={setEmail}
          dados={email}
        />
        <EsqueceuSenhaBotao>Recuperar</EsqueceuSenhaBotao>
      </EsqueceuSenhaContainer>
      <Footer />
    </>
  );
};

export default EsqueceuSenha;
