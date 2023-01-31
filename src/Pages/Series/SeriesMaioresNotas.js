import React from "react";
import ContainerCards from "../../Components/ContainerCards/ContainerCards";
import { LinksApi } from "../../ConsultasParaApi";

const tv = LinksApi.tv;
const key = LinksApi.key;
const traduzido = LinksApi.traduzido;

const SeriesMaioresNotas = () => {
  const [seriesMaioresNotas, setSeriesMaioresNotas] = React.useState([]);

  async function buscarApi(url) {
    const response = await fetch(url);
    const responseJson = await response.json();
    const resultadoFinal = await responseJson.results;
    setSeriesMaioresNotas(resultadoFinal);
  }

  React.useEffect(() => {
    const listaPopulares = `${tv}top_rated?${key}${traduzido}`;
    buscarApi(listaPopulares);
  }, []);

  if (seriesMaioresNotas === []) return null;
  return (
    <>
      {seriesMaioresNotas && (
        <ContainerCards
          titulo={"Séries Maiores Notas"}
          lista={seriesMaioresNotas}
          tipo={"serie"}
        />
      )}
    </>
  );
};

export default SeriesMaioresNotas;
