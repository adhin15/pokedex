import React, { useEffect, useState } from "react";
import { useLocation } from "react-router";
import PokemonComponent from "./component/pokemon.component";
import PokemonListSkeleton from "./skeleton/pokemon-list-skeleton";

const PokemonListWithType = () => {

    const [pokemon, setPokemon] = useState([]);
    const [url] = useState("https://pokeapi.co/api/v2");
    const [loading, setLoading] = useState(false);
    const { pathname } = useLocation();

    useEffect(() => {
        const fetchData = async () => {
            try {
                setLoading(true);
                const response = await fetch(`${url}${pathname}`);
                const result = await response.json();
                setPokemon(result.pokemon);

            }
            catch (err) {
                console.log(err);
            }
            finally {
                setLoading(false);
            }
        }
        fetchData();
    }, [url, pathname])


    return (
        <div className="container-fluid mx-auto" style={{ "max-width": "600px" }}>
            <div className="row text-center mx-auto" >
                <img src="https://res.cloudinary.com/kalografi/image/upload/v1638720416/pokemon/Group_1_lfrxyy.png" alt="" />
            </div >

            <div className="row">
                {loading ? (<PokemonListSkeleton />) : (
                    pokemon.map((item, index) =>
                        <div className="col-sm-4 col-6 my-2 px-1" key={index}>
                            <PokemonComponent name={item.pokemon.name} />
                        </div>
                    )
                )}
            </div>


        </div>
    );
};
export default PokemonListWithType;
