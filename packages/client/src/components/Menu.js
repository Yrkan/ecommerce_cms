import React from "react";
import MenuCategories from "./MenuCategories";
import ProductsList from "./ProductsList";

const Menu = () => {
  return (
    <section className="section">
      <div className="container">
        <div className="row">
          <div className="col-12 text-center">
            <h1 className="my-0">MENU</h1>
          </div>
        </div>
        <MenuCategories />
        <ProductsList />
      </div>
    </section>
  );
};

export default Menu;
