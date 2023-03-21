import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Cadastro from "./Pages/Cadastro/Cadastro";
import { GlobalStyles } from "./GlobalStyles";
import Home from "./Pages/Home/Home";
import Filme from "./Pages/Filme/Filme";
import Search from "./Pages/Search/Search";
import Serie from "./Pages/Serie/Serie";
import CategoriaFilmes from "./Pages/Categorias/CategoriaFilmes";
import CategoriaSeries from "./Pages/Categorias/CategoriaSeries";
import Filmes from "./Pages/Filmes/Filmes";
import Series from "./Pages/Series/Series";
import Finalizado from "./Pages/Cadastro/Finalizado";
import MeusFilmes from "./Pages/MeusFilmes/MeusFilmes";
import MinhasSeries from "./Pages/MinhasSeries/MinhasSeries";
import ListaDesejo from "./Pages/ListaDesejo/ListaDesejo";
import MinhaConta from "./Pages/MinhaConta/MinhaConta";
import AtualizarUsuario from "./Pages/MinhaConta/AtualizarUsuario";
import ChecarEmail from "./Pages/Cadastro/ChecarEmail";
import Pagina404 from "./Pages/Pagina404/Pagina404";
import EsqueceuSenha from "./Pages/EsqueceuSenha/EsqueceuSenha";
import NovaSenha from "./Pages/NovaSenha/NovaSenha";
function App() {
  return (
    <>
      <GlobalStyles />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/filmes" element={<Filmes />} />
          <Route path="/series" element={<Series />} />
          <Route path="/movie/:id" element={<Filme />} />
          <Route path="/tv/:id" element={<Serie />} />
          <Route path="/cadastro" element={<Cadastro />} />
          <Route path="/checarEmail" element={<ChecarEmail />} />
          <Route path="/finalizado" element={<Finalizado />} />
          <Route path="search" element={<Search />} />
          <Route path="categoriaFilmes" element={<CategoriaFilmes />} />
          <Route path="categoriaSeries" element={<CategoriaSeries />} />
          <Route path="/meusFilmes" element={<MeusFilmes />} />
          <Route path="/minhasSeries" element={<MinhasSeries />} />
          <Route path="/listaDesejo" element={<ListaDesejo />} />
          <Route path="/esqueceuSenha" element={<EsqueceuSenha />} />
          <Route path="/novaSenha" element={<NovaSenha />} />
          <Route path="/minhaConta" element={<MinhaConta />} />
          <Route path="/atualizarConta" element={<AtualizarUsuario />} />
          <Route path="*" element={<Pagina404 />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
