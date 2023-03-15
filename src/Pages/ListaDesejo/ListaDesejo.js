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

const ListaDesejo = () => {
  const [listaDesejo, setListaDesejo] = React.useState([]);
  const [carregando, setCarregando] = React.useState(true);

  const id_usuario = localStorage.getItem("token");

  React.useEffect(() => {
    if (id_usuario) {
      api
        .get("http://localhost:5000/listaDesejo")
        .then((response) => {
          setListaDesejo(response.data);
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
            <ResultadoTitulo>Minha Lista de Desejos:</ResultadoTitulo>
            <ResultadoLista>
              {listaDesejo &&
                listaDesejo.map((item) => (
                  <li key={item.id}>
                    <Card
                      titulo={item[1]}
                      imagem={item[2]}
                      nota={item[3]}
                      tipo={item[4]}
                      id={item[5]}
                      listaBanco={listaDesejo}
                      listaDeDesejo={true}
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
