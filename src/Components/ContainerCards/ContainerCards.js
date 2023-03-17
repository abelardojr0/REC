import axios from "axios";
import Carousel from "better-react-carousel";
import React from "react";
import api from "../../api";
import Login from "../../Pages/Login/Login";
import { useJwtToken } from "../../useJwtToken";
import Card from "../Card/Card";
import { ContainerCardsTituloSection } from "./StyleContainerCards";

const ContainerCards = ({ titulo, lista, tipo }) => {
  const [loginStatus, setLoginStatus] = React.useState(false);
  const [filmesBanco, setFilmesBanco] = React.useState([]);
  const [seriesBanco, setSeriesBanco] = React.useState([]);
  const [listaDesejoBanco, setListaDesejoBanco] = React.useState([]);
  const [colunas, setColunas] = React.useState(5);
  const [token] = useJwtToken();
  const cancelTokenSourceRef = React.useRef(null);

  React.useEffect(() => {
    cancelTokenSourceRef.current = axios.CancelToken.source();
    if (token) {
      if (tipo === "filme") {
        api
          .get("/filmes", { cancelToken: cancelTokenSourceRef.current.token })
          .then((response) => {
            setFilmesBanco(response.data);
          })
          .catch((error) => {
            if (axios.isCancel(error)) {
              console.log("A requisição foi cancelada pelo usuário.");
            } else {
              console.log("Ocorreu um erro durante a requisição.");
            }
          });
      } else if (tipo === "serie") {
        api
          .get("/series", { cancelToken: cancelTokenSourceRef.current.token })
          .then((response) => {
            setSeriesBanco(response.data);
          })
          .catch((error) => {
            if (axios.isCancel(error)) {
              console.log("A requisição foi cancelada pelo usuário.");
            } else {
              console.log("Ocorreu um erro durante a requisição.");
            }
          });
      }

      api
        .get("/listaDesejo", {
          cancelToken: cancelTokenSourceRef.current.token,
        })
        .then((response) => {
          setListaDesejoBanco(response.data);
        })
        .catch((error) => {
          if (axios.isCancel(error)) {
            console.log("A requisição foi cancelada pelo usuário.");
          } else {
            console.log("Ocorreu um erro durante a requisição.");
          }
        });
    }

    return () => {
      cancelTokenSourceRef.current.cancel(
        "A requisição foi cancelada pelo usuário."
      );
    };
  }, [token, tipo]);
  React.useEffect(() => {
    const largura = window.innerWidth;
    if (largura < 1000) {
      setColunas(3);
    }
  }, []);
  return (
    <>
      {loginStatus && (
        <>
          <Login setLoginStatus={setLoginStatus} />
        </>
      )}
      {tipo === "filme" && (
        <>
          <ContainerCardsTituloSection>{titulo}</ContainerCardsTituloSection>
          <Carousel cols={colunas} rows={1} gap={"20px"} loop>
            {lista &&
              lista.map((filme) => (
                <Carousel.Item key={filme.title}>
                  <Card
                    titulo={filme.title}
                    imagem={filme.poster_path}
                    nota={filme.vote_average}
                    id={filme.id}
                    tipo={"movie"}
                    setLoginStatus={setLoginStatus}
                    listaBanco={filmesBanco}
                    listaDesejoBanco={listaDesejoBanco}
                  />
                </Carousel.Item>
              ))}
          </Carousel>
        </>
      )}
      {tipo === "serie" && (
        <>
          <ContainerCardsTituloSection>{titulo}</ContainerCardsTituloSection>
          <Carousel cols={colunas} rows={1} gap={"20px"} loop>
            {lista &&
              lista.map((serie) => (
                <Carousel.Item key={serie.name}>
                  <Card
                    titulo={serie.name}
                    imagem={serie.poster_path}
                    nota={serie.vote_average}
                    id={serie.id}
                    tipo={"tv"}
                    setLoginStatus={setLoginStatus}
                    listaBanco={seriesBanco}
                    listaDesejoBanco={listaDesejoBanco}
                  />
                </Carousel.Item>
              ))}
          </Carousel>
        </>
      )}
    </>
  );
};

export default ContainerCards;
