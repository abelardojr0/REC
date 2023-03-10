import { Link } from "react-router-dom";
import styled from "styled-components";

export const CardComponent = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  position: relative;
`;

export const CardImagem = styled.img`
  padding: 1rem;
  width: 100%;
  border-radius: 30px;
  cursor: pointer;
  position: relative;
`;

export const CardDivInfos = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  flex-direction: column;
  border-radius: 15px;
  position: absolute;
  height: 93.5%;
  width: 100%;
  background-color: rgba(0, 0, 0, 0.8);
  display: none;
  &.ativo {
    display: flex;
  }
`;

export const CardDivDasEstrelas = styled.div`
  width: 100%;
  height: 50px;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;
export const CardContainerNota = styled.div`
  width: 50px;
  display: flex;
  justify-content: flex-start;
  align-items: center;
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
export const CardFavorito = styled.img`
  max-width: 20px;
  justify-self: flex-end;
  align-items: flex-end;
  cursor: pointer;
  padding: 0.2rem;
  margin-top: 5px;

  &:hover {
    background-color: rgba(255, 255, 255, 0.1);
    box-sizing: 2px 2px 5px rgba(0, 0, 0, 0.3);
    border-radius: 50%;
  }
`;

export const CardContainerInfos = styled.div`
  height: 100%;
  width: 95%;
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
  gap: 10px;
  /* flex-direction: column; */
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
  text-align: center;
  border-radius: 10px;
  border: none;
  margin-bottom: 5px;
  margin-top: 5px;
  font-size: 1.2rem;
  color: black;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 15px;
  width: 40px;
  height: 40px;
  cursor: pointer;
  img {
    max-width: 30px;
  }
  &:hover {
    transform: scale(1.05);
  }
`;

export const CardBotao = styled.button`
  background-color: transparent;
  border: none;
  margin-bottom: 5px;
  margin-top: 5px;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 40px;
  height: 40px;
  cursor: pointer;
  img {
    max-width: 30px;
  }
  &:hover {
    transform: scale(1.05);
  }
`;
export const CardAdicionar = styled.div`
  /* background-color: #005da8; */
  background-color: rgba(255, 255, 255, 0.4);
  border-radius: 10px;
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 0 10px;
  padding: 0.2rem 0.5rem;
  margin-top: 10px;
  color: black;
  gap: 5px;
  font-size: 1.2rem;
  width: 40px;
  height: 40px;
  cursor: pointer;
  &:hover {
    color: white;
  }
  img {
    max-width: 30px;
    align-self: center;
  }
`;
export const CardAdicionarTexto = styled.p`
  font-size: 1.2rem;
`;
