import Carousel from "better-react-carousel";
import React from "react";
import Card from "../Card/Card";
import { ContainerCardsTituloSection } from "./StyleContainerCards";

const ContainerCards = ({ titulo, lista, tipo }) => {
  return (
    <>
      {tipo === "filme" && (
        <>
          <ContainerCardsTituloSection>{titulo}</ContainerCardsTituloSection>
          <Carousel cols={6} rows={1} gap={"20px"} loop>
            {lista &&
              lista.map((filme) => (
                <Carousel.Item>
                  <Card
                    titulo={filme.title}
                    imagem={filme.poster_path}
                    nota={filme.vote_average}
                    id={filme.id}
                    tipo={"movie"}
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
                <Carousel.Item>
                  <Card
                    titulo={serie.name}
                    imagem={serie.poster_path}
                    nota={serie.vote_average}
                    id={serie.id}
                    tipo={"tv"}
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
