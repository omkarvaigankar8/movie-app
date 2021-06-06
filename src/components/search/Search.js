import React, { useState } from "react";

import { useHistory } from "react-router-dom";
// Styles
import "./Search.css";

function Search() {
  const [search, setSearch] = useState("");
  const history = useHistory();
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("from handleSubmit");
    history.push("/search", {
      name: search,
    });
  };

  const inputChange = (e) => {
    setSearch(e.target.value);
  };

  return (
    <>
      <div className="hero-section">
        <div className="hero-background d-flex justify-content-center align-items-center">
          <h1 className="hero-text">
            Moviefy is a site build to give you Information about your Be-Loved
            Movies{" "}
          </h1>
        </div>
        <div className="search-section my-5">
          <form
            action=""
            className="container d-flex justify-content-center align-items-center"
            onSubmit={handleSubmit}
          >
            <div className="input-group mb-5">
              <input
                type="search"
                className="form-control rounded search-input px-4"
                placeholder="Search"
                aria-label="Search"
                aria-describedby="search-addon"
                onChange={inputChange}
              />
            </div>
          </form>
        </div>
      </div>
    </>
  );
}

export default Search;
