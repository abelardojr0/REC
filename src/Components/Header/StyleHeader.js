import { Link } from "react-router-dom";
import styled from "styled-components";
import lupa from "../../Images/lupa2.png";

export const HeaderComponent = styled.header`
  width: 100%;
  background-color: #000600;
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
`;

export const HeaderLogo = styled.img`
  max-width: 90px;
  cursor: pointer;
`;

export const HeaderNavUl = styled.ul`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-left: 40px;
  li {
    font-size: 1rem;
    padding: 0.5rem 1.5rem;
    border-radius: 15px;
    cursor: pointer;
    &:hover {
      /* background-color: rgba(255, 255, 255, 0.2); */
      color: #00aad9;
      text-decoration: underline;
    }
  }
`;

export const HeaderLink = styled(Link)`
  text-decoration: none;
  color: #f9f9f9;
  &:visited {
    color: #f9f9f9;
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
  &:hover {
    background-color: rgba(255, 255, 255, 0.2);
    color: #00aad9;
  }
`;

export const HeaderPesquisarContainer = styled.form`
  margin-left: 50px;
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
  &.ativo {
    display: block;
    animation: show-rigth 0.5s forwards ease-in-out;
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
  width: 30px;
  height: 30px;
  position: absolute;
  right: 20px;
  cursor: pointer;
  &:hover {
    transform: scale(1.1);
  }
`;

export const HeaderMenuUsuario = styled.div`
  background-color: #0c1f24;
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
  cursor: pointer;
`;
export const HeaderMenuAberto = styled.div`
  z-index: 3;
  background-color: #e2e2e2;
  width: 142px;
  border-radius: 15px;
  display: flex;
  justify-content: center;
  align-items: flex-start;
  flex-direction: column;
  font-weight: bold;
  padding: 1rem;
  gap: 10px;
  position: absolute;
  top: 75px;
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
