import React, { useEffect, useState } from "react";
import { ColorType } from "./helper/typecolor";
import { FirstCapital } from "./helper/first-capital";
import { Link } from "react-router-dom";

const Home = () => {
  const [typeList, setTypeList] = useState([]);
  const [input, setInput] = useState("");
  const url = "https://pokeapi.co/api/v2/type";

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`${url}`);
        const result = await response.json();
        setTypeList(result.results);
      } catch (err) {
        console.log(err);
      }
    };
    fetchData();
  }, []);

  const onInputChange = (e) => {
    setInput(e.target.value.toLowerCase());
  };

  return (
    <div className="container max">
      <div className="row text-center mx-auto">
        <img
          src="https://res.cloudinary.com/kalografi/image/upload/v1638720416/pokemon/Group_1_lfrxyy.png"
          alt=""
          style={{ width: "100%", height: "auto" }}
        />
      </div>
      <div className="row my-3 ">
        <div class="input-group mb-3">
          <input
            type="text"
            class="form-control"
            onChange={onInputChange}
            placeholder="Search Pokemon by Name"
          />
          <Link className="button-detail" to={`${input}`}>
            <button class="btn btn-primary" type="submit" id="button-addon2">
              Search
            </button>
          </Link>
        </div>
      </div>
      <div className="row my-4 text-center">
        <p className="font-color" style={{ fontSize: "24px" }}>
          Choose One Type of Pokemon
        </p>
      </div>

      <div className="row text-center">
        {typeList.map((item) => {
          return (
            <div className="col-sm-6 col-6 py-3" key={item.name}>
              <Link className="button-detail" to={`/type/${item.name}`}>
                <div className="bg-transparent">
                  <div
                    className="type-pills font-color"
                    style={{ background: ColorType(item.name) }}
                  >
                    {FirstCapital(item.name)}
                  </div>
                </div>
              </Link>
            </div>
          );
        })}
      </div>
    </div>
  );
};
export default Home;
