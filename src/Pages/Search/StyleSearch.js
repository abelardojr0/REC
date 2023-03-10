import styled from "styled-components";

export const ResultadoContainer = styled.article`
  background-color: #424150;
  width: 100%;
  height: 100%;
  min-height: 500px;
  padding-top: 100px;
`;

export const ResultadoConteudo = styled.section`
  width: 1200px;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  margin: 0 auto;
`;
export const ResultadoLista = styled.ul`
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  height: 100%;
  margin-top: 40px;
  gap: 20px;
  li {
    max-height: 350px;
  }
`;

export const ResultadoTitulo = styled.h1`
  font-size: 3rem;
  color: white;
  font-weight: bold;
  margin-top: 20px;
`;
export const ResultadoTituloQuery = styled.span`
  font-size: 3rem;
  color: #00aad9;
  text-transform: capitalize;
`;
