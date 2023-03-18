import React from "react";
import { LinksApi } from "../../ConsultasParaApi";
import {
  CardBotao,
  CardComponent,
  CardContainerInfos,
  CardContainerNota,
  CardDivInfos,
  CardImagem,
  CardLink,
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
  const pageListaDesejo = useMemo(
    () => "http://localhost:3000/listaDesejo",
    []
  );
  const [token] = useJwtToken();
  const tokenTemporario = sessionStorage.getItem("token");

  const verificarListaBanco = useCallback(() => {
    if (pageAtual !== pageListaDesejo) {
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
  }, [titulo, listaBanco, listaDesejoBanco, pageAtual, pageListaDesejo]);

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
      if (pageAtual === pageListaDesejo) {
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
      } else {
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
    pageListaDesejo,
    setLoginStatus,
    tipo,
    titulo,
    tokenTemporario,
  ]);

  const desmarcarAssistido = useCallback(() => {
    setAssistido(false);
    if (tipo === "movie") {
      if (window.location.href === "http://localhost:3000/meusFilmes") {
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
      if (window.location.href === "http://localhost:3000/minhasSeries") {
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
  }, [setAssistido, tipo, titulo, setVisivel]);

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
    if (window.location.href === "http://localhost:3000/listaDesejo") {
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
  }, [titulo, setAdicionadoNaLista, setVisivel]);

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
                <CardBotao
                  onClick={desmarcarAssistido}
                  src={assistido_img}
                  alt="icon-assistido"
                />
              ) : (
                <>
                  <CardBotao
                    onClick={marcarAssistido}
                    src={adicionar}
                    alt="adicionar"
                  />
                  {!adicionadoNaLista && pageAtual !== pageListaDesejo ? (
                    <CardBotao
                      onClick={adicionarNaLista}
                      src={listaDesejo_img}
                      alt="icon-lista_desejo"
                    />
                  ) : (
                    <CardBotao
                      onClick={removerDaLista}
                      src={adicionado}
                      alt="icon-lista_desejo"
                    />
                  )}
                </>
              )}

              <CardLink to={`/${tipo}/${id}`}>
                <CardBotao src={detalhes} alt="more" />
              </CardLink>
            </CardContainerInfos>
          </CardDivInfos>
        </CardComponent>
      )}
    </>
  );
};

export default Card;
