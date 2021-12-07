import React, { useEffect, useState } from "react";
import swal from "sweetalert";
import { ColorType } from "../helper/typecolor";
import { ColorPills } from "../helper/typecolor";
import { FirstCapital } from "../helper/first-capital";

const urlForms = "https://pokeapi.co/api/v2/pokemon/";

const MyPokemonComponent = (props) => {
  const { name, nickname, myPokemonList, setMyPokemonList, id } = props;
  const [pokemonImage, setPokemonImage] = useState("");
  const [typeColor, setTypeColor] = useState("");
  const [pokemonType, setPokemonType] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`${urlForms}${name}/`);
        const result = await response.json();
        setPokemonImage(result.sprites.front_default);
        setTypeColor(result.types[0].type.name);
        setPokemonType(result.types);
      } catch (err) {
        console.log(err);
      }
    };
    fetchData();
  }, [name]);
  const handleDelete = (id) => {
    swal({
      title: `Are you sure to release ${nickname}?`,
      icon: "warning",
      buttons: true,
      dangerMode: true,
    }).then((willDelete) => {
      if (willDelete) {
        setMyPokemonList(myPokemonList.filter((myPokemonList) => myPokemonList.id !== id));
        swal(`${nickname} is released T_T`, {
          icon: "success",
        });
      } else {
        swal("Your pokeomon is safe!");
      }
    });
  };

  return (
    <div
      className="card pokemon-card py-0 "
      style={{ background: ColorType(typeColor), maxHeight: "400px" }}
    >
      <div className="bg-transparent">
        <div className="row">
          <div className="col-sm-7 col-7 ">
            <div className="row">
              <img
                src={pokemonImage}
                style={{
                  width: "100%",
                  minHeight: "178px",
                  maxHeight: "300px",
                  objectFit: "cover",
                }}
                alt="not found"
              />
            </div>
            <div className="row py-0">
              <button
                className="btn btn-release mx-auto mb-5"
                style={{ zIndex: "1" }}
                onClick={() => handleDelete(id)}
              >
                Release
              </button>
            </div>
          </div>
          <div
            className="col-sm-5 col-5 my-0 ps-4 "
            style={{ background: ColorPills(typeColor), borderRadius: "0px 25px 25px 0px" }}
          >
            <div className="my-5">
              <div className="row text-start my-1">
                <h3 className="card-title font-color">{FirstCapital(nickname)}</h3>
                <p className="font-color" style={{ fontWeight: "normal" }}>
                  {FirstCapital(name)}
                </p>
              </div>

              <div className="row justify-content-start">
                <div className="col">
                  {pokemonType.map((item) => {
                    return (
                      <p
                        className="pills py-1"
                        style={{
                          background: "#e9fffd",
                          color: ColorType(item.type.name),
                          borderRadius: "8px",
                          fontSize: "12px",
                          maxWidth: "100px",
                          fontWeight: "bold",
                        }}
                      >
                        {FirstCapital(item.type.name)}
                      </p>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default MyPokemonComponent;
