import React from "react";
import ContainerCards from "../../Components/ContainerCards/ContainerCards";
import { LinksApi } from "../../ConsultasParaApi";
import { ClipLoader } from "react-spinners";
import { ContainerCarregando } from "../../GlobalStyles";

const movies = LinksApi.movies;
const key = LinksApi.key;
const traduzido = LinksApi.traduzido;

const Populares = () => {
  const [popularesFilmes, setPopularesFilmes] = React.useState([]);
  const [carregando, setCarregando] = React.useState(true);

  async function buscarApi(url) {
    const response = await fetch(url);
    const responseJson = await response.json();
    const resultadoFinal = await responseJson.results;
    setPopularesFilmes(resultadoFinal);
    setTimeout(() => {
      setCarregando(false);
    }, 2000);
  }

  React.useEffect(() => {
    const listaPopulares = `${movies}popular?${key}${traduzido}`;
    buscarApi(listaPopulares);
  }, []);

  if (popularesFilmes === []) return null;
  return (
    <>
      {carregando && (
        <>
          <ContainerCarregando>
            <ClipLoader size={100} />
          </ContainerCarregando>
        </>
      )}
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
