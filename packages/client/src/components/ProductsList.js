import React from "react";
import { useSelector } from "react-redux";
import ProductCard from "./ProductCard";

const ProductsList = () => {
  const products = useSelector((state) => state.data.products);
  const activeCategory = useSelector(
    (state) => state.userInterface.activeCategory
  );

  return (
    <div id="plateaux-repas" className="row text-center py-3">
      {products
        .filter((prod) => {
          if (activeCategory === "0" || prod.category.id === activeCategory) {
            return true;
          }
          return false;
        })
        .map((prod) => (
          <ProductCard key={prod.id} data={prod} />
        ))}
    </div>
  );
};

export default ProductsList;
