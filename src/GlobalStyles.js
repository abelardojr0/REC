import styled, { createGlobalStyle } from "styled-components";
export const GlobalStyles = createGlobalStyle`
  body{
    font-family: "Kanit", sans-serif;
    display: grid;
    height: 100%;
    background-color: #1b1c1f;
    overflow-x: hidden;
  }
`;
export const ContainerPages = styled.div`
  max-width: 90%;
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
