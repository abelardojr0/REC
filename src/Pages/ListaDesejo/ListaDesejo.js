import axios from "axios";
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

const ListaDesejo = () => {
  const [listaDesejo, setListaDesejo] = React.useState([]);
  const id_usuario = localStorage.getItem("id");

  React.useEffect(() => {
    if (id_usuario) {
      axios
        .get("http://localhost:5000/listaDesejo/" + id_usuario)
        .then((response) => {
          setListaDesejo(response.data);
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }, [id_usuario]);
  return (
    <>
      <Header />
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
                  />
                </li>
              ))}
          </ResultadoLista>
        </ResultadoConteudo>
      </ResultadoContainer>
      <Footer />
    </>
  );
};

export default ListaDesejo;
