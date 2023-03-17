import styled from "styled-components";
import responsivo, { breakpoints } from "../../Responsivo";

export const FooterComponent = styled.footer`
  background-color: #000600;
  height: 100%;
  max-height: 200px;
  border-top: 1px solid #304644;
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 20px;
`;

export const FooterLogo = styled.img`
  margin-top: 20px;
  max-width: 100px;
  margin-left: 60px;
  ${responsivo(breakpoints.mobile)} {
    max-width: 80px;
    margin-left: 20px;
  }
`;

export const FooterTexto = styled.p`
  font-size: 1.5rem;
  color: #e2e2e2;
  font-weight: bold;
  sup {
    font-weight: 500;
  }
  ${responsivo(breakpoints.mobile)} {
    font-size: 1rem;
  }
`;

export const FooterSociais = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 10px;
  margin-right: 60px;
  ${responsivo(breakpoints.mobile)} {
    flex-direction: column;
  }
`;

export const SociaisImg = styled.img`
  max-width: 40px;
  cursor: pointer;
  &:hover {
    opacity: 0.8;
  }
  ${responsivo(breakpoints.mobile)} {
    max-width: 20px;
  }
`;
