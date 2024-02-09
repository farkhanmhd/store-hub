import axios from "axios";
import { jwtDecode } from "jwt-decode";

const ENDPOINT = "https://fakestoreapi.com";

const userLogin = async (username, password) => {
  try {
    const response = await axios.post(`${ENDPOINT}/auth/login`, {
      username,
      password,
    });
    return { status: response.status, token: response.data.token };
  } catch (error) {
    return { status: error.response.status, message: error.response.data };
  }
};

const getUserId = (token) => {
  const decoded = jwtDecode(token);
  const id = decoded.sub;

  return id;
};

const getSingleUser = async (token) => {
  const id = getUserId(token);
  try {
    const response = await axios.get(`${ENDPOINT}/users/${id}`);
    const data = await response.data;
    return data;
  } catch (error) {
    return { status: error.response.status, message: error.response.data };
  }
};

export { userLogin, getSingleUser };
