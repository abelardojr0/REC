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
import Login from "../../Pages/Login/Login";
import api from "../../api";
import { useJwtToken } from "../../useJwtToken";

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
  const [loginStatus, setLoginStatus] = React.useState(false);
  const [carregando, setCarregando] = React.useState(true);
  const [assistido, setAssistido] = React.useState(false);
  const [token] = useJwtToken();

  React.useEffect(() => {
    if (token) {
      api
        .post("/filmes", {
          titulo,
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
    } else {
      setCarregando(false);
    }
  }, [token, titulo]);

  function adicionarFilme() {
    if (token) {
      api
        .post("/inserirFilme", {
          titulo,
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
                Lançamento: <FilmeDetalhesSpan>{lancamento}</FilmeDetalhesSpan>{" "}
              </FilmeDetalhesLi>

              <FilmeDetalhesLi>
                Orçamento: <FilmeDetalhesSpan> {orcamento} </FilmeDetalhesSpan>
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
                Duração:{" "}
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
  );
};

export default FilmeDetalhes;
