import { v4 as uuidv4 } from "uuid";
import React, { useState } from "react";
import DrinkCheck from "./inputs/DrinkCheck";
import { useDispatch } from "react-redux";
import { addCartItem } from "../redux/actions/cart";

const ProductCard = ({ data }) => {
  const { id, name, price, description, category, img_url } = data;
  const dispatch = useDispatch();
  const [formData, setFormData] = useState({
    id: uuidv4(),
    prod_id: id,
    name,
    amount: 1,
    price,
    drinks: category.drinks[0],
    img_url,
  });

  const incrementAmount = () =>
    setFormData({ ...formData, amount: formData.amount + 1 });
  const decrementAmount = () => {
    if (formData.amount > 1) {
      setFormData({ ...formData, amount: formData.amount - 1 });
    }
  };
  const onSubmit = (e) => {
    e.preventDefault();
    dispatch(addCartItem({ ...formData }));
  };
  const onCheckBoxClick = (e) =>
    setFormData({ ...formData, drink: e.target.value });
  return (
    <div className="col-12 col-md-3">
      <div className="card menu-card p-2 my-2">
        <img src={img_url} className="card-img-top" alt={name} />
        <div className="card-body p-0">
          <h5 className="card-title mb-0">{name}</h5>
          <p className="card-text menu-price mb-0">{price} MAD</p>
          <button
            type="button"
            className="btn menu-btn menu-btn-tous"
            data-bs-toggle="modal"
            data-bs-target={`#petit-dej-${id}`}
          >
            AJOUTER
          </button>

          <div
            className="modal fade"
            id={`petit-dej-${id}`}
            tabIndex="-1"
            aria-labelledby="exampleModalLabel"
            aria-hidden="true"
          >
            <div className="modal-dialog modal-dialog-centered">
              <div className="modal-content">
                <div className="modal-header py-1">
                  <img
                    src="./public/images/LOGO.svg"
                    alt=""
                    className="d-inline-block align-text-middle modal-img px-1"
                  />
                  <h5 className="modal-title" id="exampleModalLabel">
                    {name}
                  </h5>
                  <button
                    type="button"
                    className="btn-close"
                    data-bs-dismiss="modal"
                    aria-label="Close"
                  ></button>
                </div>
                <div className="modal-body">
                  <div className="container.fluid">
                    <div className="row align-items-center">
                      <div className="col-6">
                        <img
                          className="img-fluid rounded"
                          src={img_url}
                          alt=""
                        />
                      </div>
                      <div className="col-6"></div>
                    </div>
                    <div className="row align-items-center">
                      <div className="col-6 pt-2">{description}</div>
                      <div className="col-6">
                        <form onSubmit={(e) => e.preventDefault()}>
                          <div className="boisson">
                            {category.drinks.map((drink, index) => (
                              <DrinkCheck
                                key={index}
                                name={drink}
                                onClick={onCheckBoxClick}
                                checked={index === 0}
                              />
                            ))}
                          </div>
                          <div className="quantity py-2">
                            <button
                              className="quantity-btn"
                              onClick={() => decrementAmount()}
                            >
                              -
                            </button>
                            <input
                              type="text"
                              value={formData.amount}
                              readOnly
                            />
                            <button
                              className="quantity-btn"
                              onClick={() => incrementAmount()}
                            >
                              +
                            </button>
                          </div>
                        </form>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="modal-footer py-0">
                  <button
                    className="btn btn menu-btn menu-btn-tous"
                    data-bs-dismiss="modal"
                    onClick={(e) => onSubmit(e)}
                  >
                    <p className="my-0">Valider</p>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
