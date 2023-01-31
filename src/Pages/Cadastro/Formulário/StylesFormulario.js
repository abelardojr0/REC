import styled from "styled-components";
import responsivo, { breakpoints } from "../../../Responsivo";

export const ContainerFormulario = styled.form`
  max-width: 400px;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  flex-direction: column;
  margin: 0 auto;
  margin-bottom: 100px;
  height: 100vh;
  ${responsivo(breakpoints.desktop)} {
    padding: 0 50px;
  }
  ${responsivo(breakpoints.tablet)} {
    padding: 0 20px;
  }
`;

export const TituloFormulario = styled.h2`
  margin-top: 20px;
  color: #00aad9;
  font-size: 2rem;
  font-weight: bold;
`;

export const SubtituloFormulario = styled.h3`
  font-weight: bold;
  color: #dde1d2;
  font-size: 1.3rem;
  margin-bottom: 20px;
  margin-top: 40px;
`;

export const Botao = styled.button`
  color: #fff;
  background-color: #00aad9;
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
