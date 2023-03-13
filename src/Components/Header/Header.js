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
  const [menuAberto, setMenuAberto] = React.useState(false);
  const [inputVisivel, setInputVisivel] = React.useState(false);
  const navigate = useNavigate();
  const nome_usuario = localStorage.getItem("nome");
  const inputRef = React.useRef(null);
  // const id_usuario = localStorage.getItem("id");

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
    navigate("/");
    window.location.reload(true);
  }

  function fecharMenu(e) {
    if (e.target.getAttribute("id") !== "menu_aberto") {
      setMenuAberto(false);
    }
  }
  window.addEventListener("click", fecharMenu);
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
