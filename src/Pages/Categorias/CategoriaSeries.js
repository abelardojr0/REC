import React from "react";
import { useSearchParams } from "react-router-dom";
import Card from "../../Components/Card/Card";
import Footer from "../../Components/Footer/Footer";
import Header from "../../Components/Header/Header";
import { LinksApi } from "../../ConsultasParaApi";
import BarraCategorias from "../../Components/BarraCategorias/BarraCategorias";
import {
  ResultadoConteudo,
  ResultadoLista,
  ResultadoTitulo,
  ResultadoTituloQuery,
} from "../Search/StyleSearch";
import Login from "../Login/Login";
import { ResultadoContainerCategoria } from "./StylesCategorias";
import api from "../../api";

const discoverSeries = LinksApi.discoverTv;
const key = LinksApi.key;
const traduzido = LinksApi.traduzido;

const CategoriaSeries = () => {
  const [searchParams] = useSearchParams();
  const query = searchParams.get("q");
  const tituloCat = searchParams.get("t");
  const [categoriaSeries, setCategoriaSeries] = React.useState([]);
  const [loginStatus, setLoginStatus] = React.useState(false);
  const [listaBanco, setListaBanco] = React.useState([]);
  const [listaDesejoBanco, setListaDesejoBanco] = React.useState([]);
  const id_usuario = localStorage.getItem("token");

  async function buscarSeries(url) {
    const response = await fetch(url);
    const responseJson = await response.json();
    const responseFinal = await responseJson.results;
    setCategoriaSeries(responseFinal);
  }

  React.useEffect(() => {
    const listaFilmes = `${discoverSeries}${key}&with_genres=${query}${traduzido}`;
    buscarSeries(listaFilmes);
  }, [query]);
  React.useEffect(() => {
    if (id_usuario) {
      api
        .get("http://localhost:5000/series")
        .then((response) => {
          setListaBanco(response.data);
        })
        .catch((error) => {
          console.log(error);
        });
      api
        .get("http://localhost:5000/listaDesejo")
        .then((response) => {
          setListaDesejoBanco(response.data);
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }, [id_usuario]);
  if (categoriaSeries === []) return null;
  return (
    <>
      <Header />
      {loginStatus && (
        <>
          <Login setLoginStatus={setLoginStatus} />
        </>
      )}
      <BarraCategorias tipo={"tv"} cat={"categoriaSeries"} />
      <ResultadoContainerCategoria>
        <ResultadoConteudo>
          <ResultadoTitulo>
            Resultado para a categoria:{" "}
            <ResultadoTituloQuery>{tituloCat}</ResultadoTituloQuery>
          </ResultadoTitulo>
          <ResultadoLista>
            {categoriaSeries &&
              categoriaSeries.map((item) => (
                <li key={item.id}>
                  <Card
                    titulo={item.title}
                    imagem={item.poster_path}
                    nota={item.vote_average}
                    id={item.id}
                    tipo={"tv"}
                    setLoginStatus={setLoginStatus}
                    listaBanco={listaBanco}
                    listaDesejoBanco={listaDesejoBanco}
                  />
                </li>
              ))}
          </ResultadoLista>
        </ResultadoConteudo>
      </ResultadoContainerCategoria>
      <Footer />
    </>
  );
};

export default CategoriaSeries;
