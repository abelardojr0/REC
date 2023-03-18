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
import { useJwtToken } from "../../useJwtToken";

const MeusFilmes = () => {
  const [meusFilmes, setMeusFilmes] = React.useState([]);
  const [carregando, setCarregando] = React.useState(true);
  const [listaDesejoBanco, setListaDesejoBanco] = React.useState([]);

  const [token] = useJwtToken();
  const tokenTemporario = sessionStorage.getItem("token");

  React.useEffect(() => {
    if (token || tokenTemporario) {
      api
        .get("/filmes")
        .then((response) => {
          setMeusFilmes(response.data);
          setCarregando(false);
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
  }, [token, tokenTemporario]);
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
                  <li key={item[0]}>
                    <Card
                      titulo={item[1]}
                      imagem={item[2]}
                      nota={item[3]}
                      tipo={item[4]}
                      id={item[5]}
                      listaBanco={meusFilmes}
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

export default MeusFilmes;
