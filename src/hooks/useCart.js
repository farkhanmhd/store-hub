import { useSelector, useDispatch } from "react-redux";

const useCart = () => {
  const carts = useSelector((state) => state.carts);
  const dispatchCart = useDispatch();
  return { carts, dispatchCart };
};

export default useCart;
