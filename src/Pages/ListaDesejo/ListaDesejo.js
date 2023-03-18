import React from "react";
import Card from "../../Components/Card/Card";
import Footer from "../../Components/Footer/Footer";
import Header from "../../Components/Header/Header";
import {
  ResultadoContainer,
  ResultadoConteudo,
  ResultadoLista,
  ResultadoTitulo,
} from "../Search/StyleSearch";
import { ClipLoader } from "react-spinners";
import { ContainerCarregando } from "../../GlobalStyles";
import api from "../../api";
import { useJwtToken } from "../../useJwtToken";

const ListaDesejo = () => {
  const [listaDesejo, setListaDesejo] = React.useState([]);
  const [carregando, setCarregando] = React.useState(true);

  const [token] = useJwtToken();
  const tokenTemporario = sessionStorage.getItem("token");

  React.useEffect(() => {
    if (token || tokenTemporario) {
      api
        .get("/listaDesejo")
        .then((response) => {
          setListaDesejo(response.data);
          setCarregando(false);
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
            <ResultadoTitulo>Minha Lista de Desejos:</ResultadoTitulo>
            <ResultadoLista>
              {listaDesejo &&
                listaDesejo.map((item) => (
                  <li key={item[0]}>
                    <Card
                      titulo={item[1]}
                      imagem={item[2]}
                      nota={item[3]}
                      tipo={item[4]}
                      id={item[5]}
                      listaBanco={listaDesejo}
                      listaDesejoBanco={listaDesejo}
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

export default ListaDesejo;
