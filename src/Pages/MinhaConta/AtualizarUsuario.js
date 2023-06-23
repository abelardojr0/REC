import React from "react";
import api from "../../api";
import Footer from "../../Components/Footer/Footer";
import Header from "../../Components/Header/Header";
import { useJwtToken } from "../../useJwtToken";
import Input from "../Cadastro/Formulário/Components/Input";
import { ClipLoader } from "react-spinners";
import {
  MinhaContaAtualizar,
  MinhaContaBotao,
  MinhaContaContainerConfirmacao,
  MinhaContaModalBotaoFechar,
  MinhaContaModalConfirmacao,
  MinhaContaModalFormulario,
  MinhaContaModalMsgErro,
  MinhaContaTextoSucesso,
  MinhaContaTitulo,
} from "./StylesMinhaConta";

const AtualizarUsuario = () => {
  const [nome, setNome] = React.useState();
  const [sucesso, setSucesso] = React.useState();
  const [modalConfirmacao, setModalConfirmacao] = React.useState(false);
  const [senha, setSenha] = React.useState();
  const [senhaErrada, setSenhaErrada] = React.useState(false);
  const [token] = useJwtToken();
  const tokenTemporario = sessionStorage.getItem("token");
  const [carregando, setCarregando] = React.useState(false);

  function fecharModal(e) {
    if (
      e.target.getAttribute("id") === "modal" ||
      e.target.getAttribute("id") === "fechar"
    ) {
      setModalConfirmacao(false);
    }
  }

  function atualizarUsuario(e) {
    e.preventDefault();
    setCarregando(true);
    if (token || tokenTemporario) {
      api
        .post("/atualizarUsuario", {
          nome,
          senha,
        })
        .then((response) => {
          console.log(response);
          if (response.data.status === "success") {
            setSucesso(true);
            setModalConfirmacao(false);
            setNome("");
            localStorage.setItem("nome", nome);
          } else if (response.data.status === "fail") {
            setSenhaErrada(true);
            setSenha("");
          }
          setCarregando(false);
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }
  function abrirModalConfirmacao(e) {
    e.preventDefault();
    setModalConfirmacao(true);
    setSenhaErrada(false);
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
              <MinhaContaModalFormulario onSubmit={atualizarUsuario}>
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
                  dados={senha}
                />
                {senhaErrada && (
                  <>
                    <MinhaContaModalMsgErro>
                      Senha incorreta.
                    </MinhaContaModalMsgErro>
                  </>
                )}
                {carregando ? (
                  <MinhaContaBotao>
                    Atualizando
                    <ClipLoader size={15} />
                  </MinhaContaBotao>
                ) : (
                  <MinhaContaBotao>Atualizar </MinhaContaBotao>
                )}
              </MinhaContaModalFormulario>
            </MinhaContaModalConfirmacao>
          </MinhaContaContainerConfirmacao>
        </>
      )}
      <MinhaContaAtualizar onSubmit={abrirModalConfirmacao}>
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
          dados={nome}
        />
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

export default AtualizarUsuario;
