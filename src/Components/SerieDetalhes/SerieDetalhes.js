import React from "react";
import { LinksApi } from "../../ConsultasParaApi";
import {
  FilmeContainer,
  FilmeConteudo,
  FilmeDetalhesBotao,
  FilmeDetalhesLi,
  FilmeDetalhesLiSinopse,
  FilmeDetalhesLista,
  FilmeDetalhesSpan,
  FilmeImagem,
  FilmeTitulo,
  FilmeTituloEImagem,
} from "../FilmeDetalhes/StyleFilmeDetalhes";

const img = LinksApi.IMG;

const FilmeDetalhes = ({
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
  return (
    <>
      <>
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
                  <FilmeDetalhesSpan>{genero.name} | </FilmeDetalhesSpan>
                ))}
              </FilmeDetalhesLi>
              <FilmeDetalhesLi>
                Produtoras:{" "}
                {produtoras.map((produtora) => (
                  <FilmeDetalhesSpan>{produtora.name} | </FilmeDetalhesSpan>
                ))}{" "}
              </FilmeDetalhesLi>
              <FilmeDetalhesLi>
                Criadores:{" "}
                {criadores.map((criador) => (
                  <FilmeDetalhesSpan>{criador.name} | </FilmeDetalhesSpan>
                ))}{" "}
              </FilmeDetalhesLi>

              <FilmeDetalhesLiSinopse>
                Sinopse: <FilmeDetalhesSpan>{sinopse}</FilmeDetalhesSpan>{" "}
              </FilmeDetalhesLiSinopse>

              <FilmeDetalhesBotao>Adicionar</FilmeDetalhesBotao>
            </FilmeDetalhesLista>
          </FilmeConteudo>
        </FilmeContainer>
      </>
    </>
  );
};

export default FilmeDetalhes;
