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
  gap: 20px;
  margin-left: 40px;
  li {
    font-size: 1.5rem;
    cursor: pointer;
    &:hover {
      text-decoration: underline solid;
      color: #00aad9;
    }
  }
`;

export const HeaderLink = styled(Link)`
  text-decoration: none;
  &:visited {
    color: #f9f9f9;
  }
`;
export const HeaderLogin = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
`;
export const BotaoEntrar = styled.button`
  background-color: transparent;
  padding: 0.5rem 1.5rem;
  border-radius: 15px;
  cursor: pointer;
  font-size: 1.5rem;
  font-style: italic;
  border: none;
  color: #f9f9f9;
  &:hover {
    background-color: rgba(0, 0, 0, 0.2);
  }
`;
export const BotaoCadastrar = styled.button`
  background-color: transparent;
  padding: 0.5rem 1.5rem;
  border-radius: 15px;
  cursor: pointer;
  font-size: 1.5rem;
  font-style: italic;
  border: none;
  color: #f9f9f9;
  &:hover {
    background-color: rgba(0, 0, 0, 0.2);
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
