import React from "react";
import Footer from "../../Components/Footer/Footer";
import Header from "../../Components/Header/Header";
import { ContainerEstrutura } from "./StyleHome";
import Ficcao from "./Ficcao";
import Animacoes from "./Animacoes";
import Terror from "./Terror";
import Reality from "./Reality";
import Historia from "./Historia";
import Faroeste from "./Faroeste";
import Comedia from "./Comedia";
import Crime from "./Crime";
import Acao from "./Acao";

const Home = () => {
  return (
    <>
      <Header />
      <ContainerEstrutura>
        <Comedia />
        <Animacoes />
        <Terror />
        <Crime />
        <Historia />
        <Faroeste />
        <Ficcao />
        <Reality />
        <Acao />
      </ContainerEstrutura>
      <Footer />
    </>
  );
};
export default Home;
