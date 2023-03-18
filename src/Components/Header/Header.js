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
import home from "../../Images/home-icon.png";
import filmes from "../../Images/filmes-icon.png";
import series from "../../Images/series-icon.png";
import login from "../../Images/login-icon.png";
import cadastrar from "../../Images/cadastrar-icon.png";
import my_series from "../../Images/my-series-icon.png";
import my_filmes from "../../Images/my-filmes-icon.png";
import desejo from "../../Images/desejo-icon.png";
import { Link, useNavigate } from "react-router-dom";
import Login from "../../Pages/Login/Login";
import { bubble as Menu } from "react-burger-menu";
import "./styles.css";

const Header = () => {
  const [loginStatus, setLoginStatus] = React.useState(false);
  const [ativa, setAtiva] = React.useState("");
  const [search, setSearch] = React.useState("");
  const [menuAberto, setMenuAberto] = React.useState(false);
  const [inputVisivel, setInputVisivel] = React.useState(false);
  const [menuMobile, setMenuMobile] = React.useState(false);
  const navigate = useNavigate();
  const nome_usuario =
    localStorage.getItem("nome") || sessionStorage.getItem("nome");
  const inputRef = React.useRef(null);

  React.useEffect(() => {
    if (inputVisivel) {
      inputRef.current.focus();
    }
  }, [inputVisivel]);

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
    setInputVisivel(true);
  }
  function esconderPesquisa(e) {
    if (e.target.value.length > 0) {
      return;
    } else {
      setAtiva("");
      setInputVisivel(false);
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
    sessionStorage.clear();
    navigate("/");
    window.location.reload(true);
  }

  function fecharMenu(e) {
    if (e.target.getAttribute("id") !== "menu_aberto") {
      setMenuAberto(false);
    }
  }
  window.addEventListener("click", fecharMenu);
  React.useEffect(() => {
    if (window.innerWidth <= 768) {
      setMenuMobile(true);
      setAtiva("ativo");
      setInputVisivel(true);
    }
  }, []);
  return (
    <HeaderComponent>
      {!menuMobile ? (
        <>
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
                ref={inputRef}
                value={search}
              />
              <HeaderPesquisarBotao
                id="pesquisar_botao"
                onClick={mostrarPesquisa}
                type="submit"
              />
            </HeaderPesquisarContainerBarra>
          </HeaderPesquisarContainer>
        </>
      ) : (
        <>
          <Menu>
            <HeaderLogo
              style={{ alignSelf: "center", marginBottom: "20px" }}
              src={logo}
              alt="logo"
            />
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
                  ref={inputRef}
                  value={search}
                />
                <HeaderPesquisarBotao
                  id="pesquisar_botao"
                  onClick={mostrarPesquisa}
                  type="submit"
                />
              </HeaderPesquisarContainerBarra>
            </HeaderPesquisarContainer>
            <HeaderLink to="/">
              {" "}
              <img src={home} alt="home-icon" />
              Início
            </HeaderLink>
            <HeaderLink to="/filmes">
              {" "}
              <img src={filmes} alt="home-icon" /> Filmes
            </HeaderLink>
            <HeaderLink to="/series">
              {" "}
              <img src={series} alt="home-icon" />
              Séries
            </HeaderLink>

            {nome_usuario ? (
              <>
                <HeaderLink to="/meusFilmes">
                  {" "}
                  <img src={my_filmes} alt="home-icon" />
                  Meus Filmes
                </HeaderLink>
                <HeaderLink to="/minhasSeries">
                  {" "}
                  <img src={my_series} alt="home-icon" />
                  Minhas Séries
                </HeaderLink>
                <HeaderLink to="/listaDesejo">
                  {" "}
                  <img src={desejo} alt="home-icon" />
                  Lista de Desejos
                </HeaderLink>
              </>
            ) : (
              <>
                <HeaderLink onClick={abrirModalLogin}>
                  <img src={login} alt="login-icon" /> Entrar
                </HeaderLink>
                <HeaderLink to="/cadastro">
                  {" "}
                  <img src={cadastrar} alt="cadastrar-icon" />
                  Cadastrar
                </HeaderLink>
              </>
            )}
          </Menu>
          <Link to="/">
            <HeaderLogo src={logo} alt="logo" />
          </Link>
        </>
      )}

      <HeaderLogin>
        {nome_usuario ? (
          <>
            <HeaderMenuUsuario id="menu_aberto" onClick={abrirMenu}>
              {nome_usuario[0].toLocaleUpperCase()}
            </HeaderMenuUsuario>
            {menuAberto && (
              <HeaderMenuAberto id="menu_aberto">
                <HeaderMenuAbertoCabeçalho>
                  <HeaderMenuUsuario>
                    {nome_usuario[0].toLocaleUpperCase()}
                  </HeaderMenuUsuario>
                  <HeaderItensMenuAberto to="/minhaConta">
                    {nome_usuario}
                  </HeaderItensMenuAberto>
                </HeaderMenuAbertoCabeçalho>
                <HeaderItensMenuAberto to="/meusFilmes">
                  Meus Filmes
                </HeaderItensMenuAberto>
                <HeaderItensMenuAberto to="/minhasSeries">
                  Minhas Séries
                </HeaderItensMenuAberto>
                <HeaderItensMenuAberto to="/listaDesejo">
                  Minha Lista
                </HeaderItensMenuAberto>
                <HeaderItensMenuAberto to="/minhaConta">
                  Minha Conta
                </HeaderItensMenuAberto>
                <HeaderItensMenuAberto onClick={deslogar}>
                  Sair
                </HeaderItensMenuAberto>
              </HeaderMenuAberto>
            )}
          </>
        ) : (
          <>
            {!menuMobile && (
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
