import React, { useEffect, useState } from "react";
import PokemonComponent from "./component/pokemon.component";
import PokemonListSkeleton from "./skeleton/pokemon-list-skeleton";


const PokemonList = () => {
    const [pokemon, setPokemon] = useState([]);
    const url = "https://pokeapi.co/api/v2/pokemon?limit=";
    const [loading, setLoading] = useState(false);
    const [limit, setLimit] = useState(25);


    useEffect(() => {

        const fetchData = async () => {
            try {
                setLoading(true);
                const response = await fetch(`${url}${limit}`);
                const result = await response.json();
                setPokemon(result.results);

            }
            catch (err) {
                console.log(err);
            }
            finally {
                setLoading(false);
            }

        }
        fetchData();
    }, [url, limit])


    const loadMore = () => {
        setLimit(limit + 25);
    }


    return (
        <div className="container-fluid mx-auto" style={{ "maxWidth": "600px" }}>
            <div className="row text-center mx-auto" >
                <img src="https://res.cloudinary.com/kalografi/image/upload/v1638720416/pokemon/Group_1_lfrxyy.png"
                    alt="" style={{ width: "100%", height: "auto" }} />
            </div >

            <div className="row">
                {loading ? (<PokemonListSkeleton />) : (
                    pokemon.map((pokemon, index) =>
                        <div className="col-sm-4 col-6 my-2 px-1" key={index}>
                            <PokemonComponent name={pokemon.name} />
                        </div>
                    )
                )}
            </div>
            <div className="row my-4">
                <div className="col text-center">
                    <button className="btn btn-primary" onClick={loadMore}>Load More</button>
                </div>
            </div>


        </div>

    );
};
export default PokemonList;
