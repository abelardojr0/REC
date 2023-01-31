import styled from "styled-components";

export const LogarComSociais = styled.button`
  background-color: white;
  border-radius: 10px;
  outline: none;
  border: none;
  font-size: 1rem;
  padding: 0.5rem 1rem;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 10px;
  width: 100%;
  height: 50px;
  cursor: pointer;
  &:hover {
    transform: scale(1.05);
  }
  img {
    max-width: 100px;
  }
`;
