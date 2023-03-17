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
import { useJwtToken } from "../../useJwtToken";

const MinhasSeries = () => {
  const [minhasSeries, setMinhasSeries] = React.useState([]);
  const [carregando, setCarregando] = React.useState(true);
  const [listaDesejoBanco, setListaDesejoBanco] = React.useState([]);

  const [token] = useJwtToken();

  React.useEffect(() => {
    if (token) {
      api
        .get("/series")
        .then((response) => {
          setMinhasSeries(response.data);
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
  }, [token]);
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
                minhasSeries.map((item, index) => (
                  <li key={item[0]}>
                    <Card
                      titulo={item[1]}
                      imagem={item[2]}
                      nota={item[3]}
                      tipo={item[4]}
                      id={item[5]}
                      listaBanco={minhasSeries}
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

export default MinhasSeries;
