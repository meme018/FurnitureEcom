import React from "react";
import ArrowForwardIosOutlinedIcon from "@mui/icons-material/ArrowForwardIosOutlined";
import { Link } from "react-router";
import DeleteIcon from "@mui/icons-material/Delete";

const Cart = () => {
  return (
    <div className="flex flex-col min-h-screen pt-25">
      <div
        className="flex flex-col w-auto h-80 mx-10 gap-8 bg-[url('https://plus.unsplash.com/premium_photo-1661766077694-6e3750b0fb97?q=80&w=1931&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')]
       bg-center bg-no-repeat bg-cover rounded-3xl mb-10 bg-transparent flex items-center justify-center"
      >
        <p className="text-4xl font-semibold">Cart</p>
        <p>
          <Link to="/" className="text-lg font-bold">
            Home
          </Link>{" "}
          <ArrowForwardIosOutlinedIcon />{" "}
          <span className="text-lg text-gray-500">Cart</span>
        </p>
      </div>

      {/* Main Content */}
      <div className="w-full mx-auto bg-white rounded-xl p-8 mb-10">
        {/* Items */}
        <div className="mx-auto flex gap-6 px-20">
          {/* Cart Items */}
          <div className="flex-1">
            <div className="bg-yellow-50 rounded-lg p-6">
              {/* Header */}
              <div className="flex gap-4 mb-4 text-xl font-semibold">
                <div className="flex-1">Product</div>
                <div className="w-32 text-center">Price</div>
                <div className="w-32 text-center">Quantity</div>
                <div className="w-32 text-center">Subtotal</div>
                <div className="w-8"></div>
              </div>

              {/* Item */}
              <div className="flex gap-4 items-center text-lg bg-white p-4 rounded">
                <div className="flex-1 flex items-center gap-3">
                  <div className="w-20 h-20 bg-yellow-100 rounded">
                    <img
                      src="https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=200&h=200&fit=crop"
                      alt="Asgaard sofa"
                      className="w-full h-full object-cover rounded"
                    />
                  </div>
                  <span className="text-gray-600">Asgaard sofa</span>
                </div>

                <div className="w-32 text-center text-gray-600">Rs.00</div>

                <div className="w-32 flex justify-center">
                  <input
                    type="number"
                    className="w-16 px-2 py-1 text-center border rounded"
                  />
                </div>

                <div className="w-32 text-center">Rs.00</div>

                <div className="w-8">
                  <button className="text-yellow-600">
                    <DeleteIcon size={20} />
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Cart Totals */}
          <div className="w-96">
            <div className="bg-yellow-50 rounded-lg p-6">
              <h2 className="text-2xl font-bold text-center mb-8">
                Cart Totals
              </h2>

              <div className="flex justify-between mb-4 text-lg">
                <span className="font-medium">Subtotal</span>
                <span className="text-gray-600">Rs.00</span>
              </div>

              <div className="flex justify-between mb-8 pt-4 text-lg">
                <span className="font-medium">Total</span>
                <span className="text-yellow-600 font-semibold text-xl">
                  Rs.00
                </span>
              </div>

              <button className="w-full py-3 bg-white border-2 border-black rounded-full text-lg font-medium">
                Check Out
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Banner */}
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

export default Cart;
