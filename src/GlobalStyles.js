import styled, { createGlobalStyle } from "styled-components";
import fundo from "./Images/fundo.png";
export const GlobalStyles = createGlobalStyle`
  body{
    font-family: "Kanit", sans-serif;
    display: grid;
    height: 100%;
    background-color: #1b1c1f;
    overflow-x: hidden;
    background-image: url(${fundo});
  background-repeat: no-repeat;
  background-attachment: fixed;
  background-size: cover;
  height: 100vh;
  }
  #root{
    width: 100vw;
  }
`;
export const ContainerPages = styled.div`
  max-width: 90%;
  overflow-x: hidden;

  height: 100%;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  flex-direction: column;
  margin: 0 auto;
`;
export const ContainerCarregando = styled.section`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  min-height: 100vh;
`;
