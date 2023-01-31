import React from "react";
import { LinksApi } from "../../ConsultasParaApi";
import {
  CardAdicionar,
  CardAdicionarTexto,
  CardComponent,
  CardContainerInfos,
  CardContainerNota,
  CardDetalhes,
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

const img = LinksApi.IMG;

const Card = ({ titulo, imagem, nota, id, tipo }) => {
  const [habilitando, setHabilitando] = React.useState("");

  function habilitandoInfos() {
    setHabilitando("ativo");
  }
  function desabilitandoInfos() {
    setHabilitando("");
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
            <CardAdicionar>
              <img src={adicionar} alt="adicionar" />
              <CardAdicionarTexto>Assistidos</CardAdicionarTexto>
            </CardAdicionar>
            <CardDetalhes to={`/${tipo}/${id}`}>
              <img src={detalhes} alt="more" />
              Detalhes
            </CardDetalhes>
          </CardContainerInfos>
        </CardDivInfos>
      </CardComponent>
    </>
  );
};

export default Card;
