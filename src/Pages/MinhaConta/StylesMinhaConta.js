import styled from "styled-components";

export const MinhaContaContainer = styled.section`
  display: flex;
  justify-content: flex-start;
  align-items: flex-start;
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
  padding: 0.6rem 1.2rem;
  font-size: 1.5rem;
  background-color: #00b0ff;
  border-radius: 15px;
  color: white;
  font-weight: bold;
  cursor: pointer;
  width: 50%;
  &:hover {
    transform: scale(1.05);
  }
`;
export const MinhaContaTextoSucesso = styled.p`
  margin-top: 20px;
  font-size: 1.2rem;
  color: white;
`;
