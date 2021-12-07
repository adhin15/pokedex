import React from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav
      className="navbar navbar-expand-lg navbar-dark bg-dark"
      style={{
        position: "sticky",
        top: "0",
        zIndex: "99",
      }}
    >
      <div className="container-fluid justify-content-center">
        <ul className="navbar-nav " style={{ flexDirection: "unset" }}>
          <li className="nav-item mx-2">
            <Link to="/" className="nav-link">
              Home
            </Link>
          </li>
          <li className="nav-item mx-2">
            <Link to="/mypokemons" className="nav-link">
              My Pokemons
            </Link>
          </li>
          <li className="nav-item mx-2">
            <Link to="/pokemonlist" className="nav-link">
              Pokemons
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
};
export default Navbar;
