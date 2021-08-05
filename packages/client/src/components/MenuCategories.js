import React from "react";
import { useSelector } from "react-redux";
import CategoryBtn from "./buttons/CategoryBtn";

const MenuCategories = () => {
  const categories = useSelector((state) => state.data.categories);

  return (
    <>
      <div className="text-center py-3 d-flex justify-content-around align-items-center flex-column flex-md-row">
        {[{ name: "all", id: "0" }, ...categories].map((cat) => (
          <CategoryBtn key={cat.id} name={cat.name} id={cat.id} />
        ))}
      </div>
    </>
  );
};

export default MenuCategories;
