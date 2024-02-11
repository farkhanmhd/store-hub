import PropTypes from "prop-types";

const CheckOut = ({ items, quantityTotal, total }) => {
  return (
    <div className="mt-6 h-full rounded-lg bg-base-100 p-6 shadow-md md:mt-0 md:w-1/3">
      <div className="flex justify-between">
        <p className="">Total Items</p>
        <p className="">{items}</p>
      </div>
      <div className="flex justify-between">
        <p className="">Total Qty</p>
        <p className="">{quantityTotal}</p>
      </div>
      <div className="mb-2 flex justify-between">
        <p className="">Total</p>
        <p className="">${total}</p>
      </div>
      <div className="flex justify-between">
        <p className="">Shipping</p>
        <p className="">$4.99</p>
      </div>
      <hr className="my-4" />
      <div className="flex justify-between">
        <p className="text-lg font-bold">Total</p>
        <div className="">
          <p className="mb-1 text-lg font-bold">
            $ {parseFloat(total + 4.99).toFixed(2)} USD
          </p>
          <p className="text-sm ">including VAT</p>
        </div>
      </div>
      <button className="mt-6 w-full rounded-md bg-blue-500 py-1.5 font-medium text-blue-50 hover:bg-blue-600 duration-300">
        Check out
      </button>
    </div>
  );
};

CheckOut.propTypes = {
  items: PropTypes.number.isRequired,
  quantityTotal: PropTypes.number.isRequired,
  total: PropTypes.number.isRequired,
};

export default CheckOut;
