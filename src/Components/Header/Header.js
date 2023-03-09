import React from "react";
import {
  HeaderComponent,
  HeaderItensMenuAberto,
  HeaderLink,
  HeaderLogin,
  HeaderLoginBotao,
  HeaderLogo,
  HeaderMenuAberto,
  HeaderMenuAbertoCabeçalho,
  HeaderMenuUsuario,
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
  const [menuAberto, setMenuAberto] = React.useState();
  const navigate = useNavigate();
  const nome_usuario = localStorage.getItem("nome");
  // const id_usuario = localStorage.getItem("id");

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
  function abrirMenu() {
    if (menuAberto) {
      setMenuAberto(false);
    } else {
      setMenuAberto(true);
    }
  }
  function deslogar() {
    localStorage.clear();
    navigate("/");
    window.location.reload(true);
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
          {nome_usuario && (
            <>
              <HeaderLink to="/meusFilmes">
                <li>Meus Filmes</li>
              </HeaderLink>
              <HeaderLink to="/minhasSeries">
                <li>Minhas Séries</li>
              </HeaderLink>
              <HeaderLink to="/listaDesejo">
                <li>Lista de Desejos</li>
              </HeaderLink>
            </>
          )}
        </HeaderNavUl>
      </HeaderNav>
      <HeaderLogin>
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
        {nome_usuario ? (
          <>
            <HeaderMenuUsuario onClick={abrirMenu}>
              {nome_usuario[0].toLocaleUpperCase()}
            </HeaderMenuUsuario>
            {menuAberto && (
              <HeaderMenuAberto>
                <HeaderMenuAbertoCabeçalho>
                  <HeaderMenuUsuario>
                    {nome_usuario[0].toLocaleUpperCase()}
                  </HeaderMenuUsuario>
                  <HeaderItensMenuAberto>{nome_usuario}</HeaderItensMenuAberto>
                </HeaderMenuAbertoCabeçalho>
                <HeaderItensMenuAberto>Meus Filmes</HeaderItensMenuAberto>
                <HeaderItensMenuAberto>Minhas Séries</HeaderItensMenuAberto>
                <HeaderItensMenuAberto>Minha Lista</HeaderItensMenuAberto>
                <HeaderItensMenuAberto onClick={deslogar}>
                  Sair
                </HeaderItensMenuAberto>
              </HeaderMenuAberto>
            )}
          </>
        ) : (
          <>
            {" "}
            <HeaderLoginBotao onClick={abrirModalLogin}>
              Entrar
            </HeaderLoginBotao>
            <Link to="/cadastro">
              <HeaderLoginBotao>Cadastrar</HeaderLoginBotao>
            </Link>
          </>
        )}
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
