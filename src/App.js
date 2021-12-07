import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import Navbar from "./navbar";
import PokemonList from "./menu/pokemon-list";
import MyPokemons from "./menu/my-pokemons";
import PokemonDetail from "./menu/pokemon.detail";
import Home from "./menu/home";
import PokemonListWithType from "./menu/pokemon-list-from-type";

function App() {
  return (
    <div className="App">
      <div className="container-fluid px-0">
        <Router>
          <Navbar />
          <Routes basename="/">
            <Route path="/" exact element={<Home />} />
            <Route path="/:name" element={<PokemonDetail />} />
            <Route path="/mypokemons" element={<MyPokemons />} />
            <Route path="/pokemonlist" element={<PokemonList />} />
            <Route path="/type/:type" element={<PokemonListWithType />} />
          </Routes>
        </Router>
      </div>
    </div>
  );
}

export default App;
