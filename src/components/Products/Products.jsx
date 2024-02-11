import ProductCard from "./ProductCard";
import PropTypes from "prop-types";

const Products = ({ products }) => {
  return (
    <div id="products" className="p-5">
      <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {products.map((product) => (
          <ProductCard key={product.id} {...product} />
        ))}
      </ul>
    </div>
  );
};

Products.propTypes = {
  products: PropTypes.array,
};

export default Products;
