// import axios from "axios";
import React from "react";
import Card from "../../Components/Card/Card";
import Footer from "../../Components/Footer/Footer";
import Header from "../../Components/Header/Header";
import { ClipLoader } from "react-spinners";

import {
  ResultadoContainer,
  ResultadoConteudo,
  ResultadoLista,
  ResultadoTitulo,
} from "../Search/StyleSearch";
import { ContainerCarregando } from "../../GlobalStyles";
import api from "../../api";

const MeusFilmes = () => {
  const [meusFilmes, setMeusFilmes] = React.useState([]);
  const [carregando, setCarregando] = React.useState(true);

  const id_usuario = localStorage.getItem("id");

  React.useEffect(() => {
    if (id_usuario) {
      api
        .get("/filmes/" + id_usuario)
        .then((response) => {
          setMeusFilmes(response.data);
          setTimeout(() => {
            setCarregando(false);
          }, 500);
        })
        .catch((error) => {
          console.log(error);
        });
      // axios
      //   .get("http://localhost:5000/filmes/" + id_usuario)
      //   .then((response) => {
      //     setMeusFilmes(response.data);
      //     setTimeout(() => {
      //       setCarregando(false);
      //     }, 500);
      //   })
      //   .catch((error) => {
      //     console.log(error);
      //   });
    }
  }, [id_usuario]);
  return (
    <>
      <Header />
      {carregando ? (
        <>
          <ContainerCarregando>
            <ClipLoader size={100} />
          </ContainerCarregando>
        </>
      ) : (
        <ResultadoContainer>
          <ResultadoConteudo>
            <ResultadoTitulo>Meus Filmes:</ResultadoTitulo>
            <ResultadoLista>
              {meusFilmes &&
                meusFilmes.map((item) => (
                  <li key={item.id}>
                    <Card
                      titulo={item[1]}
                      imagem={item[2]}
                      nota={item[3]}
                      tipo={item[4]}
                      id={item[5]}
                      listaBanco={meusFilmes}
                      listaDeDesejo={false}
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

export default MeusFilmes;
