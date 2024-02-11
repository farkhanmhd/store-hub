import { setUserData } from "../slices/userSlice";
import { useNavigate } from "react-router-dom";
import useUser from "../hooks/useUser";
import Navbar from "../components/Navigation/Navbar";
import Carousel from "../components/Carousel/Carousel";
import Products from "../components/Products/Products";
import { setProducts } from "../slices/productsSlice";
import { useEffect } from "react";
import useProducts from "../hooks/useProducts";
import { getAllProducts } from "../utils/api";

export default function HomePage() {
  const { dispatchUser } = useUser();
  const navigate = useNavigate();
  const { products, dispatchProducts } = useProducts();

  useEffect(() => {
    const getProducts = async () => {
      const data = await getAllProducts();
      if (data) {
        dispatchProducts(setProducts(data));
      }
    };
    getProducts();
    return () => {};
  }, []);

  const onLogoutHandler = () => {
    dispatchUser(setUserData({ username: "", password: "", authed: false }));
    localStorage.removeItem("token");
    navigate("/login");
  };
  return (
    <>
      <Navbar onLogout={onLogoutHandler} />
      <main className="pt-16 bg-gray-100 dark:bg-base-100">
        <Carousel />
        <Products products={products} />
      </main>
    </>
  );
}
