import styled from "styled-components";
import responsivo, { breakpoints } from "../../Responsivo";

export const ContainerCardsTituloSection = styled.h1`
  font-size: 3rem;
  color: white;
  width: 100%;
  justify-self: flex-start;
  align-items: flex-start;
  padding-top: 50px;
  margin-left: 40px;
  margin-bottom: 20px;
  font-family: "Righteous", cursive;
  ${responsivo(breakpoints.desktop)} {
    font-size: 2.5rem;
  }
  ${responsivo(breakpoints.tablet)} {
    font-size: 2rem;
  }
  ${responsivo(breakpoints.mobile)} {
    font-size: 1.8rem;
  }
`;
