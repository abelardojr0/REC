import { Link } from "react-router-dom";
import styled from "styled-components";
import responsivo, { breakpoints } from "../../Responsivo";

export const LoginModalContainer = styled.div`
  height: 100%;
  width: 100%;
  background: rgba(0, 0, 0, 0.8);
  position: fixed;
  top: 0;
  left: 0;
  z-index: 2000;
  justify-content: center;
  align-items: flex-start;
`;

export const LoginModal = styled.div`
  width: 300px;
  padding: 40px;
  position: relative;
  margin: 20px;
  background-color: rgba(255, 255, 255, 0.7);
  display: flex;
  justify-content: flex-start;
  align-items: center;
  flex-direction: column;
  border-radius: 15px;
  margin: 20px auto;
  ${responsivo(breakpoints.mobile)} {
    width: 250px;
  }
`;

export const LoginBotaoFechar = styled.button`
  background-color: transparent;
  font-size: 1.5rem;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  position: absolute;
  top: -5px;
  right: -5px;
  color: #f9f9f9;
  border: none;
  cursor: pointer;
  &:hover {
    transform: scale(1.05);
  }
`;

export const LoginFormulario = styled.form`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  width: 100%;
  gap: 10px;
`;
export const LoginTitulo = styled.h1`
  font-size: 2rem;
  color: #000600;
  text-transform: uppercase;
  margin-bottom: 20px;
  margin-top: 20px;
`;

export const LoginBotaoEntrar = styled.button`
  background-color: #00b0ff;
  outline: none;
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

export const LoginLembrarDivisao = styled.div`
  align-self: flex-start;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 5px;
  margin-top: 5px;
`;

export const LoginLembrarInput = styled.input`
  max-width: 20px;
`;
export const LoginLembrarLabel = styled.label`
  font-size: 1rem;
  color: #f9f9f9;
  font-style: italic;
`;
export const EntrarCom = styled.p`
  margin-top: 20px;
  margin-bottom: 10px;
  font-size: 0.8rem;
`;
export const FormularioSociais = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  max-height: 300px;
  gap: 20px;
  width: 100%;
`;
export const LoginMsgErro = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 1rem;
  width: 92%;
  border-radius: 15px;
  margin-bottom: 10px;
  background-color: #9d001b;
`;
export const LoginEsqueceuSenha = styled(Link)`
  color: #003b81;
  font-size: 1rem;
  margin-bottom: 10px;
  text-decoration: none;
  &:hover {
    text-decoration: underline;
  }
`;
