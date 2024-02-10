import { setUserData } from "../slices/userSlice";
import { useNavigate } from "react-router-dom";
import useUser from "../hooks/useUser";
import Navbar from "../components/Navigation/Navbar";

export default function HomePage() {
  const { dispatch } = useUser();
  const navigate = useNavigate();

  const onLogoutHandler = () => {
    dispatch(setUserData({ username: "", password: "", authed: false }));
    localStorage.removeItem("token");
    navigate("/login");
  };
  return (
    <>
      <Navbar onLogout={onLogoutHandler} />
    </>
  );
}
