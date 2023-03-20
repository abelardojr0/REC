import { Link } from "react-router-dom";
import styled from "styled-components";

export const EsqueceuSenhaContainer = styled.form`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  height: 100vh;
  max-width: 400px;
  margin: 0 auto;
`;
export const EsqueceuSenhaTitulo = styled.h1`
  font-size: 2rem;
  color: #ff3131;
  margin-bottom: 20px;
  text-transform: uppercase;
  font-weight: bold;
`;

export const EsqueceuSenhaBotao = styled(Link)`
  text-decoration: none;
  text-align: center;
  padding: 0.6rem 1.2rem;
  font-size: 1.5rem;
  background-color: #ff3131;
  border: none;
  border-radius: 15px;
  color: white;
  font-weight: bold;
  cursor: pointer;
  width: 70%;
  &:hover {
    transform: scale(1.05);
  }
`;
export const EsqueceuSenhaMsgSucesso = styled.div`
  width: 100%;
  height: 100px;
  background-color: white;
  color: black;
  padding: 1rem;
`;

export const EsqueceuSenhaMsgError = styled.div`
  width: 100%;
  height: 100px;
  background-color: #ff3131;
  color: white;
  padding: 1rem;
`;
