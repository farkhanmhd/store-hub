const searchProduct = (searchTerm, products) => {
  return products.filter((product) =>
    product.title.toLowerCase().includes(searchTerm.toLowerCase())
  );
};

export { searchProduct };
