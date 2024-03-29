import { Link } from "react-router-dom";
import styled from "styled-components";
import lupa from "../../Images/lupa.png";
import responsivo, { breakpoints } from "../../Responsivo";

export const HeaderComponent = styled.header`
  width: 100%;
  background-color: #030303;
  height: 100px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  color: #f9f9f9;
  position: fixed;
  top: 0;
  z-index: 3;
`;
export const HeaderNav = styled.nav`
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 40px;
  margin-left: 60px;
  ${responsivo(breakpoints.desktop)} {
    gap: 20px;
    margin-left: 20px;
  }
`;

export const HeaderLogo = styled.img`
  max-width: 90px;
  cursor: pointer;
  ${responsivo(breakpoints.desktop)} {
    max-width: 60px;
  }
  ${responsivo(breakpoints.tablet)} {
    max-width: 100px;
  }
`;

export const HeaderNavUl = styled.ul`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-left: 40px;
  ${responsivo(breakpoints.desktop)} {
    margin-left: 0px;
  }
  li {
    font-size: 1.2rem;
    padding: 0.5rem 1.5rem;
    border-radius: 15px;
    cursor: pointer;
    ${responsivo(breakpoints.desktop)} {
      font-size: 0.8rem;
      padding: 0.3rem 0.8rem;
    }
    &:hover {
      color: #ff3131;
      text-decoration: underline;
    }
  }
`;

export const HeaderLink = styled(Link)`
  text-decoration: none;
  color: #f9f9f9 !important;
  display: flex !important;
  align-items: center;
  gap: 20px;
  font-size: 1.5rem;
  ${responsivo(breakpoints.desktop)} {
    max-width: 150px;
  }
  ${responsivo(breakpoints.tablet)} {
    max-width: 200px;
  }
  &:visited {
    color: #f9f9f9;
  }
  img {
    max-width: 30px;
  }
`;
export const HeaderLogin = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
  margin-right: 20px;
`;
export const HeaderLoginBotao = styled.button`
  background-color: transparent;
  padding: 0.5rem 1.5rem;
  border-radius: 15px;
  cursor: pointer;
  font-size: 1.5rem;
  font-style: italic;
  border: none;
  color: #f9f9f9;
  ${responsivo(breakpoints.desktop)} {
    font-size: 1rem;
  }
  ${responsivo(breakpoints.mobile)} {
    font-size: 1.3rem;
  }
  &:hover {
    background-color: rgba(255, 255, 255, 0.1);
  }
`;

export const HeaderPesquisarContainer = styled.form`
  margin-left: 50px;
  ${responsivo(breakpoints.mobile)} {
    width: 100%;
    margin-left: 0px;
  }
`;

export const HeaderPesquisarContainerBarra = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 5px;
  position: relative;
`;
export const HeaderPesquisarInput = styled.input`
  font-size: 1rem;
  padding: 0.6rem;
  border-radius: 15px;
  outline: none;
  border: 2px solid #f9f9f9;
  box-shadow: 5px 5px 10px rgba(0, 0, 0, 0.4);
  display: none;
  width: 300px;
  background-color: transparent;
  padding: 1rem;
  color: white;
  ${responsivo(breakpoints.mobile)} {
    min-width: 100% !important;
    padding-right: 50px;
  }
  &.ativo {
    display: block;
    animation: show-rigth 0.5s forwards ease-in-out;
  }
  &::placeholder {
    color: white;
  }
  @keyframes show-rigth {
    from {
      opacity: 0;
      transform: translate3d(20px, 0, 0);
    }
    to {
      opacity: 1;
      transform: translate3d(0, 0, 0);
    }
  }
`;

export const HeaderPesquisarBotao = styled.button`
  background-image: url(${lupa});
  background-position: center;
  background-size: cover;
  border-radius: 15px;
  background-color: transparent;
  border: none;
  padding: 0.5rem;
  width: 35px;
  height: 35px;
  position: absolute;
  right: 20px;
  cursor: pointer;
  ${responsivo(breakpoints.mobile)} {
    right: -5px;
  }
  &:hover {
    transform: scale(1.1);
  }
`;

export const HeaderMenuUsuario = styled.div`
  background-color: #a90e0c;
  padding: 0.5rem;
  color: white;
  font-size: 1rem;
  font-weight: bold;
  width: 30px;
  height: 30px;
  border-radius: 50%;
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 10px;
  ${responsivo(breakpoints.desktop)} {
    width: 25px;
    height: 25px;
    font-size: 0.8rem;
  }
  ${responsivo(breakpoints.mobile)} {
    width: 35px;
    height: 35px;
    font-size: 1rem;
  }
  cursor: pointer;
`;
export const HeaderMenuAberto = styled.div`
  z-index: 3;
  background-color: #e2e2e2;
  border-radius: 15px;
  display: flex;
  justify-content: center;
  align-items: flex-start;
  flex-direction: column;
  font-weight: bold;
  padding: 1rem;
  gap: 10px;
  position: absolute;
  top: 80px;
  right: 20px;
`;

export const HeaderItensMenuAberto = styled(Link)`
  cursor: pointer;
  color: black;
  text-decoration: none;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 10px;
  text-transform: capitalize;
  &:hover {
    text-decoration: underline;
  }
  img {
    max-width: 20px;
  }
`;

export const HeaderMenuAbertoCabeçalho = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  gap: 20px;
  border-bottom: 2px solid black;
  padding-bottom: 10px;
  width: 100%;
`;
