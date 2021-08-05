import React from "react";
import { useSelector } from "react-redux";
import CartItem from "./CartItem";

const Cart = () => {
  const cart = useSelector((state) => state.cart);
  const getTotal = () => {
    let result = 0;
    for (let item of cart) {
      result += item.price * item.amount;
    }
    return result;
  };
  return (
    <div
      className="offcanvas offcanvas-end"
      tabIndex="-1"
      id="panier"
      aria-labelledby="offcanvasRightLabel"
    >
      <div className="offcanvas-header">
        <h3 id="offcanvasRightLabel">Panier</h3>
        <button
          type="button"
          className="btn-close text-reset"
          data-bs-dismiss="offcanvas"
          aria-label="Close"
        ></button>
      </div>
      <div className="offcanvas-body py-0">
        {cart.map((item, index) => (
          <CartItem key={index} data={item} />
        ))}
      </div>

      <div className="panier-footer">
        <div className="row row-cols-12 text-center align-items-center">
          <div className="col total-price">
            <h5>Total</h5>
            <p>{getTotal()} MAD</p>
          </div>
          <div className="col">
            <button
              type="button"
              className="btn btn-success"
              data-bs-toggle="modal"
              data-bs-target="#modal-formulaire"
              data-bs-dismiss="offcanvas"
              disabled={cart.length === 0}
            >
              Commander
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
