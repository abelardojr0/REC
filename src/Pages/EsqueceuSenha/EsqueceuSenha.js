import React from "react";
import api from "../../api";
import Footer from "../../Components/Footer/Footer";
import Header from "../../Components/Header/Header";
import Input from "../Cadastro/Formulário/Components/Input";
import {
  EsqueceuSenhaBotao,
  EsqueceuSenhaContainer,
  EsqueceuSenhaMsgError,
  EsqueceuSenhaMsgSucesso,
  EsqueceuSenhaTitulo,
} from "./StylesEsqueceuSenha";

const EsqueceuSenha = () => {
  const [email, setEmail] = React.useState();
  const [emailEnviado, setEmailEnviado] = React.useState(false);
  const [emailError, setEmailError] = React.useState(false);
  function enviarEmail() {
    console.log("testando");
    api
      .post("/recuperarSenha", {
        email,
      })
      .then((response) => {
        if (response.data.status === "fail") {
          setEmailError(true);
        } else if (response.data.status === "sucess") {
          setEmailEnviado(true);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }
  return (
    <>
      <Header />
      <EsqueceuSenhaContainer onSubmit={enviarEmail}>
        {emailEnviado && (
          <EsqueceuSenhaMsgSucesso>
            Cheque sua caixa de entrada.(Cheque também o span)
          </EsqueceuSenhaMsgSucesso>
        )}

        {emailError && (
          <EsqueceuSenhaMsgError>
            Cheque sua caixa de entrada.(Cheque também o span)
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
        />
        <EsqueceuSenhaBotao type="submit">Recuperar</EsqueceuSenhaBotao>
      </EsqueceuSenhaContainer>
      <Footer />
    </>
  );
};

export default EsqueceuSenha;
