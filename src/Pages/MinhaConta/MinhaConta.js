import axios from "axios";
import React from "react";
import Footer from "../../Components/Footer/Footer";
import Header from "../../Components/Header/Header";
import { MinhaContaBotao, MinhaContaContainer } from "./StylesMinhaConta";

const MinhaConta = () => {
  const id_usuario = localStorage.getItem("id");

  function deletarUsuario() {
    axios
      .post("http://localhost:5000/deletarUsuario", {
        id_usuario,
      })
      .then((response) => {
        console.log(response);
        localStorage.clear();
        window.location.reload();
      })
      .catch((error) => {
        console.log(error);
      });
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
