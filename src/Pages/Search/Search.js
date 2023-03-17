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
import Login from "../Login/Login";
import { ContainerCarregando } from "../../GlobalStyles";
import { ClipLoader } from "react-spinners";
import api from "../../api";

const key = LinksApi.key;
const searchFilme = LinksApi.searchMovie;
const searchSerie = LinksApi.searchTv;

const Search = () => {
  const [searchParams] = useSearchParams();
  const query = searchParams.get("q");
  const [searchFilmes, setSearchFilmes] = React.useState([]);
  const [searchSeries, setSearchSeries] = React.useState([]);
  const [loginStatus, setLoginStatus] = React.useState(false);
  const [listaBancoFilmes, setListaBancoFilmes] = React.useState([]);
  const [listaBancoSeries, setListaBancoSeries] = React.useState([]);
  const [listaDesejoBanco, setListaDesejoBanco] = React.useState([]);
  const [carregandoFilmes, setCarregandoFilmes] = React.useState(true);
  const [carregandoSeries, setCarregandoSeries] = React.useState(true);
  const id_usuario = localStorage.getItem("token");

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
      api
        .get("/filmes")
        .then((response) => {
          setListaBancoFilmes(response.data);
        })
        .catch((error) => {
          console.log(error);
        });

      api
        .get("/series")
        .then((response) => {
          setListaBancoSeries(response.data);
        })
        .catch((error) => {
          console.log(error);
        });

      api
        .get("/listaDesejo")
        .then((response) => {
          setListaDesejoBanco(response.data);
        })
        .catch((error) => {
          console.log(error);
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
                      listaBanco={listaBancoFilmes}
                      listaDesejoBanco={listaDesejoBanco}
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
                      listaBanco={listaBancoSeries}
                      listaDesejoBanco={listaDesejoBanco}
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
