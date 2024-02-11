import Cart from "../components/Products/Cart";
import CheckOut from "../components/Products/CheckOut";
import useCart from "../hooks/useCart";
import useUser from "../hooks/useUser";

const CartPage = () => {
  const { cart } = useCart();
  const { username } = useUser();
  return (
    <div className="min-h-screen bg-base-300 pt-20 ">
      <h1 className="mb-10 mt-8 text-5xl text-center font-bold mx-auto">
        {username} Cart
      </h1>
      <div className="mx-auto max-w-5xl justify-center px-6 md:flex md:space-x-6 xl:px-0">
        <div className="rounded-lg md:w-2/3 md:max-h-[70vh] overflow-auto">
          {cart.items.map((item) => (
            <Cart key={item.id} {...item} />
          ))}
        </div>
        <CheckOut
          items={cart.items.length}
          quantityTotal={cart.quantityTotal}
          total={Number(cart.total)}
        />
      </div>
    </div>
  );
};

export default CartPage;
