import React from "react";
import {
  PopularAdicionar,
  PopularAdicionarTexto,
  PopularCard,
  PopularCardContainerNota,
  PopularCardImagem,
  PopularContainerConteudo,
  PopularContainerInfos,
  PopularDivDasEstrelas,
  PopularesContainer,
  PopularesContainerLista,
  PopularFavorito,
  PopularTitulo,
  PopularTituloSection,
} from "./StylePopulares";
import { LinksApi } from "../../ConsultasParaApi";
import star from "../../Images/estrela.png";
import favorito from "../../Images/favorito.png";
import adicionar from "../../Images/adicionar.png";

const movies = LinksApi.movies;
const key = LinksApi.key;
const img = LinksApi.IMG;
const Populares = () => {
  const [topFilmes, setTopFilmes] = React.useState([]);

  async function buscarApi(url) {
    const response = await fetch(url);
    const responseJson = await response.json();
    const resultadoFinal = await responseJson.results;
    let tamanhoLista = resultadoFinal.length;
    const listaFinal = resultadoFinal;
    while (tamanhoLista > 6) {
      listaFinal.pop();
      tamanhoLista--;
    }
    console.log(listaFinal);
    setTopFilmes(listaFinal);
  }

  React.useEffect(() => {
    const listaTop = `${movies}top_rated?${key}&language=pt-BR`;
    buscarApi(listaTop);
  }, []);
  if (topFilmes === []) return null;
  return (
    <PopularesContainer>
      <PopularContainerConteudo>
        <PopularTituloSection>Maiores Notas</PopularTituloSection>
        <PopularesContainerLista>
          {topFilmes &&
            topFilmes.map((filme) => (
              <li key={filme.title}>
                <PopularCard key={filme.title}>
                  <PopularCardImagem
                    src={`${img}${filme.poster_path}`}
                    alt={"poster"}
                  />
                  <PopularDivDasEstrelas>
                    <PopularCardContainerNota key={"nota"}>
                      <img src={star} alt="star" />
                      <p>{filme.vote_average}</p>
                    </PopularCardContainerNota>
                    <PopularFavorito src={favorito} alt={"favorito"} />
                  </PopularDivDasEstrelas>
                  <PopularContainerInfos>
                    <PopularTitulo>{filme.title}</PopularTitulo>
                    <PopularAdicionar>
                      <img src={adicionar} alt="adicionar" />
                      <PopularAdicionarTexto>Assistidos</PopularAdicionarTexto>
                    </PopularAdicionar>
                  </PopularContainerInfos>
                </PopularCard>
              </li>
            ))}
        </PopularesContainerLista>
      </PopularContainerConteudo>
    </PopularesContainer>
  );
};
export default Populares;
