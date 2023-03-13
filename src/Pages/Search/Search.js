import React from "react";
import { useSearchParams } from "react-router-dom";
import Footer from "../../Components/Footer/Footer";
import Header from "../../Components/Header/Header";

import { LinksApi } from "../../ConsultasParaApi";

import {
  ResultadoContainer,
  ResultadoConteudo,
  ResultadoLista,
  ResultadoTitulo,
  ResultadoTituloQuery,
} from "./StyleSearch";
import Card from "../../Components/Card/Card";
import axios from "axios";
import Login from "../Login/Login";
import { ContainerCarregando } from "../../GlobalStyles";
import { ClipLoader } from "react-spinners";

const key = LinksApi.key;
const searchFilme = LinksApi.searchMovie;
const searchSerie = LinksApi.searchTv;

const Search = () => {
  const [searchParams] = useSearchParams();
  const query = searchParams.get("q");
  const [searchFilmes, setSearchFilmes] = React.useState([]);
  const [searchSeries, setSearchSeries] = React.useState([]);
  const [loginStatus, setLoginStatus] = React.useState(false);
  const [listaBanco, setListaBanco] = React.useState([]);
  const [carregandoFilmes, setCarregandoFilmes] = React.useState(true);
  const [carregandoSeries, setCarregandoSeries] = React.useState(true);
  const id_usuario = localStorage.getItem("id");

  async function buscarFilme(url) {
    const response = await fetch(url);
    const responseJson = await response.json();
    const resultadoFinal = await responseJson.results;
    setSearchFilmes(resultadoFinal);
    setCarregandoFilmes(false);
  }

  async function buscarSerie(url) {
    const response = await fetch(url);
    const responseJson = await response.json();
    const resultadoFinal = await responseJson.results;
    setSearchSeries(resultadoFinal);
    setCarregandoSeries(false);
  }

  React.useEffect(() => {
    const listaFilmes = `${searchFilme}?${key}&query=${query}&language=pt-BR`;
    buscarFilme(listaFilmes);
    const listaSeries = `${searchSerie}?${key}&query=${query}&language=pt-BR`;
    buscarSerie(listaSeries);
  }, [query]);

  React.useEffect(() => {
    if (id_usuario) {
      axios
        .get("http://localhost:5000/filmes/" + id_usuario)
        .then((response) => {
          setListaBanco(response.data);
        });
    }
  }, [id_usuario]);

  return (
    <>
      <Header />
      {loginStatus && (
        <>
          <Login setLoginStatus={setLoginStatus} />
        </>
      )}
      {carregandoFilmes && carregandoSeries ? (
        <>
          <ContainerCarregando>
            <ClipLoader size={100} />
          </ContainerCarregando>
        </>
      ) : (
        <ResultadoContainer>
          <ResultadoConteudo>
            <ResultadoTitulo>
              Resultados para:{" "}
              <ResultadoTituloQuery>{query}</ResultadoTituloQuery>{" "}
            </ResultadoTitulo>
            <ResultadoLista>
              {searchFilmes &&
                searchFilmes.map((filme) => (
                  <li key={filme.title}>
                    <Card
                      titulo={filme.title}
                      imagem={filme.poster_path}
                      nota={filme.vote_average}
                      id={filme.id}
                      tipo={"movie"}
                      setLoginStatus={setLoginStatus}
                      listaBanco={listaBanco}
                    />
                  </li>
                ))}
              {searchSeries &&
                searchSeries.map((serie) => (
                  <li key={serie.name}>
                    <Card
                      titulo={serie.name}
                      imagem={serie.poster_path}
                      nota={serie.vote_average}
                      id={serie.id}
                      tipo={"tv"}
                      setLoginStatus={setLoginStatus}
                      listaBanco={listaBanco}
                    />
                  </li>
                ))}
            </ResultadoLista>
          </ResultadoConteudo>
        </ResultadoContainer>
      )}

      <Footer />
    </>
  );
};

export default Search;
