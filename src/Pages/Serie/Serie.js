import React from "react";
import { useParams } from "react-router-dom";
import SerieDetalhes from "../../Components/SerieDetalhes/SerieDetalhes";
import Header from "../../Components/Header/Header";
import Footer from "../../Components/Footer/Footer";
import { LinksApi } from "../../ConsultasParaApi";
import ContainerCards from "../../Components/ContainerCards/ContainerCards";

const tv = LinksApi.tv;
const key = LinksApi.key;

const Serie = () => {
  const { id } = useParams();
  const [serie, setSerie] = React.useState(null);
  const [similares, setSimilares] = React.useState(null);
  const [recomendacoes, setRecomendacoes] = React.useState(null);

  async function buscarApi(url) {
    const response = await fetch(url);
    const responseJson = await response.json();
    setSerie(responseJson);
  }

  async function buscarSimilares(url) {
    const response = await fetch(url);
    const responseJson = await response.json();
    const resultadoFinal = await responseJson.results;
    setSimilares(resultadoFinal);
  }

  async function buscarRecomendacoes(url) {
    const response = await fetch(url);
    const responseJson = await response.json();
    const resultadoFinal = await responseJson.results;
    setRecomendacoes(resultadoFinal);
  }

  React.useEffect(() => {
    window.scrollTo({
      top: 230,
      behavior: "smooth",
    });
    const filmeBuscado = `${tv}${id}?${key}&language=pt-BR`;
    buscarApi(filmeBuscado);

    const listaSimilares = `${tv}${id}/similar?${key}&language=pt-BR`;
    buscarSimilares(listaSimilares);

    const listaRecomendacoes = `${tv}${id}/recommendations?${key}&language=pt-BR`;
    buscarRecomendacoes(listaRecomendacoes);
  }, [id]);

  const formatarAno = (data) => {
    return data.slice(0, 4);
  };

  if (serie === null || similares === null || recomendacoes === null)
    return null;
  return (
    <>
      <Header />
      {serie && (
        <>
          <SerieDetalhes
            nome={serie.name}
            imagem={serie.poster_path}
            nota={serie.vote_average.toFixed(2)}
            lancamento={formatarAno(serie.first_air_date)}
            episodios={serie.number_of_episodes}
            temporadas={serie.number_of_seasons}
            generos={serie.genres}
            produtoras={serie.production_companies}
            criadores={serie.created_by}
            sinopse={serie.overview}
          />
          {similares && recomendacoes && (
            <>
              <ContainerCards
                titulo={"Similares"}
                lista={similares}
                tipo={"serie"}
              />
              <ContainerCards
                titulo={"Recomendações"}
                lista={recomendacoes}
                tipo={"serie"}
              />
            </>
          )}
        </>
      )}
      <Footer />
    </>
  );
};

export default Serie;
