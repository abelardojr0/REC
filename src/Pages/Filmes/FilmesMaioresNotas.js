import React from "react";
import { LinksApi } from "../../ConsultasParaApi";
import ContainerCards from "../../Components/ContainerCards/ContainerCards";

const movies = LinksApi.movies;
const key = LinksApi.key;
const traduzido = LinksApi.traduzido;

const Populares = () => {
  const [topFilmes, setTopFilmes] = React.useState([]);

  async function buscarApi(url) {
    const response = await fetch(url);
    const responseJson = await response.json();
    const resultadoFinal = await responseJson.results;
    setTopFilmes(resultadoFinal);
  }

  React.useEffect(() => {
    const listaTop = `${movies}top_rated?${key}${traduzido}`;
    buscarApi(listaTop);
  }, []);

  if (topFilmes === []) return null;

  return (
    <>
      {topFilmes && (
        <ContainerCards
          titulo={"Filmes com as maiores notas"}
          lista={topFilmes}
          tipo={"filme"}
        />
      )}
    </>
  );
};
export default Populares;
