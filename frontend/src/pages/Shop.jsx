import React from "react";
import ArrowForwardIosOutlinedIcon from "@mui/icons-material/ArrowForwardIosOutlined";
import ProductCard from "../components/ProductCard";
import { Link } from "react-router";

const Shop = () => {
  return (
    <div className="flex flex-col min-h-screen pt-25">
      <div
        className="flex flex-col w-auto h-80 mx-10 gap-8 bg-[url('https://plus.unsplash.com/premium_photo-1661766077694-6e3750b0fb97?q=80&w=1931&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')]
       bg-center bg-no-repeat bg-cover rounded-3xl mb-10 bg-transparent flex items-center justify-center"
      >
        <p className="text-4xl font-semibold">Shop</p>
        <p>
          <Link to="/" className="text-lg font-bold">
            Home
          </Link>{" "}
          <ArrowForwardIosOutlinedIcon />{" "}
          <span className="text-lg text-gray-500">Shop</span>
        </p>
      </div>

      <div className="flex flex-wrap mx-10 items-center justify-between gap-4 mb-8 text-sm text-gray-600">
        {/* Left */}
        <div className="flex text-lg items-center gap-4">
          <button className="flex items-center gap-1 hover:text-black">
            ☰ Filter
          </button>
          <span>Showing 1–16 of 32 results</span>
        </div>

        {/* Right */}
        <div className="flex text-lg items-center gap-4">
          <div className="flex items-center gap-2">
            <span>Show</span>
            <select className="border rounded-md px-2 py-1">
              <option>16</option>
              <option>32</option>
            </select>
          </div>

          <div className="flex items-center gap-2">
            <span>Sort by</span>
            <select className="border rounded-md px-2 py-1">
              <option>Default</option>
              <option>Price</option>
            </select>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-2 mx-10 sm:grid-cols-3 lg:grid-cols-4 gap-x-6 gap-y-12">
        {/* {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))} */}
        <ProductCard />
        <ProductCard />
        <ProductCard />
        <ProductCard />
        <ProductCard />
        <ProductCard />
        <ProductCard />
        <ProductCard />
        <ProductCard />
        <ProductCard />
        <ProductCard />
        <ProductCard />
      </div>

      <div className="flex justify-center mt-12 mx-10 mb-15">
        <div className="flex text-xl items-center gap-2">
          <button className="w-15 h-15 rounded-md bg-yellow-100 text-sm font-medium">
            1
          </button>
          <button className="w-15 h-15 rounded-md hover:bg-yellow-100">
            2
          </button>
          <button className="w-15 h-15 rounded-md hover:bg-yellow-100">
            3
          </button>
          <button className="px-4 h-15 w-30 rounded-md hover:bg-yellow-100">
            Next
          </button>
        </div>
      </div>

      <div className="h-70 bg-[#faf4f4] justify-center items-center grid grid-cols-3 p-10">
        <div className="flex flex-col gap-5">
          <p className="text-4xl font-bold">Free delivery</p>
          <p className="text-xl text-gray-400">
            For all orders over $50, consectetur adipim scing elit
          </p>
        </div>
        <div className="flex flex-col gap-5">
          <p className="text-4xl font-bold">90 Days return</p>
          <p className="text-xl text-gray-400">
            If goods have problem, Lorem ipsum dolor sit.
          </p>
        </div>
        <div className="flex flex-col gap-5">
          <p className="text-4xl font-bold">Secure payment</p>
          <p className="text-xl text-gray-400">
            100% secure payment, Lorem ipsum dolor sit amet.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Shop;
