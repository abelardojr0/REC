import React from "react";
import { LinksApi } from "../../ConsultasParaApi";
import ContainerCards from "../../Components/ContainerCards/ContainerCards";

const discoverSeries = LinksApi.discoverTv;
const key = LinksApi.key;
const traduzido = LinksApi.traduzido;

const Animacoes = () => {
  const [seriesAnimadas, setSeriesAnimadas] = React.useState([]);

  async function buscarFilmes(url) {
    const response = await fetch(url);
    const responseJson = await response.json();
    const responseFinal = await responseJson.results;
    setSeriesAnimadas(responseFinal);
  }

  React.useEffect(() => {
    const listaFilmes = `${discoverSeries}${key}&with_genres=16${traduzido}`;
    buscarFilmes(listaFilmes);
  }, []);

  if (seriesAnimadas === []) return null;
  return (
    <>
      {seriesAnimadas && (
        <ContainerCards
          titulo={"Séries de Animações"}
          lista={seriesAnimadas}
          tipo={"serie"}
        />
      )}
    </>
  );
};

export default Animacoes;
