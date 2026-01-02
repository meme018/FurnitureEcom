import React from "react";
import ArrowForwardIosOutlinedIcon from "@mui/icons-material/ArrowForwardIosOutlined";
import { Link } from "react-router";

const CheckOut = () => {
  return (
    <div className="flex flex-col min-h-screen pt-25">
      <div
        className="flex flex-col w-auto h-80 mx-10 gap-8 bg-[url('https://plus.unsplash.com/premium_photo-1661766077694-6e3750b0fb97?q=80&w=1931&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')]
       bg-center bg-no-repeat bg-cover rounded-3xl mb-10 bg-transparent items-center justify-center"
      >
        <p className="text-4xl font-semibold">Checkout</p>
        <p>
          <Link to="/" className="text-lg font-bold">
            Home
          </Link>{" "}
          <ArrowForwardIosOutlinedIcon />{" "}
          <span className="text-lg text-gray-500">Checkout</span>
        </p>
      </div>

      <div className="grid grid-cols-2 gap-20 px-20 py-10">
        {/* Billing Details */}
        <div>
          <p className="text-2xl font-bold py-4">Billing Details</p>
          <div className="mb-6 grid grid-cols-2 gap-5">
            <div>
              <label className="block text-lg mb-2">First Name</label>
              <input
                type="firstName"
                className="w-full border border-gray-300 rounded-md p-3 focus:outline-none focus:border-black"
              />
            </div>
            <div>
              <label className="block text-lg mb-2">Last Name</label>
              <input
                type="lastName"
                className="w-full border border-gray-300 rounded-md p-3 focus:outline-none focus:border-black"
              />
            </div>
          </div>

          <div className="mb-6">
            <label className="block text-lg mb-2">
              Company Name (Optional)
            </label>
            <input
              type="text"
              className="w-full border border-gray-300 rounded-md p-3 focus:outline-none focus:border-black"
            />
          </div>

          <div className="mb-6">
            <label className="block text-lg mb-2">Country / Region</label>
            <input
              type="text"
              className="w-full border border-gray-300 rounded-md p-3 focus:outline-none focus:border-black"
            />
          </div>

          <div className="mb-6">
            <label className="block text-lg mb-2">Street Address</label>
            <input
              type="address"
              className="w-full border border-gray-300 rounded-md p-3 focus:outline-none focus:border-black"
            />
          </div>

          <div className="mb-6">
            <label className="block text-lg mb-2">Town / City</label>
            <input
              type="text"
              className="w-full border border-gray-300 rounded-md p-3 focus:outline-none focus:border-black"
            />
          </div>

          <div className="mb-6 fle">
            <label className="block text-lg mb-2">Province</label>
            <select className=" w-full border border-gray-300 rounded-md p-3 focus:outline-none focus:border-black">
              <option>Western Province</option>
              <option>Central Province</option>
              <option>Southern Province</option>
            </select>
          </div>

          <div className="mb-6">
            <label className="block text-lg mb-2">ZIP Code</label>
            <input
              type="text"
              className="w-full border border-gray-300 rounded-md p-3 focus:outline-none focus:border-black"
            />
          </div>

          <div className="mb-6">
            <label className="block text-lg mb-2">Phone</label>
            <input
              type="tel"
              className="w-full border border-gray-300 rounded-md p-3 focus:outline-none focus:border-black"
            />
          </div>

          <div className="mb-6">
            <label className="block text-lg mb-2">Email Address</label>
            <input
              type="email"
              className="w-full border border-gray-300 rounded-md p-3 focus:outline-none focus:border-black"
            />
          </div>

          <div className="mb-6">
            <input
              type="text"
              className="w-full border border-gray-300 rounded-md p-3 focus:outline-none mt-10 focus:border-black"
              placeholder="Additional Information"
            />
          </div>
        </div>

        {/* Order Summary */}
        <div>
          <div className="border-b pb-6">
            <div className="flex justify-between font-semibold text-xl">
              <span>Product</span>
              <span>Subtotal</span>
            </div>

            <div className="flex justify-between mt-4 text-lg">
              <span>Asgaard sofa × 1</span>
              <span>Rs. 250,000.00</span>
            </div>
          </div>

          <div className="flex justify-between mt-6 text-lg">
            <span>Subtotal</span>
            <span>Rs. 250,000.00</span>
          </div>

          <div className="flex justify-between mt-4 text-lg font-semibold text-yellow-600">
            <span>Total</span>
            <span>Rs. 250,000.00</span>
          </div>

          <div className="mt-8 space-y-4 text-lg">
            <label className="flex gap-3">
              <input type="radio" name="payment" defaultChecked />
              <span>
                <strong>Direct Bank Transfer</strong>
                <p className="text-gray-500 mt-1">
                  Make your payment directly into our bank account. Please use
                  your Order ID as the payment reference.
                </p>
              </span>
            </label>

            <label className="flex gap-3">
              <input type="radio" name="payment" />
              <span>Direct Bank Transfer</span>
            </label>

            <label className="flex gap-3">
              <input type="radio" name="payment" />
              <span>Cash On Delivery</span>
            </label>
          </div>

          <p className="text-xs text-gray-500 mt-6">
            Your personal data will be used to support your experience
            throughout this website, to manage access to your account, and for
            other purposes described in our{" "}
            <span className="underline cursor-pointer">privacy policy</span>.
          </p>

          <button className="mt-8 w-full border border-black py-3 rounded-md hover:bg-black hover:text-white transition">
            Place order
          </button>
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

export default CheckOut;
