import { useSelector, useDispatch } from "react-redux";
const useUser = () => {
  const username = useSelector((state) => state.user.username);
  const password = useSelector((state) => state.user.password);
  const authed = useSelector((state) => state.user.authed);
  const dispatchUser = useDispatch();
  return { username, password, authed, dispatchUser };
};

export default useUser;
