import React from "react";
import { LinksApi } from "../../ConsultasParaApi";
import { ContainerCarregando } from "../../GlobalStyles";
import {
  FilmeContainer,
  FilmeConteudo,
  FilmeDetalhesBotao,
  FilmeDetalhesBotaoAdicionado,
  FilmeDetalhesContainerBotoes,
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
import assistido_icon from "../../Images/assistido.png";
import assistir_icon from "../../Images/assistir.png";
import adicionar_icon from "../../Images/adicionar.png";
import adicionado_icon from "../../Images/adicionado.png";

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
  const [adicionado, setAdicionado] = React.useState(false);

  const [token] = useJwtToken();
  const tokenTemporario = sessionStorage.getItem("token");

  React.useEffect(() => {
    if (token || tokenTemporario) {
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

      api
        .get("/listaDesejo")
        .then((response) => {
          response.data.forEach((item) => {
            if (item[1] === titulo) {
              setAdicionado(true);
            }
          });
          setCarregando(false);
        })
        .catch((error) => {
          console.log(error);
        });
    } else {
      setCarregando(false);
    }
  }, [token, titulo, tokenTemporario]);

  function adicionarFilme() {
    if (token || tokenTemporario) {
      setCarregando(true);
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
          setCarregando(false);
          setAdicionado(false);
        })
        .catch((error) => {
          console.log(error);
        });
      api
        .post("/removerListaDesejo", {
          titulo,
        })
        .then((response) => {
          console.log(response);
        })
        .catch((error) => {
          console.log(error);
        });
    } else {
      setLoginStatus(true);
    }
  }

  function adicionarListaDesejo() {
    if (token || tokenTemporario) {
      setCarregando(true);
      api
        .post("/inserirListaDesejo", {
          titulo,
          imagem,
          nota,
          tipo: "movie",
          id_api: id,
        })
        .then((response) => {
          console.log(response);
          setAdicionado(true);
          setCarregando(false);
        })
        .catch((error) => {
          console.log(error);
        });
    } else {
      setLoginStatus(true);
    }
  }

  function removerFilme() {
    setCarregando(true);
    api
      .post("/removerFilme", {
        titulo,
      })
      .then((response) => {
        console.log(response);
        setAssistido(false);
        setCarregando(false);
      })
      .catch((error) => {
        console.log(error);
      });
  }

  function removerListaDesejo() {
    setCarregando(true);
    api
      .post("/removerListaDesejo", {
        titulo,
      })
      .then((response) => {
        console.log(response);
        setAdicionado(false);
        setCarregando(false);
      })
      .catch((error) => {
        console.log(error);
      });
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
              <FilmeDetalhesContainerBotoes>
                {assistido ? (
                  <FilmeDetalhesBotaoAdicionado onClick={removerFilme}>
                    <img src={assistido_icon} alt="assistido_icon" /> Assistido
                  </FilmeDetalhesBotaoAdicionado>
                ) : (
                  <>
                    <FilmeDetalhesBotao onClick={adicionarFilme}>
                      <img src={assistir_icon} alt="assistido_icon" /> Assistir
                    </FilmeDetalhesBotao>
                    {adicionado ? (
                      <FilmeDetalhesBotaoAdicionado
                        onClick={removerListaDesejo}
                      >
                        <img src={adicionado_icon} alt="adicionado_icon" />{" "}
                        Adicionado
                      </FilmeDetalhesBotaoAdicionado>
                    ) : (
                      <FilmeDetalhesBotao onClick={adicionarListaDesejo}>
                        <img src={adicionar_icon} alt="adicionar_icon" /> Lista
                        de Desejo
                      </FilmeDetalhesBotao>
                    )}
                  </>
                )}
              </FilmeDetalhesContainerBotoes>
            </FilmeDetalhesLista>
          </FilmeConteudo>
        </FilmeContainer>
      )}
    </>
  );
};

export default FilmeDetalhes;
