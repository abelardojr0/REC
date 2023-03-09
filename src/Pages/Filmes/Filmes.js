import React from "react";
import Footer from "../../Components/Footer/Footer";
import Header from "../../Components/Header/Header";
import FilmesPopulares from "./FilmesPopulares";
import FilmesEmBreve from "./FilmesEmBreve";
import FilmesEmCartaz from "./FilmesEmCartaz";
import FilmesMaioresNotas from "./FilmesMaioresNotas";
import BarraCategorias from "../../Components/BarraCategorias/BarraCategorias";
import { ContainerPages } from "../../GlobalStyles";
const Filmes = () => {
  return (
    <>
      <Header />
      <BarraCategorias tipo={"movie"} cat={"categoriaFilmes"} />
      <ContainerPages>
        <FilmesPopulares />
        <FilmesEmCartaz />
        <FilmesEmBreve />
        <FilmesMaioresNotas />
      </ContainerPages>
      <Footer />
    </>
  );
};

export default Filmes;
