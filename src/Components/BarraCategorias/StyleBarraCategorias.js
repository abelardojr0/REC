import styled from "styled-components";

export const CategoriasContainer = styled.nav`
  margin-top: 100px;
  width: 100%;
  height: 100px;
  background-color: #27272a;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const CategoriasLista = styled.ul`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 12px;
`;
export const CategoriasItem = styled.li`
  font-size: 1rem;
  color: white;
  cursor: pointer;
  &:hover {
    text-decoration: underline;
  }
`;
