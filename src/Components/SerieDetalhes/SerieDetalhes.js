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
} from "../FilmeDetalhes/StyleFilmeDetalhes";
import { ClipLoader } from "react-spinners";
import Login from "../../Pages/Login/Login";
import api from "../../api";
import { useJwtToken } from "../../useJwtToken";
import assistido_icon from "../../Images/assistido.png";
import assistir_icon from "../../Images/assistir.png";
import adicionar_icon from "../../Images/adicionar.png";
import adicionado_icon from "../../Images/adicionado.png";

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
  const [adicionado, setAdicionado] = React.useState(false);

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

      api
        .get("/listaDesejo")
        .then((response) => {
          response.data.forEach((item) => {
            if (item[1] === nome) {
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
  }, [token, nome, tokenTemporario]);

  function adicionarSerie() {
    if (token || tokenTemporario) {
      setCarregando(true);
      api
        .post("/inserirSerie", {
          titulo: nome,
          imagem,
          nota,
          tipo: "tv",
          id_api: id,
        })
        .then((response) => {
          console.log(response);
          setAssistidoSerie(true);
          setCarregando(false);
          setAdicionado(false);
        })
        .catch((error) => {
          console.log(error);
        });
      api
        .post("/removerListaDesejo", {
          titulo: nome,
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
          titulo: nome,
          imagem,
          nota,
          tipo: "tv",
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

  function removerSerie() {
    setCarregando(true);
    api
      .post("/removerSerie", {
        titulo: nome,
      })
      .then((response) => {
        console.log(response);
        setAssistidoSerie(false);
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
        titulo: nome,
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

              <FilmeDetalhesContainerBotoes>
                {assistidoSerie ? (
                  <FilmeDetalhesBotaoAdicionado onClick={removerSerie}>
                    <img src={assistido_icon} alt="assistido_icon" /> Assistido
                  </FilmeDetalhesBotaoAdicionado>
                ) : (
                  <>
                    <FilmeDetalhesBotao onClick={adicionarSerie}>
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

export default SerieDetalhes;
