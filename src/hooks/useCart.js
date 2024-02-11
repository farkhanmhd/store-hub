import { useSelector, useDispatch } from "react-redux";

const useCart = () => {
  const cart = useSelector((state) => state.product.cart);
  const dispatch = useDispatch();
  return { cart, dispatch };
};

export default useCart;
