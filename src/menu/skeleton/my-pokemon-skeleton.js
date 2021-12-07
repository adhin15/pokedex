import React from "react";

const MyPokemonSkeleton = () => {
  return (
    <div className="row">
      <div className="row my-2">
        <div className="card pokemon-card py-0 " style={{ background: "grey", maxHeight: "400px" }}>
          <div className="bg-transparent">
            <div className="row">
              <div className="col-sm-7 col-7 ">
                <div className="row">
                  <img
                    src="https://www.pngitem.com/pimgs/b/20-202138_pokeball-symbol-png.png"
                    alt="..."
                    style={{ width: "100%", maxHeight: "300px", objectFit: "cover" }}
                  />
                </div>
                <div className="row py-0">
                  <button className="btn btn-release mx-auto mb-5">Release</button>
                </div>
              </div>
              <div
                className="col-sm-5 col-5 my-0 ps-4 "
                style={{ background: "grey", borderRadius: "0px 25px 25px 0px" }}
              >
                <div className="my-5">
                  <div className="row text-start my-1">
                    <h3 className="card-title font-color">Loading . . .</h3>
                    <p className="font-color" style={{ fontWeight: "normal" }}>
                      Loading. . .
                    </p>
                  </div>

                  <div className="row justify-content-start">
                    <div className="col">
                      <p
                        className="pills py-1"
                        style={{
                          background: "#e9fffd",
                          borderRadius: "8px",
                          fontSize: "12px",
                          maxWidth: "100px",
                          fontWeight: "bold",
                        }}
                      >
                        Loading. . .
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default MyPokemonSkeleton;
