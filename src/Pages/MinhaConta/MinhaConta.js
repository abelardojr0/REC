import React from "react";
import api from "../../api";
import Footer from "../../Components/Footer/Footer";
import Header from "../../Components/Header/Header";
import { useJwtToken } from "../../useJwtToken";
import { MinhaContaBotao, MinhaContaContainer } from "./StylesMinhaConta";

const MinhaConta = () => {
  const [token] = useJwtToken();
  const tokenTemporario = sessionStorage.getItem("token");

  function deletarUsuario() {
    if (token || tokenTemporario) {
      api
        .post("/deletarUsuario")
        .then((response) => {
          console.log(response);
          localStorage.clear();
          window.location.reload();
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }
  return (
    <>
      <Header />
      <MinhaContaContainer>
        <MinhaContaBotao to="/atualizarConta">Atualizar</MinhaContaBotao>
        <MinhaContaBotao onClick={deletarUsuario} to="/">
          Deletar
        </MinhaContaBotao>
      </MinhaContaContainer>
      <Footer />
    </>
  );
};

export default MinhaConta;
