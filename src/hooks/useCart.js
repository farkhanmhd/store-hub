import { useSelector, useDispatch } from "react-redux";

const useCart = () => {
  const cart = useSelector((state) => state.cart);
  const dispatchCart = useDispatch();
  return { cart, dispatchCart };
};

export default useCart;
