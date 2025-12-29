import React from "react";
import { Link } from "react-router";
import ArrowForwardIosOutlinedIcon from "@mui/icons-material/ArrowForwardIosOutlined";

const Registration = () => {
  return (
    <div className="flex flex-col min-h-screen pt-25">
      <div
        className="flex flex-col w-auto h-80 mx-10 gap-8 bg-[url('https://plus.unsplash.com/premium_photo-1661766077694-6e3750b0fb97?q=80&w=1931&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')]
       bg-center bg-no-repeat bg-cover rounded-3xl mb-10 bg-transparent flex items-center justify-center"
      >
        <p className="text-4xl font-semibold">My Account</p>
        <p>
          <Link to="/" className="text-lg font-bold">
            Home
          </Link>{" "}
          <ArrowForwardIosOutlinedIcon />{" "}
          <span className="text-lg text-gray-500">My Account</span>
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-16 px-40 pt-15 pb-30">
        {/* Login */}
        <div>
          <h2 className="text-2xl font-semibold mb-8">Log In</h2>

          <div className="mb-6">
            <label className="block text-lg mb-2">
              Username or email address
            </label>
            <input
              type="text"
              className="w-full border border-gray-300 rounded-md p-3 focus:outline-none focus:border-black"
            />
          </div>

          <div className="mb-6">
            <label className="block text-lg mb-2">Password</label>
            <input
              type="password"
              className="w-full border border-gray-300 rounded-md p-3 focus:outline-none focus:border-black"
            />
          </div>

          <div className="flex items-center gap-2 mb-6">
            <input type="checkbox" className="w-4 h-4" />
            <span className="text-lg">Remember me</span>
          </div>

          <div className="flex items-center gap-6">
            <button className="border border-black px-8 py-2 rounded-md hover:bg-black hover:text-white transition">
              Log In
            </button>
            <a href="#" className="text-lg ">
              Lost Your Password?
            </a>
          </div>
        </div>

        {/* Registration */}
        <div>
          <h2 className="text-2xl font-semibold mb-8">Register</h2>

          <div className="mb-6">
            <label className="block text-lg mb-2">Email address</label>
            <input
              type="email"
              className="w-full border border-gray-300 rounded-md p-3 focus:outline-none focus:border-black"
            />
          </div>

          <p className="text-lg text-gray-600 mb-4">
            A link to set a new password will be sent to your email address.
          </p>

          <p className="text-lg text-gray-600 mb-8">
            Your personal data will be used to support your experience
            throughout this website, to manage access to your account, and for
            other purposes described in our <strong>privacy policy</strong>.
          </p>

          <button className="border border-black px-10 py-2 rounded-md hover:bg-black hover:text-white transition">
            Register
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

export default Registration;
