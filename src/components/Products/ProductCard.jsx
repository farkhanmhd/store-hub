import PropTypes from "prop-types";
import { Link } from "react-router-dom";

const ProductCard = ({ id, title, description, price, image }) => {
  return (
    <li>
      <Link to={`/products/${id}`}>
        <div className="mx-auto mt-11 transform overflow-hidden rounded-lg duration-300 shadow-md">
          <div className="image-container bg-white rounded-lg">
            <img
              className="w-full object-contain object-center aspect-[10/16] rounded-lg"
              src={image}
              alt="Product Image"
              loading="lazy"
            />
          </div>
          <div className="p-4">
            <h2 className="mb-2 text-lg font-medium text-basetext-ellipsis line-clamp-1 overflow-hidden">
              {title}
            </h2>
            <p className="mb-2 text-basetext-ellipsis line-clamp-2 overflow-hidden">
              {description}
            </p>
            <div className="flex items-center">
              <p className="mr-2 text-lg font-semibold">${price}</p>
              <button className="btn btn-ghost">Add to Cart</button>
            </div>
          </div>
        </div>
      </Link>
    </li>
  );
};

ProductCard.propTypes = {
  id: PropTypes.number.isRequired,
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  price: PropTypes.number.isRequired,
  image: PropTypes.string.isRequired,
};

export default ProductCard;
