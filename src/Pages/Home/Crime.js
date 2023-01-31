import React from "react";
import { LinksApi } from "../../ConsultasParaApi";
import ContainerCards from "../../Components/ContainerCards/ContainerCards";

const discoverSeries = LinksApi.discoverTv;
const key = LinksApi.key;
const traduzido = LinksApi.traduzido;

const Crime = () => {
  const [seriesCrime, setSeriesCrime] = React.useState([]);

  async function buscarFilmes(url) {
    const response = await fetch(url);
    const responseJson = await response.json();
    const responseFinal = await responseJson.results;
    setSeriesCrime(responseFinal);
  }

  React.useEffect(() => {
    const listaFilmes = `${discoverSeries}${key}&with_genres=80${traduzido}`;
    buscarFilmes(listaFilmes);
  }, []);

  if (seriesCrime === []) return null;
  return (
    <>
      {seriesCrime && (
        <ContainerCards
          titulo={"Séries Criminais"}
          lista={seriesCrime}
          tipo={"serie"}
        />
      )}
    </>
  );
};

export default Crime;
