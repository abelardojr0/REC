import React from "react";
import { LinksApi } from "../../ConsultasParaApi";
import { ContainerCarregando } from "../../GlobalStyles";
import {
  FilmeContainer,
  FilmeConteudo,
  FilmeDetalhesBotao,
  FilmeDetalhesBotaoAdicionado,
  FilmeDetalhesLi,
  FilmeDetalhesLiSinopse,
  FilmeDetalhesLista,
  FilmeDetalhesSpan,
  FilmeImagem,
  FilmeTitulo,
  FilmeTituloEImagem,
} from "../FilmeDetalhes/StyleFilmeDetalhes";
import { ClipLoader } from "react-spinners";
import Login from "../../Pages/Login/Login";
import api from "../../api";
import { useJwtToken } from "../../useJwtToken";

const img = LinksApi.IMG;

const SerieDetalhes = ({
  id,
  nome,
  imagem,
  nota,
  lancamento,
  generos,
  episodios,
  temporadas,
  produtoras,
  criadores,
  sinopse,
}) => {
  const [token] = useJwtToken();
  const tokenTemporario = sessionStorage.getItem("token");
  const [loginStatus, setLoginStatus] = React.useState(false);
  const [carregando, setCarregando] = React.useState(true);
  const [assistidoSerie, setAssistidoSerie] = React.useState(false);

  React.useEffect(() => {
    if (token || tokenTemporario) {
      api
        .post("/series", {
          titulo: nome,
        })
        .then((response) => {
          setCarregando(false);
          console.log(response);
          if (response.data.status === "sucess") {
            setAssistidoSerie(true);
          } else {
            setAssistidoSerie(false);
          }
        })
        .catch((error) => {
          console.log(error);
        });
    } else {
      setCarregando(false);
    }
  }, [token, nome, tokenTemporario]);

  function adicionarSerie() {
    if (token || tokenTemporario) {
      api
        .post("/inserirSerie", {
          titulo: nome,
          imagem,
          nota,
          tipo: "movie",
          id_api: id,
        })
        .then((response) => {
          console.log(response);
          setAssistidoSerie(true);
        })
        .catch((error) => {
          console.log(error);
        });
    } else {
      setLoginStatus(true);
    }
  }
  return (
    <>
      {loginStatus && (
        <>
          <Login setLoginStatus={setLoginStatus} />
        </>
      )}
      {carregando ? (
        <ContainerCarregando>
          <ClipLoader size={100} />
        </ContainerCarregando>
      ) : (
        <FilmeContainer>
          <FilmeTitulo>{nome}</FilmeTitulo>
          <FilmeConteudo>
            <FilmeTituloEImagem>
              <FilmeImagem src={`${img}${imagem}`} alt="poster" />
            </FilmeTituloEImagem>
            <FilmeDetalhesLista>
              <FilmeDetalhesLi>
                Titulo: <FilmeDetalhesSpan>{nome}</FilmeDetalhesSpan>{" "}
              </FilmeDetalhesLi>
              <FilmeDetalhesLi>
                Nota: <FilmeDetalhesSpan>{nota}</FilmeDetalhesSpan>{" "}
              </FilmeDetalhesLi>
              <FilmeDetalhesLi>
                Lançamento: <FilmeDetalhesSpan>{lancamento}</FilmeDetalhesSpan>{" "}
              </FilmeDetalhesLi>
              <FilmeDetalhesLi>
                Episódios: <FilmeDetalhesSpan>{episodios}</FilmeDetalhesSpan>{" "}
              </FilmeDetalhesLi>
              <FilmeDetalhesLi>
                Temporadas: <FilmeDetalhesSpan>{temporadas}</FilmeDetalhesSpan>{" "}
              </FilmeDetalhesLi>
              <FilmeDetalhesLi>
                Generos:{" "}
                {generos.map((genero) => (
                  <FilmeDetalhesSpan key={genero.name}>
                    {genero.name} |{" "}
                  </FilmeDetalhesSpan>
                ))}
              </FilmeDetalhesLi>
              <FilmeDetalhesLi>
                Produtoras:{" "}
                {produtoras.map((produtora) => (
                  <FilmeDetalhesSpan key={produtora.name}>
                    {produtora.name} |{" "}
                  </FilmeDetalhesSpan>
                ))}{" "}
              </FilmeDetalhesLi>
              <FilmeDetalhesLi>
                Criadores:{" "}
                {criadores.map((criador) => (
                  <FilmeDetalhesSpan key={criador.name}>
                    {criador.name} |{" "}
                  </FilmeDetalhesSpan>
                ))}{" "}
              </FilmeDetalhesLi>

              <FilmeDetalhesLiSinopse>
                Sinopse: <FilmeDetalhesSpan>{sinopse}</FilmeDetalhesSpan>{" "}
              </FilmeDetalhesLiSinopse>

              {assistidoSerie ? (
                <FilmeDetalhesBotaoAdicionado>
                  Adicionado
                </FilmeDetalhesBotaoAdicionado>
              ) : (
                <FilmeDetalhesBotao onClick={adicionarSerie}>
                  Adicionar
                </FilmeDetalhesBotao>
              )}
            </FilmeDetalhesLista>
          </FilmeConteudo>
        </FilmeContainer>
      )}
    </>
  );
};

export default SerieDetalhes;
