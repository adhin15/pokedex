import React, { useEffect, useState } from "react";
import MyPokemonComponent from "./component/my-pokemon.component";
import MyPokemonSkeleton from "./skeleton/pokemon-list-skeleton";

const MyPokemons = () => {
  const getPokemon = JSON.parse(localStorage.getItem("myPokemon")) || [];
  const [myPokemonList, setMyPokemonList] = useState(getPokemon);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    localStorage.setItem("myPokemon", JSON.stringify(myPokemonList));
    setLoading(false);
  }, [myPokemonList]);

  return (
    <div className="container-fluid" style={{ "max-width": "600px" }}>
      <div className="row text-center my-3">
        <h1 className="font-color">My Pokemons</h1>
      </div>
      <div className="row justify-content-center">
        {loading ? (
          <MyPokemonSkeleton />
        ) : (
          myPokemonList.map((pokemon) => {
            return (
              <div className="row my-2 " key={pokemon.id}>
                <MyPokemonComponent
                  name={pokemon.name}
                  nickname={pokemon.nickname}
                  myPokemonList={myPokemonList}
                  setMyPokemonList={setMyPokemonList}
                  id={pokemon.id}
                />
              </div>
            );
          })
        )}
      </div>
    </div>
  );
};
export default MyPokemons;
