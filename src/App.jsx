import LoginPage from "./pages/LoginPage";
import { Routes, Route, useNavigate } from "react-router-dom";
import useUser from "./hooks/useUser";
import { getSingleUser } from "./utils/api";
import HomePage from "./pages/HomePage";
import { setUserData } from "./slices/userSlice";
import { useEffect } from "react";

export default function App() {
  const { authed, dispatchUser } = useUser();
  const navigate = useNavigate();

  useEffect(() => {
    if (!authed) {
      const token = localStorage.getItem("token");
      if (token) {
        const relogin = async () => {
          const data = await getSingleUser(token);
          const { username, password } = data;
          dispatchUser(setUserData({ username, password, authed: true }));
          navigate("/");
        };

        relogin();
      }
    }
  }, []);

  if (!authed) {
    return (
      <Routes>
        <Route path="/login" element={<LoginPage />} />
      </Routes>
    );
  }
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
    </Routes>
  );
}
