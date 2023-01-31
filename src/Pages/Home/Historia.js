import React from "react";
import { LinksApi } from "../../ConsultasParaApi";
import ContainerCards from "../../Components/ContainerCards/ContainerCards";

const discoverFilmes = LinksApi.discoverMovie;
const key = LinksApi.key;
const traduzido = LinksApi.traduzido;

const Historia = () => {
  const [filmesHistoria, setFilmesHistoria] = React.useState([]);

  async function buscarFilmes(url) {
    const response = await fetch(url);
    const responseJson = await response.json();
    const responseFinal = await responseJson.results;
    setFilmesHistoria(responseFinal);
  }

  React.useEffect(() => {
    const listaFilmes = `${discoverFilmes}${key}&with_genres=36${traduzido}`;
    buscarFilmes(listaFilmes);
  }, []);

  if (filmesHistoria === []) return null;
  return (
    <>
      {filmesHistoria && (
        <ContainerCards
          titulo={"Filmes sobre História"}
          lista={filmesHistoria}
          tipo={"filme"}
        />
      )}
    </>
  );
};

export default Historia;
