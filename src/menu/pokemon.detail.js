import { useLocation } from "react-router-dom";
import React, { useEffect, useState } from "react";
import Swal from "sweetalert2";
import { v4 as uuidv4 } from "uuid";
import { ColorType } from "./helper/typecolor";
import { FirstCapital } from "./helper/first-capital";
import { ColorPills } from "./helper/typecolor";

const urlStats = "https://pokeapi.co/api/v2/pokemon";
const urlSpecies = "https://pokeapi.co/api/v2/pokemon-species";

const PokemonDetail = () => {
  const initialState = JSON.parse(localStorage.getItem("myPokemon")) || [];
  const [pokemonData, setPokemonData] = useState({});
  const { pathname } = useLocation();
  const [myPokemon, setMyPokemon] = useState(initialState);
  const [pokemonType, setPokemonType] = useState([]);
  const [pokemonStat, setPokemonStat] = useState([]);
  const [pokemonMoves, setPokemonMoves] = useState([]);
  const [typeColor, setTypeColor] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    localStorage.setItem("myPokemon", JSON.stringify(myPokemon));
  }, [myPokemon]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const response = await fetch(`${urlStats}${pathname}/`);
        const responseSpecies = await fetch(`${urlSpecies}${pathname}/`);
        const result = await response.json();
        const resultSpecies = await responseSpecies.json();

        setPokemonData({
          name: result.name,
          species: resultSpecies.genera[7].genus,
          image: result.sprites.front_default,
          height: result.height,
          weight: result.weight,
          base_experience: result.base_experience,
        });

        setPokemonType(result.types);
        setPokemonStat(result.stats);
        setPokemonMoves(result.moves);
        setTypeColor(result.types[0].type.name);
      } catch (err) {
        console.log(err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [pathname]);

  const checkNickname = (e) => {
    const have = myPokemon.filter((myPokemon) => myPokemon.nickname === e).length;
    if (have === 0) {
      return true;
    } else {
      return false;
    }
  };
  const catchPokemon = () => {
    Swal.fire({
      title: `A wild ${pokemonData.name} appeared! What do you want to do?`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Catch!",
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire({
          title: "Catching Pokemon",
          timer: 2000,
          timerProgressBar: true,
          didOpen: () => {
            Swal.showLoading();
          },
        }).then(() => {
          if (Swal.DismissReason.timer) {
            result.isConfirmed = Math.random() < 0.5;
            if (result.isConfirmed) {
              Swal.fire({
                title: `Gotcha! ${pokemonData.name} has been caught!`,
                input: "text",
                inputValidator: (value) => {
                  if (!value) {
                    return "You need to input something";
                  } else {
                    if (!checkNickname(value)) {
                      return "Nickname already taken!";
                    }
                  }
                },
              }).then((result) => {
                Swal.fire({
                  icon: "success",
                  title: "Pokemon has been captured",
                });
                setMyPokemon([
                  ...myPokemon,
                  { id: uuidv4(), name: pokemonData.name, nickname: result.value },
                ]);
              });
            } else {
              Swal.fire({
                title: `Failed, ${pokemonData.name} run away`,
                icon: "error",
              });
            }
          }
        });
      }
    });
  };

  return (
    <div className="pokemon-detail-container">
      <div
        className="row justify-content-center m-0 pt-5 px-5"
        style={{ background: ColorType(typeColor) }}
      >
        <div className="row  mx-5 justify-content-center ">
          <img
            src={pokemonData.image}
            style={{
              width: "auto",
              minHeight: "178px",
              height: "100%",
              marginBottom: "20px",
            }}
            alt=""
          />
        </div>
        <div className="row px-5 max" style={{ marginBottom: "60px" }}>
          <button className="btn btn-catch" onClick={catchPokemon}>
            Catch Me !
          </button>
        </div>
      </div>

      {loading ? (
        <p className="text-center font-color"> Loading </p>
      ) : (
        <div className="row attribute-container justify-content-center">
          <div className="max">
            <div className="row text-center">
              <h1> {FirstCapital(`${pokemonData.name}`)}</h1>
            </div>
            <div className="row justify-content-center">
              {pokemonType.map((item) => {
                return (
                  <div className="col-sm-6 col-6" key={item.name}>
                    <p className="pills" style={{ background: ColorPills(item.type.name) }}>
                      {FirstCapital(item.type.name)}
                    </p>
                  </div>
                );
              })}
            </div>

            <div className="row">
              <div className="col-sm-6 col-6">
                <div className="row text-center">
                  <p className="font-color" style={{ fontSize: "23px" }}>
                    {pokemonData.weight / 10} kg
                  </p>
                  <p className="color-secondary">Weight</p>
                </div>
              </div>
              <div className="col-sm-6 col-6">
                <div className="row text-center">
                  <p className="font-color" style={{ fontSize: "23px" }}>
                    {pokemonData.height / 10} m
                  </p>
                  <p className="color-secondary">Height</p>
                </div>
              </div>
            </div>

            <div className="row text-center">
              <p className="font-color" style={{ fontSize: "18px" }}>
                Base Stats
              </p>
            </div>

            {pokemonStat.map((item) => {
              return (
                <div className="row my-4 pe-3">
                  <div className="col-sm-6 col-6">
                    <div className="font-color" style={{ fontSize: "14px" }} key={item.stat.name}>
                      {FirstCapital(item.stat.name)} :
                    </div>
                  </div>
                  <div className="col-sm-1 col-1 px-0 my-auto">
                    <div className="font-color" style={{ fontSize: "14px" }}>
                      {item.base_stat}
                    </div>
                  </div>
                  <div className="col-sm-5 col-5 ps-0 pe-3 stat-container my-auto">
                    <div className="stat-bar" style={{ width: `${item.base_stat / 2}%` }}></div>
                  </div>
                </div>
              );
            })}

            <div className="row mt-4 text-center">
              <p className="font-color" style={{ fontSize: "18px" }}>
                Moves
              </p>
            </div>

            <div className="row">
              {pokemonMoves.slice(0, 4).map((item) => {
                return (
                  <div className="col-sm-6 col-6" key={item.name}>
                    <div className="moves-pills mt-2 font-color" style={{ fontSize: "14px" }}>
                      {item.move.name}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
export default PokemonDetail;
