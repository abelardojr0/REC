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
          <Route path="search" element={<Search />} />
          <Route path="categoriaFilmes" element={<CategoriaFilmes />} />
          <Route path="categoriaSeries" element={<CategoriaSeries />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
