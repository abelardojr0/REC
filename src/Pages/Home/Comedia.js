import React from "react";
import { LinksApi } from "../../ConsultasParaApi";
import ContainerCards from "../../Components/ContainerCards/ContainerCards";
import { ClipLoader } from "react-spinners";
import { ContainerCarregando } from "../../GlobalStyles";

const discoverFilmes = LinksApi.discoverMovie;
const key = LinksApi.key;
const traduzido = LinksApi.traduzido;

const Comedia = () => {
  const [filmesComedia, setFilmesComedia] = React.useState([]);
  const [carregando, setCarregando] = React.useState(true);

  async function buscarFilmes(url) {
    const response = await fetch(url);
    const responseJson = await response.json();
    const responseFinal = await responseJson.results;
    setFilmesComedia(responseFinal);
    setTimeout(() => {
      setCarregando(false);
    }, 500);
  }

  React.useEffect(() => {
    const listaFilmes = `${discoverFilmes}${key}&with_genres=35${traduzido}`;
    buscarFilmes(listaFilmes);
  }, []);

  if (filmesComedia === []) return null;
  return (
    <>
      {carregando && (
        <>
          <ContainerCarregando>
            <ClipLoader size={100} />
          </ContainerCarregando>
        </>
      )}
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
