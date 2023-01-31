import React from "react";
import { useSearchParams } from "react-router-dom";
import Card from "../../Components/Card/Card";
import Footer from "../../Components/Footer/Footer";
import Header from "../../Components/Header/Header";
import { LinksApi } from "../../ConsultasParaApi";
import BarraCategorias from "../../Components/BarraCategorias/BarraCategorias";

import {
  ResultadoContainer,
  ResultadoConteudo,
  ResultadoLista,
  ResultadoTitulo,
  ResultadoTituloQuery,
} from "../Search/StyleSearch";

const discoverFilmes = LinksApi.discoverMovie;
const key = LinksApi.key;
const traduzido = LinksApi.traduzido;

const CategoriaFilmes = () => {
  const [searchParams] = useSearchParams();
  const query = searchParams.get("q");
  const tituloCat = searchParams.get("t");
  const [categoriaFilmes, setCategoriaFilmes] = React.useState([]);

  async function buscarFilmes(url) {
    const response = await fetch(url);
    const responseJson = await response.json();
    const responseFinal = await responseJson.results;
    setCategoriaFilmes(responseFinal);
  }

  React.useEffect(() => {
    const listaFilmes = `${discoverFilmes}${key}&with_genres=${query}${traduzido}`;
    buscarFilmes(listaFilmes);
  }, [query]);

  if (categoriaFilmes === []) return null;
  return (
    <>
      <Header />
      <BarraCategorias tipo={"movie"} cat={"categoriaFilmes"} />
      <ResultadoContainer>
        <ResultadoConteudo>
          <ResultadoTitulo>
            Resultado para a categoria:{" "}
            <ResultadoTituloQuery>{tituloCat}</ResultadoTituloQuery>
          </ResultadoTitulo>
          <ResultadoLista>
            {categoriaFilmes &&
              categoriaFilmes.map((item) => (
                <li key={item.id}>
                  <Card
                    titulo={item.title}
                    imagem={item.poster_path}
                    nota={item.vote_average}
                    id={item.id}
                    tipo={item.media_type}
                  />
                </li>
              ))}
          </ResultadoLista>
        </ResultadoConteudo>
      </ResultadoContainer>
      <Footer />
    </>
  );
};

export default CategoriaFilmes;
