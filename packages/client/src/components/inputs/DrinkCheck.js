import React from "react";

const DrinkCheck = ({ name, checked, onClick }) => {
  return (
    <div className="form-check">
      <input
        className="form-check-input"
        type="radio"
        name="flexRadioDefault"
        id={`flexRadioDefault${name}`}
        defaultChecked={checked}
        value={name}
        onClick={(e) => onClick(e)}
      />
      <label className="form-check-label" htmlFor={`flexRadioDefault${name}`}>
        {name}
      </label>
    </div>
  );
};

export default DrinkCheck;
