import React from "react";
import { LinksApi } from "../../ConsultasParaApi";
import {
  CardBotao,
  CardComponent,
  CardContainerBotao,
  CardContainerInfos,
  CardContainerNota,
  CardDivInfos,
  CardImagem,
  CardTextoBotao,
  CardTitulo,
} from "./StyleCard";
import star from "../../Images/estrela.png";
import listaDesejo_img from "../../Images/adicionar.png";
import adicionar from "../../Images/assistir.png";
import detalhes from "../../Images/detalhes.png";
import assistido_img from "../../Images/assistido.png";
import adicionado from "../../Images/adicionado.png";

import api from "../../api";
import { useMemo } from "react";
import { useCallback } from "react";
import { useEffect } from "react";
import { useJwtToken } from "../../useJwtToken";
import { useNavigate } from "react-router-dom";
// import { Tooltip } from "react-tooltip";
const img = LinksApi.IMG;

const Card = ({
  titulo,
  imagem,
  nota,
  id,
  tipo,
  setLoginStatus,
  listaBanco,
  listaDesejoBanco,
}) => {
  const [habilitando, setHabilitando] = React.useState("");
  const [assistido, setAssistido] = React.useState(false);
  const [adicionadoNaLista, setAdicionadoNaLista] = React.useState(false);
  const [visivel, setVisivel] = React.useState(true);
  const pageAtual = useMemo(() => window.location.href, []);
  const [token] = useJwtToken();
  const tokenTemporario = sessionStorage.getItem("token");
  const navigate = useNavigate();
  const verificarListaBanco = useCallback(() => {
    if (!pageAtual.includes("listaDesejo")) {
      if (listaBanco) {
        listaBanco.forEach((item) => {
          if (item[1] === titulo) {
            setAssistido(true);
          }
        });
      }
      if (listaDesejoBanco) {
        listaDesejoBanco.forEach((item) => {
          if (item[1] === titulo) {
            setAdicionadoNaLista(true);
          }
        });
      }
    }
  }, [titulo, listaBanco, listaDesejoBanco, pageAtual]);

  useEffect(() => {
    verificarListaBanco();
  }, [verificarListaBanco]);

  const habilitandoInfos = useCallback(() => {
    setHabilitando("ativo");
  }, []);

  const desabilitandoInfos = useCallback(() => {
    setHabilitando("");
  }, []);

  const marcarAssistido = useCallback(() => {
    if (token || tokenTemporario) {
      if (setLoginStatus) {
        setLoginStatus(false);
      }
      setAssistido(true);
      if (pageAtual.includes("listaDesejo")) {
        setVisivel(false);
      }
      api
        .post("/removerListaDesejo", {
          titulo,
        })
        .then((response) => {
          console.log(response);
        })
        .catch((error) => {
          console.log(error);
        });
      if (tipo === "movie") {
        api
          .post("/inserirFilme", {
            titulo,
            imagem,
            nota,
            tipo,
            id_api: id,
          })
          .then((response) => {
            console.log(response);
          })
          .catch((error) => {
            console.log(error);
          });
      } else if (tipo === "tv") {
        api
          .post("/inserirSerie", {
            titulo,
            imagem,
            nota,
            tipo,
            id_api: id,
          })
          .then((response) => {
            console.log(response);
          })
          .catch((error) => {
            console.log(error);
          });
      }
    } else {
      setLoginStatus(true);
    }
  }, [
    id,
    token,
    imagem,
    nota,
    pageAtual,
    setLoginStatus,
    tipo,
    titulo,
    tokenTemporario,
  ]);

  const desmarcarAssistido = useCallback(() => {
    setAssistido(false);
    if (tipo === "movie") {
      if (pageAtual.includes("meusFilmes")) {
        setVisivel(false);
      }
      api
        .post("/removerFilme", {
          titulo,
        })
        .then((response) => {
          console.log(response);
        })
        .catch((error) => {
          console.log(error);
        });
    } else {
      if (pageAtual.includes("minhasSeries")) {
        setVisivel(false);
      }
      api
        .post("/removerSerie", {
          titulo,
        })
        .then((response) => {
          console.log(response);
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }, [setAssistido, tipo, titulo, setVisivel, pageAtual]);

  const adicionarNaLista = useCallback(() => {
    if (token || tokenTemporario) {
      setAdicionadoNaLista(true);
      api
        .post("/inserirListaDesejo", {
          titulo,
          imagem,
          nota,
          tipo,
          id_api: id,
        })
        .then((response) => {
          console.log(response);
        })
        .catch((error) => {
          console.log(error);
        });
    } else {
      setLoginStatus(true);
    }
  }, [
    token,
    setAdicionadoNaLista,
    titulo,
    imagem,
    nota,
    tipo,
    id,
    setLoginStatus,
    tokenTemporario,
  ]);

  const removerDaLista = useCallback(() => {
    setAdicionadoNaLista(false);
    if (pageAtual.includes("listaDesejo")) {
      setVisivel(false);
    }
    api
      .post("/removerListaDesejo", {
        titulo,
      })
      .then((response) => {
        console.log(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [titulo, setAdicionadoNaLista, setVisivel, pageAtual]);

  function verDetalhes() {
    navigate(`/${tipo}/${id}`);
  }
  return (
    <>
      {visivel && (
        <CardComponent
          onMouseOver={habilitandoInfos}
          onMouseOut={desabilitandoInfos}
        >
          <CardImagem src={`${img}${imagem}`} alt="poster" />
          <CardDivInfos className={habilitando}>
            <CardContainerNota>
              <img src={star} alt="star" />
              <p>{nota}</p>
            </CardContainerNota>
            <CardTitulo to={`/${tipo}/${id}`}>{titulo}</CardTitulo>
            <CardContainerInfos>
              {assistido ? (
                <>
                  <CardContainerBotao onClick={desmarcarAssistido}>
                    <CardTextoBotao>Assistido</CardTextoBotao>
                    <CardBotao src={assistido_img} alt="icon-assistido" />
                  </CardContainerBotao>
                </>
              ) : (
                <>
                  <CardContainerBotao onClick={marcarAssistido}>
                    <CardTextoBotao>Assistir</CardTextoBotao>
                    <CardBotao src={adicionar} alt="adicionar" />
                  </CardContainerBotao>
                  {!adicionadoNaLista && !pageAtual.includes("listaDesejo") ? (
                    <>
                      <CardContainerBotao onClick={adicionarNaLista}>
                        <CardTextoBotao>Adicionar</CardTextoBotao>
                        <CardBotao
                          src={listaDesejo_img}
                          alt="icon-lista_desejo"
                        />
                      </CardContainerBotao>
                    </>
                  ) : (
                    <>
                      <CardContainerBotao onClick={removerDaLista}>
                        <CardTextoBotao>Adicionado</CardTextoBotao>
                        <CardBotao src={adicionado} alt="icon-lista_desejo" />
                      </CardContainerBotao>
                    </>
                  )}
                </>
              )}

              <CardContainerBotao onClick={verDetalhes}>
                <CardTextoBotao>Detalhes</CardTextoBotao>
                <CardBotao id="mais_detalhes" src={detalhes} alt="more" />
              </CardContainerBotao>
            </CardContainerInfos>
          </CardDivInfos>
        </CardComponent>
      )}
    </>
  );
};

export default Card;
