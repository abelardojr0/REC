import React from "react";
import { LinksApi } from "../../ConsultasParaApi";
import ContainerCards from "../../Components/ContainerCards/ContainerCards";

const discoverSeries = LinksApi.discoverTv;
const key = LinksApi.key;
const traduzido = LinksApi.traduzido;

const Reality = () => {
  const [seriesReality, setSeriesReality] = React.useState([]);

  async function buscarFilmes(url) {
    const response = await fetch(url);
    const responseJson = await response.json();
    const responseFinal = await responseJson.results;
    setSeriesReality(responseFinal);
  }

  React.useEffect(() => {
    const listaFilmes = `${discoverSeries}${key}&with_genres=10764${traduzido}`;
    buscarFilmes(listaFilmes);
  }, []);

  if (seriesReality === []) return null;
  return (
    <>
      {seriesReality && (
        <ContainerCards
          titulo={"Reality Show"}
          lista={seriesReality}
          tipo={"serie"}
        />
      )}
    </>
  );
};

export default Reality;
