import React from "react";
import ContainerCards from "../../Components/ContainerCards/ContainerCards";
import { LinksApi } from "../../ConsultasParaApi";

const tv = LinksApi.tv;
const key = LinksApi.key;
const traduzido = LinksApi.traduzido;

const SeriesPopulares = () => {
  const [popularesSeries, setPopularesSeries] = React.useState([]);

  async function buscarApi(url) {
    const response = await fetch(url);
    const responseJson = await response.json();
    const resultadoFinal = await responseJson.results;
    setPopularesSeries(resultadoFinal);
  }

  React.useEffect(() => {
    const listaPopulares = `${tv}popular?${key}${traduzido}`;
    buscarApi(listaPopulares);
  }, []);

  if (popularesSeries === []) return null;
  return (
    <>
      {popularesSeries && (
        <ContainerCards
          titulo={"Séries populares"}
          lista={popularesSeries}
          tipo={"serie"}
        />
      )}
    </>
  );
};

export default SeriesPopulares;
