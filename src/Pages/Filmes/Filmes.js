import React from "react";
import Footer from "../../Components/Footer/Footer";
import Header from "../../Components/Header/Header";
import FilmesPopulares from "./FilmesPopulares";
import FilmesEmBreve from "./FilmesEmBreve";
import FilmesEmCartaz from "./FilmesEmCartaz";
import FilmesMaioresNotas from "./FilmesMaioresNotas";
import { ContainerEstrutura } from "../Home/StyleHome";
import BarraCategorias from "../../Components/BarraCategorias/BarraCategorias";
const Filmes = () => {
  return (
    <>
      <Header />
      <BarraCategorias tipo={"movie"} cat={"categoriaFilmes"} />
      <ContainerEstrutura>
        <FilmesPopulares />
        <FilmesEmCartaz />
        <FilmesEmBreve />
        <FilmesMaioresNotas />
      </ContainerEstrutura>
      <Footer />
    </>
  );
};

export default Filmes;
