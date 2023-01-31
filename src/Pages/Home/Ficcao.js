import React from "react";
import { LinksApi } from "../../ConsultasParaApi";
import ContainerCards from "../../Components/ContainerCards/ContainerCards";

const discoverFilmes = LinksApi.discoverMovie;
const key = LinksApi.key;
const traduzido = LinksApi.traduzido;

const Ficcao = () => {
  const [filmesFiccao, setFilmesFiccao] = React.useState([]);

  async function buscarFilmes(url) {
    const response = await fetch(url);
    const responseJson = await response.json();
    const responseFinal = await responseJson.results;
    setFilmesFiccao(responseFinal);
  }

  React.useEffect(() => {
    const listaFilmes = `${discoverFilmes}${key}&with_genres=878${traduzido}`;
    buscarFilmes(listaFilmes);
  }, []);

  if (filmesFiccao === []) return null;
  return (
    <>
      {filmesFiccao && (
        <ContainerCards
          titulo={"Filmes de Ficção Ciêntifica"}
          lista={filmesFiccao}
          tipo={"filme"}
        />
      )}
    </>
  );
};

export default Ficcao;
