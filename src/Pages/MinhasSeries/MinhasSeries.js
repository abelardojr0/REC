import React from "react";
import Card from "../../Components/Card/Card";
import Footer from "../../Components/Footer/Footer";
import Header from "../../Components/Header/Header";
import { ContainerCarregando } from "../../GlobalStyles";
import {
  ResultadoContainer,
  ResultadoConteudo,
  ResultadoLista,
  ResultadoTitulo,
} from "../Search/StyleSearch";
import { ClipLoader } from "react-spinners";
import api from "../../api";

const MinhasSeries = () => {
  const [minhasSeries, setMinhasSeries] = React.useState([]);
  const [carregando, setCarregando] = React.useState(true);

  const id_usuario = localStorage.getItem("token");

  React.useEffect(() => {
    if (id_usuario) {
      api
        .get("http://localhost:5000/series")
        .then((response) => {
          setMinhasSeries(response.data);
          setTimeout(() => {
            setCarregando(false);
          }, 500);
        })
        .catch((error) => {
          console.log(error);
        });
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
            <ResultadoTitulo>Minhas Séries:</ResultadoTitulo>
            <ResultadoLista>
              {minhasSeries &&
                minhasSeries.map((item) => (
                  <li key={item.id}>
                    <Card
                      titulo={item[1]}
                      imagem={item[2]}
                      nota={item[3]}
                      tipo={item[4]}
                      id={item[5]}
                      listaBanco={minhasSeries}
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

export default MinhasSeries;
