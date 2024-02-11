import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { searchProduct } from "../../utils/util";
import useProducts from "../../hooks/useProducts";
import { setProducts } from "../../slices/productsSlice";
import { getAllProducts } from "../../utils/api";

const SearchInput = () => {
  const [searchValue, setSearchValue] = useState("");
  const { dispatchProducts } = useProducts();
  const [searchParams, setSearchParams] = useSearchParams();
  const [allProducts, setAllProducts] = useState([]);

  useEffect(() => {
    const getProducts = async () => {
      const data = await getAllProducts();
      if (data) {
        dispatchProducts(setProducts(data));
        setAllProducts(data);
      }
    };
    getProducts();
    return () => {};
  }, []);

  const changeSearchParams = (keyword) => {
    setSearchParams({ search: keyword });
  };

  const onSearchHandler = (e) => {
    e.preventDefault();
    const keyword = e.target.value;
    setSearchValue(keyword);
    changeSearchParams(keyword);
  };

  useEffect(() => {
    if (searchValue.length > 0) {
      const searchedProducts = searchProduct(searchValue, allProducts);
      dispatchProducts(setProducts(searchedProducts));
      const titleParam = searchParams.get("search");
      if (titleParam) {
        setSearchParams(searchParams);
      }
    } else {
      dispatchProducts(setProducts(allProducts));
    }

    return () => {};
  }, [
    searchValue,
    allProducts,
    searchParams,
    setSearchParams,
    dispatchProducts,
  ]);

  return (
    <form className="relative mx-auto w-max">
      <input
        type="search"
        className="peer cursor-pointer relative z-10 h-12 w-12 rounded-full focus:border  bg-transparent pl-12 outline-none focus:w-full focus:cursor-text focus:pl-16 focus:pr-4"
        value={searchValue}
        onInput={onSearchHandler}
      />
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="absolute inset-y-0 my-auto h-8 w-12 border-r border-transparent px-3.5 "
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        strokeWidth="2"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
        />
      </svg>
    </form>
  );
};

export default SearchInput;
