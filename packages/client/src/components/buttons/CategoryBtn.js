import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { setActiveCategory } from "../../redux/actions/userInterface";

const CategoryBtn = ({ name, id }) => {
  const dispatch = useDispatch();
  const activeId = useSelector((state) => state.userInterface.activeCategory);

  const btn_type = activeId === id ? "menu-btn-tous" : "menu-btn-autre";
  const onClick = () => dispatch(setActiveCategory(id));

  return (
    <div>
      <button
        className={`menu-btn px-4 m-1 rounded ${btn_type}`}
        onClick={() => onClick()}
      >
        {name}
      </button>
    </div>
  );
};

export default CategoryBtn;
