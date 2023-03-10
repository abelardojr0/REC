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
  CardImagem,
  CardLink,
  CardTitulo,
} from "./StyleCard";
import star from "../../Images/estrela.png";
import listaDesejo_img from "../../Images/listaDesejo.png";
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
            setAdicionadoNaLista(true);
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
        .get("http://localhost:5000/listaDesejo/" + id_usuario)
        .then((response) => {
          response.data.forEach((item) => {
            if (item[1] === titulo) {
              axios
                .post("http://localhost:5000/removerListaDesejo", {
                  id: item[0],
                })
                .then((response) => {
                  console.log(response);
                  if (
                    window.location.href === "http://localhost:3000/listaDesejo"
                  ) {
                    setVisivel(false);
                  }
                })
                .catch((error) => {
                  console.log(error);
                });
            }
          });
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
      {visivel && (
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
              {!adicionadoNaLista && !listaDeDesejo && (
                <CardBotao onClick={adicionarNaLista}>
                  <img src={listaDesejo_img} alt="icon-lista_desejo" />
                </CardBotao>
              )}
              <CardLink to={`/${tipo}/${id}`}>
                <img src={detalhes} alt="more" />
              </CardLink>
            </CardContainerInfos>
          </CardDivInfos>
        </CardComponent>
      )}
    </>
  );
};

export default Card;
