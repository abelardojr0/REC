import React from "react";
import { LinksApi } from "../../ConsultasParaApi";
import ContainerCards from "../../Components/ContainerCards/ContainerCards";

const discoverFilmes = LinksApi.discoverMovie;
const key = LinksApi.key;
const traduzido = LinksApi.traduzido;

const Comedia = () => {
  const [filmesComedia, setFilmesComedia] = React.useState([]);

  async function buscarFilmes(url) {
    const response = await fetch(url);
    const responseJson = await response.json();
    const responseFinal = await responseJson.results;
    setFilmesComedia(responseFinal);
  }

  React.useEffect(() => {
    const listaFilmes = `${discoverFilmes}${key}&with_genres=35${traduzido}`;
    buscarFilmes(listaFilmes);
  }, []);

  if (filmesComedia === []) return null;
  return (
    <>
      {filmesComedia && (
        <ContainerCards
          titulo={"Filmes de Comédia"}
          lista={filmesComedia}
          tipo={"filme"}
        />
      )}
    </>
  );
};

export default Comedia;
