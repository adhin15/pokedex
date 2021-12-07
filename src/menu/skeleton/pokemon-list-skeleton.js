import React from "react";
import PokemonSkeleton from "./pokemon-card-skeleton";
const PokemonListSkeleton = () => {
  return (
    <div className="row">
      <div className="col-sm-4 col-6 my-2 px-1">
        <PokemonSkeleton />
      </div>
      <div className="col-sm-4 col-6 my-2 px-1">
        <PokemonSkeleton />
      </div>
      <div className="col-sm-4 col-6 my-2 px-1">
        <PokemonSkeleton />
      </div>
      <div className="col-sm-4 col-6 my-2 px-1">
        <PokemonSkeleton />
      </div>
      <div className="col-sm-4 col-6 my-2 px-1">
        <PokemonSkeleton />
      </div>
      <div className="col-sm-4 col-6 my-2 px-1">
        <PokemonSkeleton />
      </div>
    </div>
  );
};
export default PokemonListSkeleton;
