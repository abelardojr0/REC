import React from "react";
import { LinksApi } from "../../ConsultasParaApi";
import ContainerCards from "../../Components/ContainerCards/ContainerCards";

const discoverFilmes = LinksApi.discoverMovie;
const key = LinksApi.key;
const traduzido = LinksApi.traduzido;

const Acao = () => {
  const [filmesAcao, setFilmesAcao] = React.useState([]);

  async function buscarFilmes(url) {
    const response = await fetch(url);
    const responseJson = await response.json();
    const responseFinal = await responseJson.results;
    setFilmesAcao(responseFinal);
  }

  React.useEffect(() => {
    const listaFilmes = `${discoverFilmes}${key}&with_genres=28${traduzido}`;
    buscarFilmes(listaFilmes);
  }, []);

  if (filmesAcao === []) return null;
  return (
    <>
      {filmesAcao && (
        <ContainerCards
          titulo={"Filmes de Ação"}
          lista={filmesAcao}
          tipo={"filme"}
        />
      )}
    </>
  );
};

export default Acao;
