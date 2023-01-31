import React from "react";
import { LinksApi } from "../../ConsultasParaApi";
import ContainerCards from "../../Components/ContainerCards/ContainerCards";

const movies = LinksApi.movies;
const key = LinksApi.key;
const traduzido = LinksApi.traduzido;

const EmBreve = () => {
  const [assistidosAgora, setAssistidosAgora] = React.useState([]);

  async function buscarApi(url) {
    const response = await fetch(url);
    const responseJson = await response.json();
    const resultadoFinal = await responseJson.results;
    setAssistidosAgora(resultadoFinal);
  }

  React.useEffect(() => {
    const listaAssistidosAgora = `${movies}upcoming?${key}${traduzido}`;
    buscarApi(listaAssistidosAgora);
  }, []);

  if (assistidosAgora === []) return null;

  return (
    <>
      {assistidosAgora && (
        <ContainerCards
          titulo={"Filmes em Breve"}
          lista={assistidosAgora}
          tipo={"filme"}
        />
      )}
    </>
  );
};
export default EmBreve;
