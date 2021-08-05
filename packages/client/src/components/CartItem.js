import React from "react";
import { useDispatch } from "react-redux";
import { removeCartItem } from "../redux/actions/cart";

const CartItem = ({ data }) => {
  const { id, name, amount, price, img_url } = data;
  const dispatch = useDispatch();

  const cartItemDelete = () => {
    dispatch(removeCartItem(id));
  };

  return (
    <div className="row article-en-panier rounded py-1 my-2 text-center">
      <div className="col-12">
        <div className="col">
          <h5>{name}</h5>
        </div>
      </div>
      <div className="col-4">
        <div className="row row-cols-12">
          <div className="col">
            <img src={img_url} alt="" />
          </div>
        </div>
      </div>
      <div className="col-3 px-0">
        <h5>Quantity</h5>
        <p>{amount}</p>
      </div>
      <div className="col-3 px-0">
        <h5>Price</h5>
        <p>{price * amount} MAD</p>
      </div>
      <div className="col-2">
        <button
          type="button"
          className="btn-annuler-article rounded"
          onClick={() => cartItemDelete()}
        >
          X
        </button>
      </div>
    </div>
  );
};

export default CartItem;
