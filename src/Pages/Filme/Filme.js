import React from "react";
import { useParams } from "react-router-dom";
import FilmeDetalhes from "../../Components/FilmeDetalhes/FilmeDetalhes";
import Header from "../../Components/Header/Header";
import Footer from "../../Components/Footer/Footer";
import { LinksApi } from "../../ConsultasParaApi";
import ContainerCards from "../../Components/ContainerCards/ContainerCards";

const movies = LinksApi.movies;
const key = LinksApi.key;

const Filme = () => {
  const { id } = useParams();
  const [filme, setFilme] = React.useState(null);
  const [similares, setSimilares] = React.useState(null);
  const [recomendacoes, setRecomendacoes] = React.useState(null);

  async function buscarApi(url) {
    const response = await fetch(url);
    const responseJson = await response.json();
    setFilme(responseJson);
  }

  async function buscarSimilares(url) {
    const response = await fetch(url);
    const responseJson = await response.json();
    const resultadoFinal = await responseJson.results;
    if (resultadoFinal.length === 0) {
      setSimilares(false);
    } else {
      setSimilares(resultadoFinal);
    }
  }

  async function buscarRecomendacoes(url) {
    const response = await fetch(url);
    const responseJson = await response.json();
    const resultadoFinal = await responseJson.results;
    if (resultadoFinal.length === 0) {
      setRecomendacoes(false);
    } else {
      setRecomendacoes(resultadoFinal);
    }
  }

  React.useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
    const filmeBuscado = `${movies}${id}?${key}&language=pt-BR`;
    buscarApi(filmeBuscado);

    const listaSimilares = `${movies}${id}/similar?${key}&language=pt-BR`;
    buscarSimilares(listaSimilares);

    const listaRecomendacoes = `${movies}${id}/recommendations?${key}&language=pt-BR`;
    buscarRecomendacoes(listaRecomendacoes);
  }, [id]);

  const formatarValores = (valor) => {
    return valor.toLocaleString("en-US", {
      style: "currency",
      currency: "USD",
    });
  };
  const formatarAno = (data) => {
    return data.slice(0, 4);
  };

  if (filme === null || similares === null || recomendacoes === null)
    return null;

  return (
    <>
      <Header />
      {filme && (
        <>
          <FilmeDetalhes
            id={filme.id}
            titulo={filme.title}
            imagem={filme.poster_path}
            nota={filme.vote_average.toFixed(2)}
            lancamento={formatarAno(filme.release_date)}
            orcamento={formatarValores(filme.budget)}
            receita={formatarValores(filme.revenue)}
            generos={filme.genres}
            produtoras={filme.production_companies}
            sinopse={filme.overview}
            duracao={filme.runtime}
          />
          <div style={{ width: "85%" }}>
            {similares && (
              <ContainerCards
                titulo={"Similares"}
                lista={similares}
                tipo={"filme"}
              />
            )}
            {recomendacoes && (
              <ContainerCards
                titulo={"Recomendações"}
                lista={recomendacoes}
                tipo={"filme"}
              />
            )}
          </div>
        </>
      )}
      <Footer />
    </>
  );
};

export default Filme;
