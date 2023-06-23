import styled from "styled-components";
import responsivo, { breakpoints } from "../../../Responsivo";

export const ContainerFormulario = styled.form`
  max-width: 400px;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  flex-direction: column;
  gap: 20px;
  margin: 0 auto;
  height: 100vh;
  margin-top: 100px;
  ${responsivo(breakpoints.desktop)} {
    padding: 0 50px;
  }
  ${responsivo(breakpoints.tablet)} {
    padding: 0 20px;
  }
`;

export const TituloFormulario = styled.h2`
  margin-top: 20px;
  color: #e2e2e2;
  font-size: 2.5rem;
  font-weight: bold;
`;
export const Botao = styled.button`
  color: #fff;
  background-color: #005da8;
  padding: 1rem 2rem;
  text-align: center;
  font-size: 1.5rem;
  border: none;
  border-radius: 20px;
  width: 100%;
  cursor: pointer;
  &:hover {
    transform: scale(1.05);
  }
`;

export const BotaoFalso = styled.div`
  color: #fff;
  background-color: #005da8;
  padding: 1rem 2rem;
  text-align: center;
  font-size: 1.5rem;
  border-radius: 20px;
  width: 100%;
  cursor: pointer;
  &:hover {
    transform: scale(1.05);
  }
`;

export const FormularioJaTenhoConta = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  margin-top: 100px;
`;

export const FormularioJaTenhoContaTitulo = styled.h2`
  color: #fff;
  font-size: 2rem;
  margin-bottom: 20px;
`;

export const FormularioSociaisCadastro = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 10px;
`;
export const CadastroMsgDeErro = styled.div`
  width: 100%;
  color: #ff3131;
  margin-left: 10px;
  margin-bottom: 5px;
`;
