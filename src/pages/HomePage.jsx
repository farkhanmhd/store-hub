import Carousel from "../components/Carousel/Carousel";
import Products from "../components/Products/Products";
import { setProducts } from "../slices/productsSlice";
import { useEffect } from "react";
import useProducts from "../hooks/useProducts";
import { getAllProducts } from "../utils/api";

export default function HomePage() {
  const { products, dispatchProducts } = useProducts();

  useEffect(() => {
    const getProducts = async () => {
      const data = await getAllProducts();
      if (data) {
        dispatchProducts(setProducts(data));
      }
    };
    getProducts();
    return () => {};
  }, []);

  return (
    <>
      <main className="pt-16 bg-base-300">
        <Carousel />
        <Products products={products} />
      </main>
    </>
  );
}
