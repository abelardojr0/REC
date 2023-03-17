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
    max-width: 50%;
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
  ${responsivo(breakpoints.mobile)} {
    width: 60%;
  }
  ${responsivo(breakpoints.mobile)} {
    width: 50%;
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
  justify-content: space-between;
  align-items: flex-end;
  gap: 10px;
  margin-bottom: 5px;
`;
export const CardTitulo = styled(Link)`
  font-size: 1.8rem;
  color: #e2e2e2;
  text-decoration: none;
  text-align: center;
  width: 100%;
  cursor: pointer;
  margin-top: 10px;
  &:hover {
    text-decoration: underline;
  }
`;

export const CardLink = styled(Link)`
  text-decoration: none;
  border: none;
  gap: 15px;
  width: 40px;
  height: 40px;
  cursor: pointer;
  img {
    width: 30px;
    height: 30px;
  }
  &:hover {
    transform: scale(1.05);
  }
`;

export const CardBotao = styled.img`
  margin-bottom: 5px;
  margin-top: 5px;
  width: 30px;
  height: 30px;
  cursor: pointer;

  &:hover {
    transform: scale(1.05);
  }
`;
