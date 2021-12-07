import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { ColorType } from "../helper/typecolor";
import { FirstCapital } from "../helper/first-capital";

const urlForms = "https://pokeapi.co/api/v2/pokemon/";

const PokemonComponent = (props) => {
  const { name } = props;

  const [totalOwned, setTotalOwned] = useState(0);
  const [pokemonImage, setPokemonImage] = useState("");
  const [typeColor, setTypeColor] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`${urlForms}${name}/`);
        const result = await response.json();
        setPokemonImage(result.sprites.front_default);
        setTypeColor(result.types[0].type.name);
      } catch (err) {
        console.log(err);
      }
    };

    const countTotalOwned = async () => {
      try {
        const countPokemon =
          JSON.parse(localStorage.getItem("myPokemon")).filter(
            (MyPokemon) => MyPokemon.name === name
          ).length || 0;
        setTotalOwned(countPokemon);
      } catch (err) {
        console.log(err);
      }
    };
    fetchData();
    countTotalOwned();
  }, [name]);

  return (
    <div className="card pokemon-card" style={{ background: ColorType(typeColor) }}>
      <Link to={`/${name}`} className="button-detail">
        <div className="bg-transparent">
          <div className="row">
            <img src={pokemonImage} style={{ minHeight: "178px" }} />
          </div>
          <div class="row">
            <h5 className="card-title font-color text-center">{FirstCapital(name)}</h5>
            <p className="text-center font-color" style={{ fontSize: "12px" }}>
              Owned : {totalOwned}{" "}
            </p>
          </div>
        </div>
      </Link>
    </div>
  );
};
export default PokemonComponent;
