import React from "react";

const PokemonSkeleton = () => {
  return (
    <div className="card pokemon-card" style={{ background: "#5e5e5e" }}>
      <div className="row">
        <img src={"https://www.pngitem.com/pimgs/b/20-202138_pokeball-symbol-png.png"} alt="..." />
      </div>
      <div class="row">
        <h5 className="card-title font-color text-center">Loading. . .</h5>
      </div>
    </div>
  );
};
export default PokemonSkeleton;
