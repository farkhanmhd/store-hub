import useProducts from "../hooks/useProducts";
import { useParams } from "react-router-dom";
import { useState } from "react";
import useCart from "../hooks/useCart";
import { addWithQty } from "../slices/cartSlice";
import { useEffect } from "react";
import { getAllProducts } from "../utils/api";
import { setProducts } from "../slices/productsSlice";
import useUser from "../hooks/useUser";
import Modal from "../components/Modal/Modal";

const ProductPage = () => {
  const { username } = useUser();
  const { dispatchProducts } = useProducts();
  const { id } = useParams();
  const [product, setProduct] = useState({});
  const productId = Number(
    id
      .split("")
      .filter((char) => Number(char))
      .join("")
  );

  useEffect(() => {
    const getProducts = async () => {
      const data = await getAllProducts();
      if (data) {
        dispatchProducts(setProducts(data));
        setProduct(data.find((product) => product.id === productId));
      }
    };
    getProducts();
    return () => {};
  }, []);

  const { dispatchCart } = useCart();
  const [qtyToBuy, setQtyToBuy] = useState(1);

  const qtyChangeHandler = (e) => {
    const newQty = Number(e.target.value);
    const regex = /^[0-9]\d*$/;
    if (regex.test(newQty)) {
      setQtyToBuy(newQty);
    }
  };

  const addQtyHandler = () => {
    if (qtyToBuy > 0) {
      dispatchCart(
        addWithQty({
          username,
          id: productId,
          title: product.title,
          description: product.description,
          price: product.price,
          image: product.image,
          qty: qtyToBuy,
        })
      );
      const modal = document.getElementById("my_modal_2");
      modal.showModal();
    }
  };

  return (
    <section className="body-font overflow-hidden min-h-screen text-base-content">
      <Modal
        text={`${qtyToBuy} ${product.title} has been Added to cart!`}
        title={"Add to Cart"}
      />
      <div className="container px-5 py-24 mx-auto">
        <div className="lg:w-4/5 mx-auto flex flex-wrap">
          <img
            alt="ecommerce"
            className="lg:w-1/2 w-full object-contain object-center rounded-lg border bg-white p-10 aspect-square"
            src={product.image}
          />
          <div className="lg:w-1/2 w-full lg:pl-10 lg:py-6 mt-6 lg:mt-0">
            <h1 className="text-3xl title-font font-medium mb-1">
              {product.title}
            </h1>

            <p className="leading-relaxed">{product.description}</p>
            <div className="flex mt-6 items-center pb-5 border-b-2 border-gray-200 mb-5">
              <div className="flex items-center">
                <span className="mr-3">Qty to buy</span>
                <div className="relative">
                  <input
                    type="text"
                    placeholder="Qty"
                    className="input input-bordered input-primary w-[100px] text-right"
                    value={qtyToBuy}
                    onChange={qtyChangeHandler}
                  />
                </div>
              </div>
            </div>
            <div className="flex items-center">
              <span className="title-font font-medium text-2xl">
                ${product.price}
              </span>
              <button
                className="flex btn btn-primary ml-auto text-white  border-0 py-2 px-6 focus:outline-none "
                onClick={addQtyHandler}
              >
                Add to Cart
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProductPage;
