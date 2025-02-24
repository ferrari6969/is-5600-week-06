import React, { useState, useEffect } from "react";
import Card from "./Card";
import Button from "./Button";
import Search from "./Search"; 

const CardList = ({ data }) => {
  const limit = 10; 
  const [offset, setOffset] = useState(0); 
  const [filteredProducts, setFilteredProducts] = useState(data); 
  const [products, setProducts] = useState([]); 

  const filterTags = (searchTerm) => {
    if (!searchTerm) {
      setFilteredProducts(data); 
    } else {
      const lowerCaseSearch = searchTerm.toLowerCase();

      const filtered = data.filter((product) =>
        Array.isArray(product.tags) && 
        product.tags.some(
          (tag) =>
            typeof tag.title === "string" && 
            tag.title.toLowerCase().includes(lowerCaseSearch)
        )
      );

      setFilteredProducts(filtered);
    }
    setOffset(0); 
  };

  const handlePagination = (direction) => {
    setOffset((prevOffset) => {
      const newOffset = prevOffset + direction * limit;
      return Math.max(0, Math.min(newOffset, filteredProducts.length - limit));
    });
  };

  useEffect(() => {
    setProducts(filteredProducts.slice(offset, offset + limit));
  }, [offset, filteredProducts]);

  return (
    <div className="cf pa2">
      {}
      <Search handleSearch={filterTags} />

      {}
      <div className="mt2 mb2">
        {products.length > 0 ? (
          products.map((product) => <Card key={product.id} {...product} />)
        ) : (
          <p className="tc">No products found.</p>
        )}
      </div>

      {}
      {filteredProducts.length > limit && (
        <div className="flex items-center justify-center pa4">
          <Button text="Previous" handleClick={() => handlePagination(-1)} disabled={offset === 0} />
          <Button
            text="Next"
            handleClick={() => handlePagination(1)}
            disabled={offset + limit >= filteredProducts.length}
          />
        </div>
      )}
    </div>
  );
};

export default CardList;