import React from "react";
import { LinksApi } from "../../ConsultasParaApi";
import {
  CardAdicionarTexto,
  CardBotao,
  CardComponent,
  CardContainerInfos,
  CardContainerNota,
  CardDivDasEstrelas,
  CardDivInfos,
  CardFavorito,
  CardImagem,
  CardTitulo,
} from "./StyleCard";
import star from "../../Images/estrela.png";
import listaDesejo from "../../Images/listaDesejo.png";
import adicionar from "../../Images/adicionar.png";
import detalhes from "../../Images/detalhes.png";
import assistido_img from "../../Images/assistido.png";
import axios from "axios";
const img = LinksApi.IMG;

const Card = ({
  titulo,
  imagem,
  nota,
  id,
  tipo,
  setLoginStatus,
  listaFilmes,
}) => {
  const [habilitando, setHabilitando] = React.useState("");
  const [assistido, setAssistido] = React.useState(false);
  const [adicionadoNaLista, setAdicionadoNaLista] = React.useState(false);
  const id_usuario = localStorage.getItem("id");

  React.useEffect(() => {
    listaFilmes.forEach((item) => {
      if (item[1] === titulo) {
        setAssistido(true);
      }
      if (item) {
      }
    });
  }, [titulo, listaFilmes]);

  function habilitandoInfos() {
    setHabilitando("ativo");
  }
  function desabilitandoInfos() {
    setHabilitando("");
  }
  function marcarAssistido() {
    if (id_usuario) {
      setLoginStatus(false);
      setAssistido(true);
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

  function adicionarNaLista() {
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
  }
  return (
    <>
      <CardComponent
        onMouseOver={habilitandoInfos}
        onMouseOut={desabilitandoInfos}
      >
        <CardImagem src={`${img}${imagem}`} alt="poster" />
        <CardDivInfos className={habilitando}>
          <CardDivDasEstrelas>
            <CardContainerNota>
              <img src={star} alt="star" />
              <p>{nota}</p>
            </CardContainerNota>
          </CardDivDasEstrelas>
          <CardTitulo to={`/${tipo}/${id}`}>{titulo}</CardTitulo>
          <CardContainerInfos>
            <CardBotao>
              {assistido ? (
                <img src={assistido_img} alt="icon-assistido" />
              ) : (
                <>
                  <CardAdicionarTexto onClick={marcarAssistido}>
                    <img src={adicionar} alt="adicionar" />
                  </CardAdicionarTexto>
                </>
              )}
            </CardBotao>
            {!adicionadoNaLista && (
              <CardBotao onClick={adicionarNaLista}>
                <img src={listaDesejo} alt="icon-lista_desejo" />
              </CardBotao>
            )}
            <CardBotao to={`/${tipo}/${id}`}>
              <img src={detalhes} alt="more" />
            </CardBotao>
          </CardContainerInfos>
        </CardDivInfos>
      </CardComponent>
    </>
  );
};

export default Card;
