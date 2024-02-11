import LoginPage from "./pages/LoginPage";
import { Routes, Route, useNavigate } from "react-router-dom";
import useUser from "./hooks/useUser";
import { getSingleUser } from "./utils/api";
import HomePage from "./pages/HomePage";
import { setUserData } from "./slices/userSlice";
import { useEffect } from "react";
import Navbar from "./components/Navigation/Navbar";
import CartPage from "./pages/CartPage";
import useCart from "./hooks/useCart";
import { setCart } from "./slices/cartSlice";

export default function App() {
  const { authed, dispatchUser } = useUser();
  const { dispatchCart } = useCart();
  const navigate = useNavigate();

  useEffect(() => {
    if (!authed) {
      const token = localStorage.getItem("token");
      if (token) {
        const relogin = async () => {
          const data = await getSingleUser(token);
          const { username, password } = data;
          dispatchUser(setUserData({ username, password, authed: true }));
          const cart = localStorage.getItem("cart");
          if (cart) {
            dispatchCart(setCart(JSON.parse(cart)));
          }
        };

        relogin();
      }
    }

    return () => {};
  }, []);

  const onLogoutHandler = () => {
    dispatchUser(setUserData({ username: "", password: "", authed: false }));
    localStorage.removeItem("token");
    navigate("/login");
  };

  if (!authed) {
    return (
      <Routes>
        <Route path="/login" element={<LoginPage />} />
      </Routes>
    );
  }
  return (
    <>
      <Navbar onLogout={onLogoutHandler} />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/cart" element={<CartPage />} />
      </Routes>
    </>
  );
}
