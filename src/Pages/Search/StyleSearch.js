import styled from "styled-components";
import responsivo, { breakpoints } from "../../Responsivo";

export const ResultadoContainer = styled.article`
  background-color: #424150;
  width: 100%;
  height: 100%;
  min-height: 500px;
  padding-top: 100px;
  overflow-x: hidden;
  margin: 0 auto;
`;

export const ResultadoConteudo = styled.section`
  max-width: 1200px;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  margin: 0 auto;
  ${responsivo(breakpoints.mobile)} {
    max-width: 468px;
  }
`;
export const ResultadoLista = styled.ul`
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  height: 100%;
  margin-top: 40px;
  gap: 20px;
  ${responsivo(breakpoints.tablet)} {
    grid-template-columns: 1fr 1fr;
  }
  ${responsivo(breakpoints.mobile)} {
    grid-template-columns: 1fr;
  }
  li {
    max-height: 350px;
  }
`;

export const ResultadoTitulo = styled.h1`
  font-size: 3rem;
  color: white;
  font-weight: bold;
  margin-top: 20px;
  ${responsivo(breakpoints.tablet)} {
    text-align: center;
    font-size: 2.5rem;
  }
  ${responsivo(breakpoints.mobile)} {
    text-align: center;
    font-size: 2rem;
  }
`;
export const ResultadoTituloQuery = styled.span`
  font-size: 3rem;
  color: #00aad9;
  text-transform: capitalize;
`;
