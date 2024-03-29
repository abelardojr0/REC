import { Link } from "react-router-dom";
import styled from "styled-components";
import responsivo, { breakpoints } from "../../Responsivo";

export const CardComponent = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  position: relative;
`;

export const CardImagem = styled.img`
  max-width: 100%;
  border-radius: 30px;
  cursor: pointer;
  position: relative;
  ${responsivo(breakpoints.tablet)} {
    max-width: 60%;
  }
  ${responsivo(breakpoints.mobile)} {
    max-width: 100%;
  }
`;

export const CardDivInfos = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  border-radius: 29px;
  position: absolute;
  height: 100%;
  width: 100%;
  background-color: rgba(0, 0, 0, 0.8);
  display: none;
  &.ativo {
    display: flex;
  }
  ${responsivo(breakpoints.tablet)} {
    width: 60%;
  }
  ${responsivo(breakpoints.mobile)} {
    width: 100%;
  }
`;

export const CardDivDasEstrelas = styled.div`
  height: 50px;
  display: flex;
  justify-content: center;
  align-items: center;
`;
export const CardContainerNota = styled.div`
  align-self: flex-start;
  width: 50px;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  background-color: white;
  border-radius: 15px;
  padding: 0.3rem;
  padding-right: 0.6rem;
  margin-left: 10px;
  margin-top: 10px;
  gap: 5px;
  img {
    max-width: 25px;
    max-height: 25px;
    align-self: center;
  }
  p {
    font-size: 1rem;
    color: #605c6c;
  }
`;

export const CardContainerInfos = styled.div`
  height: 100%;
  width: 95%;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  gap: 10px;
  margin-bottom: 5px;
  ${responsivo(breakpoints.desktop)} {
    gap: 5px;
  }
`;
export const CardTitulo = styled(Link)`
  font-size: 1.6rem;
  color: #e2e2e2;
  text-decoration: none;
  text-align: center;
  width: 100%;
  cursor: pointer;
  margin-top: 10px;
  ${responsivo(breakpoints.desktop)} {
    font-size: 1.2rem;
  }
  &:hover {
    text-decoration: underline;
  }
`;

export const CardContainerBotao = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 10px;
  background-color: white;
  border-radius: 15px;
  padding: 0.3rem;
  width: 180px;
  cursor: pointer;
  ${responsivo(breakpoints.desktop)} {
    width: 140px;
    padding: 0.2rem;
  }
  ${responsivo(breakpoints.tablet)} {
    width: 150px;
    padding: 0.3rem;
  }
  ${responsivo(breakpoints.mobile)} {
    width: 180px;
    padding: 0.3rem;
  }
  &:hover {
    transform: scale(1.05);
  }
`;
export const CardTextoBotao = styled.p`
  font-size: 1rem;
  color: black;
  margin-left: 10px;
  font-family: "Fredoka One", cursive;
  ${responsivo(breakpoints.mobile)} {
    font-size: 1.3rem;
  }
`;
export const CardBotao = styled.img`
  margin-bottom: 5px;
  margin-top: 5px;
  margin-right: 10px;
  width: 20px;
  height: 20px;
`;
