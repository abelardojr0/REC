import styled from "styled-components";
import responsivo, { breakpoints } from "../../Responsivo";

export const FilmeContainer = styled.article`
  height: 100vh;
  background-color: #424150;
  width: 100%;
  padding-top: 100px;
  margin-bottom: 60px;
  overflow-x: hidden;
`;
export const FilmeConteudo = styled.section`
  width: 70vw;
  height: 100%;
  display: flex;
  align-items: flex-start;
  gap: 40px;
  margin: 0 auto;
  padding-top: 40px;
  ${responsivo(breakpoints.mobile)} {
    flex-direction: column;
    align-items: center;
  }
`;

export const FilmeTituloEImagem = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`;

export const FilmeTitulo = styled.h1`
  font-size: 3rem;
  color: white;
  margin-bottom: 20px;
  text-align: center;
  padding-top: 20px;
`;
export const FilmeImagem = styled.img`
  max-width: 400px;
  border-radius: 15px;
  ${responsivo(breakpoints.mobile)} {
    max-width: 200px;
  }
`;
export const FilmeDetalhesLista = styled.ul`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  flex-direction: column;
`;

export const FilmeDetalhesLi = styled.li`
  color: #005da8;
  font-size: 1.2rem;
  background-color: gray;
  width: 100%;
  padding: 0.5rem;
  margin-bottom: 10px;
  border-radius: 5px;
`;

export const FilmeDetalhesLiSinopse = styled.li`
  color: #005da8;
  font-size: 1.2rem;
  background-color: gray;
  width: 100%;
  padding: 0.5rem;
  box-sizing: border-box;
  margin-bottom: 10px;
  border-radius: 5px;
  max-height: 100px;
  overflow: hidden;
  overflow-y: scroll;
`;

export const FilmeDetalhesSpan = styled.span`
  color: white;
  font-size: 1.2rem;
`;

export const FilmeDetalhesBotao = styled.button`
  color: #fff;
  background-color: #ff3131;
  padding: 1rem 2rem;
  text-align: center;
  font-size: 1.5rem;
  border: none;
  border-radius: 20px;
  width: 100%;
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 10px;
  &:hover {
    transform: scale(1.02);
  }
  img {
    max-width: 30px;
  }
`;

export const FilmeDetalhesBotaoAdicionado = styled.button`
  color: #fff;
  background-color: #08ba68;
  padding: 1rem 2rem;
  text-align: center;
  font-size: 1.5rem;
  border: none;
  border-radius: 20px;
  width: 100%;
  margin: 0 auto;
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 10px;
  &:hover {
    transform: scale(1.02);
  }
  img {
    max-width: 30px;
  }
`;

export const FilmeDetalhesContainerBotoes = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 10px;
  width: 100%;
`;
// export const FilmeDetalhesBotaoDesejo = styled.button`
//   color: #fff;
//   background-color: #ff3131;
//   padding: 1rem 2rem;
//   text-align: center;
//   font-size: 1.5rem;
//   border: none;
//   border-radius: 20px;
//   width: 100%;
//   cursor: pointer;
//   &:hover {
//     transform: scale(1.02);
//   }
// `;
