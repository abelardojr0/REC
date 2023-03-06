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
import favorito from "../../Images/favorito.png";
import adicionar from "../../Images/adicionar.png";
import detalhes from "../../Images/detalhes.png";
import assistido_img from "../../Images/assistido.png";
import axios from "axios";
const img = LinksApi.IMG;

const Card = ({ titulo, imagem, nota, id, tipo }) => {
  const [habilitando, setHabilitando] = React.useState("");
  const [assistido, setAssistido] = React.useState(false);
  React.useEffect(() => {
    axios.get("http://localhost:5000/filmes").then((response) => {
      response.data.forEach((filme) => {
        if (filme[1] === titulo) {
          setAssistido(true);
        }
      });
    }, []);
  });
  function habilitandoInfos() {
    setHabilitando("ativo");
  }
  function desabilitandoInfos() {
    setHabilitando("");
  }
  function marcarAssistido() {
    setAssistido(true);
    axios
      .post("http://localhost:5000/inserirFilme", {
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
            <CardFavorito src={favorito} alt="favorito" />
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
