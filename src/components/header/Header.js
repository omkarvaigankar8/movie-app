import React from "react";
import "./Header.css";
// component
import logo from "../../Images/logo.svg";

function header() {
  return (
    <>
      <nav className="navbar navbar-dark header-nav">
        <div className="container-fluid d-flex justify-content-center align-items-center">
          <a className="navbar-brand logo-link" href="/">
            Moviefy
            <img
              src={logo}
              alt=""
              className="img-logo d-inline-block align-text-top"
            />
          </a>
        </div>
      </nav>
    </>
  );
}

export default header;
