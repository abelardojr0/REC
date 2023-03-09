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
import axios from "axios";
import Login from "../Login/Login";
import { ResultadoContainerCategoria } from "./StylesCategorias";

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
  const id_usuario = localStorage.getItem("id");

  async function buscarFilmes(url) {
    const response = await fetch(url);
    const responseJson = await response.json();
    const responseFinal = await responseJson.results;
    setCategoriaSeries(responseFinal);
  }

  React.useEffect(() => {
    const listaFilmes = `${discoverSeries}${key}&with_genres=${query}${traduzido}`;
    buscarFilmes(listaFilmes);
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
                    tipo={item.media_type}
                    setLoginStatus={setLoginStatus}
                    listaBanco={listaBanco}
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
