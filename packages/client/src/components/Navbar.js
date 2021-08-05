import React from "react";

const Navbar = () => {
  return (
    <section id="navbar-section">
      <div className="container-fluid px-0">
        <nav className="navbar navbar-expand-lg navbar-light py-0 fixed-top">
          <div className="container-fluid d-flex">
            <a className="navbar-brand" href="/#">
              <img
                src="./public/images/LOGO.svg"
                alt=""
                className="d-inline-block align-text-middle"
              />
            </a>

            <div className="order-lg-4">
              <button
                type="button"
                className="panier-button"
                data-bs-toggle="offcanvas"
                data-bs-target="#panier"
                aria-controls="offcanvasRight"
              >
                <img
                  src="./public/images/panier.svg"
                  className="panier-img"
                  data-bs-toggle="offcanvas"
                  data-bs-target="#panier"
                  aria-controls="offcanvasRight"
                  alt=""
                />
              </button>

              <button
                className="navbar-toggler p-0"
                type="button"
                data-bs-toggle="collapse"
                data-bs-target="#navbarNav"
                aria-controls="navbarNav"
                aria-expanded="false"
                aria-label="Toggle navigation"
              >
                <img
                  src="./public/images/burger.svg"
                  className="burger"
                  alt=""
                />
              </button>
            </div>

            <div
              className="collapse navbar-collapse text-center justify-content-end px-4"
              id="navbarNav"
            ></div>
          </div>
        </nav>
      </div>
    </section>
  );
};

export default Navbar;
