import axios from "axios";
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
  const id_usuario = localStorage.getItem("id");
  const [carregando, setCarregando] = React.useState(true);
  const [assistido, setAssistido] = React.useState(false);

  React.useEffect(() => {
    axios
      .post("http://localhost:5000/series/" + id_usuario, {
        titulo: nome,
        id_usuario,
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
  }, [id_usuario, nome]);

  function adicionarSerie() {
    axios
      .post("http://localhost:5000/inserirFilme", {
        titulo: nome,
        imagem,
        nota,
        tipo: "movie",
        id_api: id,
        id_usuario,
      })
      .then((response) => {
        console.log(response);
        setAssistido(true);
      })
      .catch((error) => {
        console.log(error);
      });
  }
  return (
    <>
      <>
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
                  Lançamento:{" "}
                  <FilmeDetalhesSpan>{lancamento}</FilmeDetalhesSpan>{" "}
                </FilmeDetalhesLi>
                <FilmeDetalhesLi>
                  Episódios: <FilmeDetalhesSpan>{episodios}</FilmeDetalhesSpan>{" "}
                </FilmeDetalhesLi>
                <FilmeDetalhesLi>
                  Temporadas:{" "}
                  <FilmeDetalhesSpan>{temporadas}</FilmeDetalhesSpan>{" "}
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
    </>
  );
};

export default SerieDetalhes;
