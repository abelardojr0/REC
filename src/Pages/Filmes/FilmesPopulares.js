import React from "react";
import ContainerCards from "../../Components/ContainerCards/ContainerCards";
import { LinksApi } from "../../ConsultasParaApi";

const movies = LinksApi.movies;
const key = LinksApi.key;
const traduzido = LinksApi.traduzido;

const Populares = () => {
  const [popularesFilmes, setPopularesFilmes] = React.useState([]);

  async function buscarApi(url) {
    const response = await fetch(url);
    const responseJson = await response.json();
    const resultadoFinal = await responseJson.results;
    setPopularesFilmes(resultadoFinal);
  }

  React.useEffect(() => {
    const listaPopulares = `${movies}popular?${key}${traduzido}`;
    buscarApi(listaPopulares);
  }, []);

  if (popularesFilmes === []) return null;
  return (
    <>
      {popularesFilmes && (
        <ContainerCards
          titulo={"Filmes populares"}
          lista={popularesFilmes}
          tipo={"filme"}
        />
      )}
    </>
  );
};

export default Populares;
