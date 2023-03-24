import React from "react";
import { useNavigate } from "react-router-dom";
import api from "../../api";
import Footer from "../../Components/Footer/Footer";
import Header from "../../Components/Header/Header";
import { useJwtToken } from "../../useJwtToken";
import Input from "../Cadastro/Formulário/Components/Input";
import {
  MinhaContaBotao,
  MinhaContaBotaoAtualizar,
  MinhaContaContainer,
  MinhaContaContainerConfirmacao,
  MinhaContaModalBotaoFechar,
  MinhaContaModalConfirmacao,
  MinhaContaModalFormulario,
  MinhaContaModalMsgErro,
} from "./StylesMinhaConta";

const MinhaConta = () => {
  const [token] = useJwtToken();
  const tokenTemporario = sessionStorage.getItem("token");
  const [modalConfirmacao, setModalConfirmacao] = React.useState(false);
  const [senha, setSenha] = React.useState();
  const [senhaErrada, setSenhaErrada] = React.useState(false);
  const navigate = useNavigate();
  function fecharModal(e) {
    if (
      e.target.getAttribute("id") === "modal" ||
      e.target.getAttribute("id") === "fechar"
    ) {
      setModalConfirmacao(false);
    }
  }
  function abrirModalConfirmacao() {
    setModalConfirmacao(true);
    setSenhaErrada(false);
  }

  function deletarUsuario(e) {
    e.preventDefault();
    if (token || tokenTemporario) {
      api
        .post("/deletarUsuario", {
          senha,
        })
        .then((response) => {
          console.log(response);
          if (response.data.status === "sucess") {
            localStorage.clear();
            sessionStorage.clear();
            navigate("/");
            window.location.reload();
          } else {
            setSenhaErrada(true);
          }
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }
  function trocarSenha(e) {
    e.preventDefault();
    navigate("/mudarSenha");
  }
  function atualizarUsuario(e) {
    e.preventDefault();
    navigate("/atualizarConta");
  }
  return (
    <>
      <Header />
      {modalConfirmacao && (
        <>
          <MinhaContaContainerConfirmacao id="modal" onClick={fecharModal}>
            <MinhaContaModalConfirmacao>
              <MinhaContaModalBotaoFechar id="fechar" onClick={fecharModal}>
                X
              </MinhaContaModalBotaoFechar>
              <MinhaContaModalFormulario onSubmit={deletarUsuario}>
                Confirme sua senha
                <Input
                  htmlFor={"senhaConfirma"}
                  texto={"Senha"}
                  tipo={"password"}
                  nome={"senhaConfirma"}
                  id={"senhaConfirma"}
                  tamanho={"grande"}
                  required
                  setDados={setSenha}
                />
                {senhaErrada && (
                  <>
                    <MinhaContaModalMsgErro>
                      Senha incorreta.
                    </MinhaContaModalMsgErro>
                  </>
                )}
                <MinhaContaBotao>Deletar</MinhaContaBotao>
              </MinhaContaModalFormulario>
            </MinhaContaModalConfirmacao>
          </MinhaContaContainerConfirmacao>
        </>
      )}
      <MinhaContaContainer>
        <MinhaContaBotaoAtualizar onClick={atualizarUsuario}>
          Atualizar Usuário
        </MinhaContaBotaoAtualizar>
        <MinhaContaBotaoAtualizar onClick={trocarSenha}>
          Trocar Senha
        </MinhaContaBotaoAtualizar>
        <MinhaContaBotao onClick={abrirModalConfirmacao}>
          Deletar Conta
        </MinhaContaBotao>
      </MinhaContaContainer>
      <Footer />
    </>
  );
};

export default MinhaConta;
