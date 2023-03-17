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
  const id_usuario = localStorage.getItem("token");
  const [loginStatus, setLoginStatus] = React.useState(false);
  const [carregando, setCarregando] = React.useState(true);
  const [assistido, setAssistido] = React.useState(false);

  React.useEffect(() => {
    if (id_usuario) {
      api
        .post("/series", {
          titulo: nome,
        })
        .then((response) => {
          setCarregando(false);
          console.log(response);
          if (response.data.status === "sucess") {
            setAssistido(true);
          } else {
            setAssistido(false);
          }
        })
        .catch((error) => {
          console.log(error);
        });
    } else {
      setCarregando(false);
    }
  }, [id_usuario, nome]);

  function adicionarSerie() {
    if (id_usuario) {
      api
        .post("/inserirFilme", {
          titulo: nome,
          imagem,
          nota,
          tipo: "movie",
          id_api: id,
        })
        .then((response) => {
          console.log(response);
          setAssistido(true);
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

              {assistido ? (
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
