import React from "react";
import { useNavigate } from "react-router-dom";
import { LinksApi } from "../../ConsultasParaApi";
import {
  CategoriasItem,
  CategoriasContainer,
  CategoriasLista,
} from "./StyleBarraCategorias";

const key = LinksApi.key;
const traduzido = LinksApi.traduzido;
const BarraCategorias = ({ cat, tipo }) => {
  const [categorias, setCategorias] = React.useState([]);

  const navigate = useNavigate();

  async function buscarCategorias(url) {
    const response = await fetch(url);
    const responseJson = await response.json();
    const responseFinal = await responseJson.genres;
    setCategorias(responseFinal);
  }

  React.useEffect(() => {
    const listaCategorias = `https://api.themoviedb.org/3/genre/${tipo}/list?${key}${traduzido}`;
    buscarCategorias(listaCategorias);
  }, [tipo]);

  function navegarParaCat(e) {
    const titulo = e.target.innerText;
    const id = e.target.getAttribute("id");
    navigate(`/${cat}/?q=${id}&t=${titulo}`);
  }
  if (categorias === []) return null;
  return (
    <>
      <CategoriasContainer>
        <CategoriasLista>
          {categorias &&
            categorias.map((categoria) => (
              <CategoriasItem
                key={categoria.id}
                id={categoria.id}
                onClick={navegarParaCat}
              >
                {categoria.name}
              </CategoriasItem>
            ))}
        </CategoriasLista>
      </CategoriasContainer>
    </>
  );
};

export default BarraCategorias;
