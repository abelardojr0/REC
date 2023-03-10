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
} from "./StyleFilmeDetalhes";
import { ClipLoader } from "react-spinners";

const img = LinksApi.IMG;

const FilmeDetalhes = ({
  id,
  titulo,
  imagem,
  nota,
  lancamento,
  orcamento,
  receita,
  generos,
  produtoras,
  sinopse,
  duracao,
}) => {
  const id_usuario = localStorage.getItem("id");
  const [carregando, setCarregando] = React.useState(true);
  const [assistido, setAssistido] = React.useState(false);
  React.useEffect(() => {
    axios
      .post("http://localhost:5000/filmes/" + id_usuario, {
        titulo,
        id_usuario,
      })
      .then((response) => {
        console.log(response);
        setCarregando(false);
        if (response.data.status === "sucess") {
          setAssistido(true);
        } else {
          setAssistido(false);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }, [id_usuario, titulo]);

  function adicionarFilme() {
    axios
      .post("http://localhost:5000/inserirFilme", {
        titulo,
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
            <FilmeTitulo>{titulo}</FilmeTitulo>
            <FilmeConteudo>
              <FilmeTituloEImagem>
                <FilmeImagem src={`${img}${imagem}`} alt="poster" />
              </FilmeTituloEImagem>
              <FilmeDetalhesLista>
                <FilmeDetalhesLi>
                  Titulo: <FilmeDetalhesSpan>{titulo}</FilmeDetalhesSpan>{" "}
                </FilmeDetalhesLi>

                <FilmeDetalhesLi>
                  Nota: <FilmeDetalhesSpan>{nota}</FilmeDetalhesSpan>{" "}
                </FilmeDetalhesLi>

                <FilmeDetalhesLi>
                  Lan??amento:{" "}
                  <FilmeDetalhesSpan>{lancamento}</FilmeDetalhesSpan>{" "}
                </FilmeDetalhesLi>

                <FilmeDetalhesLi>
                  Or??amento:{" "}
                  <FilmeDetalhesSpan> {orcamento} </FilmeDetalhesSpan>
                </FilmeDetalhesLi>

                <FilmeDetalhesLi>
                  Receita: <FilmeDetalhesSpan>{receita}</FilmeDetalhesSpan>
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
                  Produtora:{" "}
                  {produtoras.map((produtora) => (
                    <FilmeDetalhesSpan key={produtora.name}>
                      {produtora.name} |{" "}
                    </FilmeDetalhesSpan>
                  ))}{" "}
                </FilmeDetalhesLi>
                <FilmeDetalhesLiSinopse>
                  Sinopse: <FilmeDetalhesSpan>{sinopse}</FilmeDetalhesSpan>
                </FilmeDetalhesLiSinopse>

                <FilmeDetalhesLi>
                  Dura????o:{" "}
                  <FilmeDetalhesSpan>{duracao} minutos</FilmeDetalhesSpan>
                </FilmeDetalhesLi>
                {assistido ? (
                  <FilmeDetalhesBotaoAdicionado>
                    Adicionado
                  </FilmeDetalhesBotaoAdicionado>
                ) : (
                  <FilmeDetalhesBotao onClick={adicionarFilme}>
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

export default FilmeDetalhes;
