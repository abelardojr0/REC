import React from "react";
import ContainerCards from "../../Components/ContainerCards/ContainerCards";
import { LinksApi } from "../../ConsultasParaApi";

const tv = LinksApi.tv;
const key = LinksApi.key;
const traduzido = LinksApi.traduzido;

const SeriesNoAr = () => {
  const [noAr, setNoAr] = React.useState([]);

  async function buscarApi(url) {
    const response = await fetch(url);
    const responseJson = await response.json();
    const resultadoFinal = await responseJson.results;
    setNoAr(resultadoFinal);
  }

  React.useEffect(() => {
    const listaPopulares = `${tv}airing_today?${key}${traduzido}`;
    buscarApi(listaPopulares);
  }, []);

  if (noAr === []) return null;
  return (
    <>
      {noAr && (
        <ContainerCards titulo={"Séries no Ar"} lista={noAr} tipo={"serie"} />
      )}
    </>
  );
};

export default SeriesNoAr;
