import React from "react";
import Footer from "../../Components/Footer/Footer";
import Header from "../../Components/Header/Header";
import SeriesPopulares from "./SeriesPopulares";
import SeriesNoAr from "./SeriesNoAr";
import SeriesMaioresNotas from "./SeriesMaioresNotas";
import BarraCategorias from "../../Components/BarraCategorias/BarraCategorias";
import { ContainerPages } from "../../GlobalStyles";
const Series = () => {
  return (
    <>
      <Header />
      <BarraCategorias tipo={"tv"} cat={"categoriaSeries"} />
      <ContainerPages>
        <SeriesPopulares />
        <SeriesNoAr />
        <SeriesMaioresNotas />
      </ContainerPages>
      <Footer />
    </>
  );
};

export default Series;
