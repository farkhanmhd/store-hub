import { useSelector, useDispatch } from "react-redux";

const useProducts = () => {
  const products = useSelector((state) => state.products);
  const dispatchProducts = useDispatch();
  return { products, dispatchProducts };
};

export default useProducts;
