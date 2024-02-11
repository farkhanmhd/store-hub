import PropTypes from "prop-types";
import useCart from "../../hooks/useCart";
import { addToCart, reduceQty } from "../../slices/cartSlice";

const Cart = ({ id, title, image, price, qty, subTotal }) => {
  const { dispatchCart } = useCart();

  const addQtyHandler = () => {
    dispatchCart(addToCart({ id, title, price }));
  };

  const reduceQtyHandler = () => {
    dispatchCart(reduceQty({ id, title, price }));
  };

  return (
    <div
      id={`cart-${id}`}
      className="justify-between mb-6 last-of-type:mb-0 rounded-lg bg-base-100 p-6 shadow-md sm:flex sm:justify-start"
    >
      <img
        src={image}
        alt="product-image"
        className="w-full rounded-lg sm:w-40 aspect-square object-contain bg-white"
      />
      <div className="sm:ml-4 sm:flex sm:w-full sm:justify-between">
        <div className="mt-5 sm:mt-0">
          <h2 className="text-lg font-bold">{title}</h2>
          <p className="mt-1 text-sm">Price : $ {price}</p>
        </div>
        <div className="mt-4 flex justify-between sm:space-y-6 sm:mt-0 sm:block sm:space-x-6">
          <div className="flex items-center border-gray-100">
            <button
              className="cursor-pointer rounded-l bg-base-300 py-1 px-3.5 duration-100 hover:bg-blue-500 hover:text-blue-50"
              onClick={reduceQtyHandler}
            >
              -
            </button>
            <span id="qty" className="px-3">
              {qty}
            </span>
            <button
              className="cursor-pointer rounded-r bg-base-300 py-1 px-3 duration-100 hover:bg-blue-500 hover:text-blue-50"
              onClick={addQtyHandler}
            >
              +
            </button>
          </div>
          <div className="flex items-center space-x-4">
            <p className="text-sm">$ {subTotal}</p>
            <button>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                className="h-5 w-5 cursor-pointer duration-150 hover:text-red-500"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

Cart.propTypes = {
  id: PropTypes.number,
  title: PropTypes.string,
  image: PropTypes.string,
  price: PropTypes.number,
  qty: PropTypes.number,
  subTotal: PropTypes.number,
};

export default Cart;
