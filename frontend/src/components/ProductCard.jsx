import React from "react";
import { Link } from "react-router";

const ProductCard = ({ product }) => {
  return (
    <div className="flex flex-col justify-center gap-4 rounded-lg p-4">
      <Link to={`/SingleProduct/${product._id}`}>
        <img
          src={product.images?.[0]}
          alt={product.name}
          className="h-90 w-90 p-4 bg-amber-100 object-cover"
        />
      </Link>

      <h1 className="text-xl">{product.name}</h1>
      <p className="text-2xl font-bold">Rs. {product.price}</p>
    </div>
  );
};

export default ProductCard;
