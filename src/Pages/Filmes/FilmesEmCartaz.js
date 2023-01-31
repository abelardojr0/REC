import React from "react";
import { LinksApi } from "../../ConsultasParaApi";
import ContainerCards from "../../Components/ContainerCards/ContainerCards";

const movies = LinksApi.movies;
const key = LinksApi.key;
const traduzido = LinksApi.traduzido;

const EmCartaz = () => {
  const [cartaz, setCartaz] = React.useState([]);

  async function buscarApi(url) {
    const response = await fetch(url);
    const responseJson = await response.json();
    const resultadoFinal = await responseJson.results;
    setCartaz(resultadoFinal);
  }

  React.useEffect(() => {
    const listaCartaz = `${movies}now_playing?${key}${traduzido}&page=2`;
    buscarApi(listaCartaz);
  }, []);

  if (cartaz === []) return null;

  return (
    <>
      {cartaz && (
        <ContainerCards
          titulo={"Filmes em Cartaz"}
          lista={cartaz}
          tipo={"filme"}
        />
      )}
    </>
  );
};
export default EmCartaz;
