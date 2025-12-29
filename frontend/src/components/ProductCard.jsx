import React from "react";
import sofapng from "../assets/sofa.png";
import { Link } from "react-router";

const ProductCard = () => {
  return (
    <div className="flex flex-col justify-center gap-4  rounded-lg p-4">
      <Link to="/SingleProduct">
        <img
          src={sofapng}
          alt="Product"
          className="h-80 w-auto p-4 bg-amber-100"
        />
      </Link>

      <h1 className="text-xl ">Product name</h1>
      <p className="text-2xl font-bold">Rs. Price</p>
    </div>
  );
};

export default ProductCard;
