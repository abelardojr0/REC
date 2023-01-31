import React from "react";
import {
  BotaoCadastrar,
  BotaoEntrar,
  HeaderComponent,
  HeaderLink,
  HeaderLogin,
  HeaderLogo,
  HeaderNav,
  HeaderNavUl,
  HeaderPesquisarBotao,
  HeaderPesquisarContainer,
  HeaderPesquisarContainerBarra,
  HeaderPesquisarInput,
} from "./StyleHeader";
import logo from "../../Images/logo.png";
import { Link, useNavigate } from "react-router-dom";
import Login from "../../Pages/Login/Login";

const Header = () => {
  const [loginStatus, setLoginStatus] = React.useState(false);
  const [ativa, setAtiva] = React.useState("");

  const [search, setSearch] = React.useState("");
  const navigate = useNavigate();

  function pesquisar(e) {
    e.preventDefault();
    if (!search) return;

    navigate(`/search?q=${search}`);
    setSearch("");
  }
  function abrirModalLogin() {
    if (loginStatus === true) {
      setLoginStatus(false);
    } else {
      setLoginStatus(true);
    }
  }
  function mostrarPesquisa() {
    setAtiva("ativo");
  }
  function esconderPesquisa(e) {
    if (e.target.value.length > 0) {
      return;
    } else {
      setAtiva("");
    }
  }

  return (
    <HeaderComponent>
      <HeaderNav>
        <Link to="/">
          <HeaderLogo src={logo} alt="logo" />
        </Link>
        <HeaderNavUl>
          <HeaderLink to="/">
            <li>Início</li>
          </HeaderLink>
          <HeaderLink to="/filmes">
            <li>Filmes</li>
          </HeaderLink>
          <HeaderLink to="/series">
            <li>Séries</li>
          </HeaderLink>

          <li>Meus Filmes</li>
          <li>Minhas Séries</li>
          <li>Lista de Desejos</li>
        </HeaderNavUl>
      </HeaderNav>
      <HeaderLogin>
        <BotaoEntrar onClick={abrirModalLogin}>Entrar</BotaoEntrar>
        <Link to="/cadastro">
          <BotaoCadastrar>Cadastrar</BotaoCadastrar>
        </Link>
        <HeaderPesquisarContainer onSubmit={pesquisar}>
          <HeaderPesquisarContainerBarra>
            <HeaderPesquisarInput
              autoFocus
              className={ativa}
              onBlur={esconderPesquisa}
              type={"text"}
              name={"pesquisar"}
              id={"pesquisar"}
              placeholder={"Buscar por filmes e séries..."}
              autoComplete="off"
              onChange={(e) => setSearch(e.target.value)}
              value={search}
            />
            <HeaderPesquisarBotao onClick={mostrarPesquisa} type="submit" />
          </HeaderPesquisarContainerBarra>
        </HeaderPesquisarContainer>
      </HeaderLogin>

      {loginStatus && (
        <>
          <Login setLoginStatus={setLoginStatus} />
        </>
      )}
    </HeaderComponent>
  );
};

export default Header;
