import axios from "axios";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import Carousel from "./components/Carousel";
import Cart from "./components/Cart";
import CheckoutModal from "./components/CheckoutModal";
import Description from "./components/Description";
import Footer from "./components/Footer";
import Loading from "./components/Loading";
import Menu from "./components/Menu";
import MenuesDescription from "./components/MenuesDescription";
import Navbar from "./components/Navbar";
import { setCategories, setProducts } from "./redux/actions/data";
import "./styles/style.css";

export const API = "https://restaurant-server-43443.herokuapp.com/api/v1";

const App = () => {
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    const fetchProducts = async () => {
      const res = await axios.get(`${API}/products`);
      dispatch(setProducts(res.data));
    };

    const fetchCategories = async () => {
      const res = await axios.get(`${API}/categories`);
      dispatch(setCategories(res.data));
    };

    fetchProducts();
    fetchCategories().then(() => setIsLoading(false));
    // eslint-disable-next-line
  }, []);

  return (
    <div className="App">
      {isLoading ? (
        <Loading />
      ) : (
        <>
          {" "}
          <Navbar />
          <Cart />
          <>
            <Carousel />
            <Description />
            <MenuesDescription />
            <Menu />
            <CheckoutModal />
          </>
          <Footer />
        </>
      )}
    </div>
  );
};

export default App;
