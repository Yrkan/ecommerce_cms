import axios from "axios";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { API } from "../App";
import { clearCart } from "../redux/actions/cart";
import Alert from "./Alert";
const CheckoutModal = () => {
  const [formData, setFormData] = useState({
    fname: "",
    lname: "",
    phone: "",
    email: "",
    address: "",
  });
  const [badPhone, setBadPhone] = useState(false);
  const [status, setStatus] = useState("ordering");
  const cart = useSelector((state) => state.cart);
  const dispatch = useDispatch();

  const maroc_phone_re = new RegExp("0[567][0-9]{8}");
  const onInputChage = (e) => {
    const { name, value } = e.target;
    // re_validate phone if already set as err
    if (name === "phone" && badPhone && maroc_phone_re.test(value)) {
      setBadPhone(false);
    }
    setFormData({ ...formData, [name]: value });
  };

  const onFormSubmit = async (e) => {
    e.preventDefault();
    const { fname, lname, phone, address, email } = formData;
    // validate phone
    if (!maroc_phone_re.test(phone)) {
      setBadPhone(true);
      return;
    }
    const payload = {
      products: cart.map((el) => el.prod_id),
      quantities: cart.map((el) => el.amount),
      drinks: cart.map((el) => el.drinks),
      client_name: `${fname} ${lname}`,
      client_phone: phone,
      client_location: address,
    };
    if (email) {
      payload.client_email = email;
    }

    try {
      const res = await axios.post(`${API}/orders`, payload);
      if (res.status !== 200) {
        // failed
        setStatus("failed");
        return;
      }
      // clear the cart
      dispatch(clearCart());
      setStatus("done");
    } catch (err) {
      setStatus("failed");
    }
  };

  const resetModalStatus = () => {
    setStatus("ordering");
  };
  return (
    <div
      className="modal fade formulaire"
      id="modal-formulaire"
      tabIndex="-1"
      aria-labelledby="exampleModalLabel"
      aria-hidden="true"
      data-bs-backdrop="static"
    >
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-header">
            <img
              src="./public/images/logo-max.svg"
              className="modal-img px-2"
              alt=""
            />
            <h5 className="modal-title" id="exampleModalLabel">
              {status[0].toUpperCase() + status.substring(1)}
            </h5>
            <button
              type="button"
              className="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
              onClick={() => resetModalStatus()}
            ></button>
          </div>
          <div className="modal-body ">
            {status === "ordering" ? (
              <form onSubmit={(e) => onFormSubmit(e)}>
                <div className="row">
                  <div className="col-6">
                    <label htmlFor="first-name" className="form-label">
                      Nom
                    </label>
                    <br />
                    <input
                      type="text"
                      name="fname"
                      className="form-label"
                      value={formData.fname}
                      onChange={(e) => onInputChage(e)}
                      required={true}
                    />
                  </div>
                  <div className="col-6">
                    <label htmlFor="last-name" className="form-label">
                      Prénom
                    </label>
                    <br />
                    <input
                      type="text"
                      name="lname"
                      className="form-label"
                      value={formData.lname}
                      onChange={(e) => onInputChage(e)}
                      required={true}
                    />
                  </div>
                  <div className="col-6">
                    <label htmlFor="phone-number" className="form-label">
                      Téléphone
                    </label>
                    <br />
                    <input
                      type="text"
                      name="phone"
                      className={`form-label ${badPhone && "err_input"}`}
                      value={formData.phone}
                      onChange={(e) => onInputChage(e)}
                      required={true}
                    />
                  </div>
                  <div className="col-6">
                    <label htmlFor="email" className="form-label">
                      Email
                    </label>
                    <br />
                    <input
                      type="email"
                      name="email"
                      className="form-label"
                      value={formData.email}
                      onChange={(e) => onInputChage(e)}
                    />
                  </div>
                  <div className="col-12">
                    <label htmlFor="phone-number" className="form-label">
                      Adresse
                    </label>
                    <textarea
                      cols="10"
                      rows="5"
                      name="address"
                      className="form-label px-2"
                      required
                      value={formData.address}
                      onChange={(e) => onInputChage(e)}
                    />
                    <br />
                  </div>
                </div>
                <div className="modal-footer">
                  <input
                    type="submit"
                    value="Confirmer"
                    className="btn btn-success"
                  />
                </div>
              </form>
            ) : status === "done" ? (
              <Alert
                type="success"
                message="Your order has been received successfully"
              />
            ) : (
              <Alert
                type="danger"
                message="We couldn't save your order, please try again later"
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CheckoutModal;
