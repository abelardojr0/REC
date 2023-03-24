// import { Link } from "react-router-dom";
import styled from "styled-components";
import responsivo, { breakpoints } from "../../Responsivo";

export const MinhaContaContainer = styled.section`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  flex-direction: column;
  gap: 50px;
  max-width: 400px;
  height: 100vh;
  margin: 0 auto;
  margin-top: 150px;
`;

export const MinhaContaAtualizar = styled.form`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  flex-direction: column;
  max-width: 400px;
  gap: 20px;
  height: 100vh;
  margin: 0 auto;
  margin-top: 150px;
`;
export const MinhaContaTitulo = styled.h1`
  font-size: 2rem;
  color: #e2e2e2;
  margin-bottom: 20px;
  text-transform: uppercase;
  font-weight: bold;
`;
export const MinhaContaBotao = styled.button`
  text-align: center;
  padding: 0.9rem 1.2rem;
  text-decoration: none;
  font-size: 1.5rem;
  background-color: #ff3131;
  border: none;
  border-radius: 15px;
  color: white;
  font-weight: bold;
  cursor: pointer;
  width: 300px;
  &:hover {
    transform: scale(1.05);
  }
`;

export const MinhaContaBotaoAtualizar = styled.button`
  text-align: center;
  padding: 0.9rem 1.2rem;
  text-decoration: none;
  font-size: 1.5rem;
  background-color: #00b0ff;
  border: none;
  border-radius: 15px;
  color: white;
  font-weight: bold;
  cursor: pointer;
  width: 300px;
  &:hover {
    transform: scale(1.05);
  }
`;
export const MinhaContaTextoSucesso = styled.p`
  margin-top: 20px;
  font-size: 1.2rem;
  color: white;
  background-color: #0f6c0c;
  padding: 0.8rem 1.4rem;
  border-radius: 15px;
`;

export const MinhaContaContainerConfirmacao = styled.div`
  height: 100vh;
  width: 100%;
  background-color: rgba(0, 0, 0, 0.9);
  position: fixed;
  top: 0;
  left: 0;
  z-index: 2000;
  justify-content: center;
`;

export const MinhaContaModalConfirmacao = styled.div`
  width: 300px;
  padding: 40px;
  position: relative;
  margin: 20px;
  background-color: #fffbf4;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  border-radius: 15px;
  margin: 20px auto;
  ${responsivo(breakpoints.mobile)} {
    width: 250px;
  }
`;
export const MinhaContaModalBotaoFechar = styled.button`
  background-color: transparent;
  font-size: 1.5rem;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  position: absolute;
  top: 0px;
  right: 0px;
  color: #9397a0;
  border: none;
  cursor: pointer;
  background-color: rgba(0, 0, 0, 0.03);
  &:hover {
    transform: scale(1.05);
    color: #717486;
  }
`;

export const MinhaContaModalFormulario = styled.form`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  width: 100%;
  gap: 10px;
`;

export const MinhaContaModalBotaoEntrar = styled.button`
  background-color: #00b0ff;
  outline: none;
  border: none;
  padding: 0.8rem 1.6rem;
  font-size: 1.5rem;
  font-weight: bold;
  color: #f9f9f9;
  border-radius: 10px;
  margin-top: 20px;
  width: 100%;
  border: none;
  cursor: pointer;
  &:hover {
    transform: scale(1.05);
  }
`;
export const MinhaContaModalMsgErro = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 1rem;
  width: 92%;
  border-radius: 15px;
  margin-bottom: 10px;
  background-color: #9d001b;
`;
