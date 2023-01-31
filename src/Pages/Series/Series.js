import React from "react";
import Footer from "../../Components/Footer/Footer";
import Header from "../../Components/Header/Header";
import SeriesPopulares from "./SeriesPopulares";
import SeriesNoAr from "./SeriesNoAr";
import SeriesMaioresNotas from "./SeriesMaioresNotas";
import { ContainerEstrutura } from "../Home/StyleHome";
import BarraCategorias from "../../Components/BarraCategorias/BarraCategorias";
const Series = () => {
  return (
    <>
      <Header />
      <BarraCategorias tipo={"tv"} cat={"categoriaSeries"} />
      <ContainerEstrutura>
        <SeriesPopulares />
        <SeriesNoAr />
        <SeriesMaioresNotas />
      </ContainerEstrutura>
      <Footer />
    </>
  );
};

export default Series;
