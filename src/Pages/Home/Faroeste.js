import React from "react";
import { LinksApi } from "../../ConsultasParaApi";
import ContainerCards from "../../Components/ContainerCards/ContainerCards";

const discoverSeries = LinksApi.discoverTv;
const key = LinksApi.key;
const traduzido = LinksApi.traduzido;

const Faroeste = () => {
  const [seriesFaroeste, setSeriesFaroeste] = React.useState([]);

  async function buscarFilmes(url) {
    const response = await fetch(url);
    const responseJson = await response.json();
    const responseFinal = await responseJson.results;
    setSeriesFaroeste(responseFinal);
  }

  React.useEffect(() => {
    const listaFilmes = `${discoverSeries}${key}&with_genres=37${traduzido}`;
    buscarFilmes(listaFilmes);
  }, []);

  if (seriesFaroeste === []) return null;
  return (
    <>
      {seriesFaroeste && (
        <ContainerCards
          titulo={"Séries sobre Faroeste"}
          lista={seriesFaroeste}
          tipo={"serie"}
        />
      )}
    </>
  );
};

export default Faroeste;
