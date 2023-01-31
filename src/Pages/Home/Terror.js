import React from "react";
import { LinksApi } from "../../ConsultasParaApi";
import ContainerCards from "../../Components/ContainerCards/ContainerCards";

const discoverFilmes = LinksApi.discoverMovie;
const key = LinksApi.key;
const traduzido = LinksApi.traduzido;

const Terror = () => {
  const [filmesTerror, setFilmesTerror] = React.useState([]);

  async function buscarFilmes(url) {
    const response = await fetch(url);
    const responseJson = await response.json();
    const responseFinal = await responseJson.results;
    setFilmesTerror(responseFinal);
  }

  React.useEffect(() => {
    const listaFilmes = `${discoverFilmes}${key}&with_genres=27${traduzido}`;
    buscarFilmes(listaFilmes);
  }, []);

  if (filmesTerror === []) return null;
  return (
    <>
      {filmesTerror && (
        <ContainerCards
          titulo={"Filmes de Terror"}
          lista={filmesTerror}
          tipo={"filme"}
        />
      )}
    </>
  );
};

export default Terror;
