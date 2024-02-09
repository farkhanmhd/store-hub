import LoginPage from "./pages/LoginPage";
import { Routes, Route, useNavigate } from "react-router-dom";
import useUser from "./hooks/useUser";
import { getSingleUser, userLogin } from "./utils/api";
import HomePage from "./pages/HomePage";
import { setUserData } from "./slices/userSlice";
import { useEffect } from "react";

export default function App() {
  const { username, password, authed, dispatch } = useUser();
  const navigate = useNavigate();

  useEffect(() => {
    if (!authed) {
      const token = localStorage.getItem("token");
      if (token) {
        const relogin = async () => {
          const data = await getSingleUser(token);
          const { username, password } = data;
          dispatch(setUserData({ username, password, authed: true }));
          navigate("/");
        };

        relogin();
      }
    }
  }, []);

  const onLoginHandler = async (e) => {
    e.preventDefault();
    const data = await userLogin(username, password);
    if (data.status === 200) {
      localStorage.setItem("token", data.token);
      dispatch(setUserData({ username, password, authed: true }));
      navigate("/");
    }
  };

  if (!authed) {
    return (
      <Routes>
        <Route path="/login" element={<LoginPage onLogin={onLoginHandler} />} />
      </Routes>
    );
  }
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
    </Routes>
  );
}
