import React from "react";
import Footer from "../../Components/Footer/Footer";
import Header from "../../Components/Header/Header";
import { ContainerPagina404, Pagina404Titulo } from "./StylesPagina404";

const Pagina404 = () => {
  return (
    <>
      <Header />;
      <ContainerPagina404>
        <Pagina404Titulo>Error 404!</Pagina404Titulo>
        Página não encontrada!
      </ContainerPagina404>
      <Footer />
    </>
  );
};

export default Pagina404;
