import axios from "axios";
import Carousel from "better-react-carousel";
import React from "react";
import Login from "../../Pages/Login/Login";
import Card from "../Card/Card";
import { ContainerCardsTituloSection } from "./StyleContainerCards";

const ContainerCards = ({ titulo, lista, tipo }) => {
  const [loginStatus, setLoginStatus] = React.useState(false);
  const [filmesBanco, setFilmesBanco] = React.useState([]);
  const [seriesBanco, setSeriesBanco] = React.useState([]);
  const [listaDesejoBanco, setListaDesejoBanco] = React.useState([]);
  const id_usuario = localStorage.getItem("id");

  React.useEffect(() => {
    if (id_usuario) {
      axios
        .get("http://localhost:5000/filmes/" + id_usuario)
        .then((response) => {
          setFilmesBanco(response.data);
        });
    }
  }, [id_usuario]);
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
          <Carousel cols={6} rows={1} gap={"20px"} loop>
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
                  />
                </Carousel.Item>
              ))}
          </Carousel>
        </>
      )}
      {tipo === "serie" && (
        <>
          <ContainerCardsTituloSection>{titulo}</ContainerCardsTituloSection>
          <Carousel cols={6} rows={1} gap={"20px"} loop>
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
                    listaBanco={filmesBanco}
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
