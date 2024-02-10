import { useRef, useEffect } from "react";
import { setUserInput } from "../slices/userSlice";
import useUser from "../hooks/useUser";
import Input from "../components/Input/Input";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import Modal from "../components/Modal/Modal";
import { useNavigate } from "react-router-dom";
import { userLogin } from "../utils/api";
import { setUserData } from "../slices/userSlice";

const LoginPage = () => {
  const usernameRef = useRef(null);
  const navigate = useNavigate();
  useEffect(() => {
    usernameRef.current.focus();
  }, []);

  const { username, password, dispatch } = useUser();

  const onLoginHandler = async (e) => {
    e.preventDefault();
    const data = await userLogin(username, password);
    if (data.status === 200) {
      localStorage.setItem("token", data.token);
      dispatch(setUserData({ username, password, authed: true }));
      navigate("/");
    } else {
      const modal = document.getElementById("my_modal_2");
      modal.showModal();
    }
  };

  return (
    <>
      <Modal text="Username or password is incorrect" title="Login" />
      <div className="flex h-screen flex-1 flex-col justify-center items-center px-6 py-12 lg:px-8 ">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <h2 className="mt-10 text-center text-2xl font-medium leading-9 tracking-tight">
            Sign in to StoreHub
          </h2>
        </div>

        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
          <form
            className="space-y-6"
            action="#"
            method="POST"
            onSubmit={onLoginHandler}
          >
            <div>
              <label
                htmlFor="username"
                className="block text-sm font-medium leading-6"
              >
                Username
              </label>
              <Input
                type="text"
                purpose="username"
                value={username}
                onChange={(e) =>
                  dispatch(
                    setUserInput({ name: "username", value: e.target.value })
                  )
                }
                ref={usernameRef}
              />
            </div>

            <div>
              <div className="flex items-center justify-between">
                <label
                  htmlFor="password"
                  className="block text-sm font-medium leading-6"
                >
                  Password
                </label>
                <div className="text-sm">
                  <Link
                    to="#"
                    className="font-semibold text-indigo-600 hover:text-indigo-500"
                  >
                    Forgot password?
                  </Link>
                </div>
              </div>
              <Input
                type="password"
                purpose="password"
                value={password}
                onChange={(e) =>
                  dispatch(
                    setUserInput({ name: "password", value: e.target.value })
                  )
                }
              />
            </div>

            <div>
              <button
                type="submit"
                className="p-3 flex w-full justify-center rounded-md bg-indigo-600 px-3 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                Sign in
              </button>
            </div>
          </form>

          <p className="mt-10 text-center text-sm text-gray-500">
            {`Don't have an account? `}
            <Link
              to="/register"
              className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500"
            >
              Register
            </Link>
          </p>
        </div>
      </div>
    </>
  );
};

LoginPage.propTypes = {
  onLogin: PropTypes.func.isRequired,
};

export default LoginPage;
