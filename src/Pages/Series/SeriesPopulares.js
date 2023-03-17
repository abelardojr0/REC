import React from "react";
import ContainerCards from "../../Components/ContainerCards/ContainerCards";
import { LinksApi } from "../../ConsultasParaApi";
import { ClipLoader } from "react-spinners";
import { ContainerCarregando } from "../../GlobalStyles";

const tv = LinksApi.tv;
const key = LinksApi.key;
const traduzido = LinksApi.traduzido;

const SeriesPopulares = () => {
  const [popularesSeries, setPopularesSeries] = React.useState([]);
  const [carregando, setCarregando] = React.useState(true);

  async function buscarApi(url) {
    const response = await fetch(url);
    const responseJson = await response.json();
    const resultadoFinal = await responseJson.results;
    setPopularesSeries(resultadoFinal);
    setTimeout(() => {
      setCarregando(false);
    }, 2000);
  }

  React.useEffect(() => {
    const listaPopulares = `${tv}popular?${key}${traduzido}`;
    buscarApi(listaPopulares);
  }, []);

  if (popularesSeries === []) return null;
  return (
    <>
      {carregando && (
        <>
          <ContainerCarregando>
            <ClipLoader size={100} />
          </ContainerCarregando>
        </>
      )}
      {popularesSeries && (
        <ContainerCards
          titulo={"Séries populares"}
          lista={popularesSeries}
          tipo={"serie"}
        />
      )}
    </>
  );
};

export default SeriesPopulares;
