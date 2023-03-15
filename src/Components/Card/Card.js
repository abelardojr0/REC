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

import axios from "axios";
const img = LinksApi.IMG;

const Card = ({
  titulo,
  imagem,
  nota,
  id,
  tipo,
  setLoginStatus,
  listaBanco,
  listaDeDesejo,
  listaDesejoBanco,
}) => {
  const [habilitando, setHabilitando] = React.useState("");
  const [assistido, setAssistido] = React.useState(false);
  const [adicionadoNaLista, setAdicionadoNaLista] = React.useState(false);
  const [visivel, setVisivel] = React.useState(true);

  const id_usuario = localStorage.getItem("id");

  React.useEffect(() => {
    if (!listaDeDesejo) {
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
  }, [titulo, listaBanco, listaDeDesejo, listaDesejoBanco]);

  function habilitandoInfos() {
    setHabilitando("ativo");
  }
  function desabilitandoInfos() {
    setHabilitando("");
  }
  function marcarAssistido() {
    if (id_usuario) {
      if (setLoginStatus) {
        setLoginStatus(false);
      }
      setAssistido(true);
      axios
        .post("http://localhost:5000/removerListaDesejo", {
          titulo,
          id_usuario,
        })
        .then((response) => {
          console.log(response);
          if (window.location.href === "http://localhost:3000/listaDesejo") {
            setVisivel(false);
          }
        })
        .catch((error) => {
          console.log(error);
        });
      if (tipo === "movie") {
        axios
          .post("http://localhost:5000/inserirFilme", {
            titulo,
            imagem,
            nota,
            tipo,
            id_api: id,
            id_usuario,
          })
          .then((response) => {
            console.log(response);
          })
          .catch((error) => {
            console.log(error);
          });
      } else {
        axios
          .post("http://localhost:5000/inserirSerie", {
            titulo,
            imagem,
            nota,
            tipo,
            id_api: id,
            id_usuario,
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
  }

  function desmarcarAssistido() {
    setAssistido(false);
    if (tipo === "movie") {
      if (window.location.href === "http://localhost:3000/meusFilmes") {
        setVisivel(false);
      }
      axios
        .post("http://localhost:5000/removerFilme", {
          titulo,
          id_usuario,
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
      axios
        .post("http://localhost:5000/removerSerie", {
          titulo,
          id_usuario,
        })
        .then((response) => {
          console.log(response);
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }
  function adicionarNaLista() {
    if (id_usuario) {
      setAdicionadoNaLista(true);
      axios
        .post("http://localhost:5000/inserirListaDesejo", {
          titulo,
          imagem,
          nota,
          tipo,
          id_api: id,
          id_usuario,
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
  }
  function removerDaLista() {
    setAdicionadoNaLista(false);
    axios
      .post("http://localhost:5000/removerListaDesejo", {
        titulo,
        id_usuario,
      })
      .then((response) => {
        console.log(response.data);
        if (window.location.href === "http://localhost:3000/listaDesejo") {
          setVisivel(false);
        }
      })
      .catch((error) => {
        console.log(error);
      });
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
                  {!adicionadoNaLista && !listaDeDesejo ? (
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
