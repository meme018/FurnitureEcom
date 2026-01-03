import React, { useState } from "react";
import { Link, useNavigate } from "react-router";
import ArrowForwardIosOutlinedIcon from "@mui/icons-material/ArrowForwardIosOutlined";
import {
  useRegisterUserMutation,
  useLoginUserMutation,
} from "../services/userApi";

const Registration = () => {
  const navigate = useNavigate();
  const [registerUser, { isLoading: isRegistering }] =
    useRegisterUserMutation();
  const [loginUser, { isLoading: isLoggingIn }] = useLoginUserMutation();

  // Login state
  const [loginData, setLoginData] = useState({
    email: "",
    password: "",
  });

  // Register state
  const [registerData, setRegisterData] = useState({
    username: "",
    email: "",
    password: "",
    role: "",
  });

  const [rememberMe, setRememberMe] = useState(false);
  const [error, setError] = useState({ login: "", register: "" });

  const handleLoginChange = (e) => {
    setLoginData({ ...loginData, [e.target.name]: e.target.value });
    setError({ ...error, login: "" });
  };

  const handleRegisterChange = (e) => {
    setRegisterData({ ...registerData, [e.target.name]: e.target.value });
    setError({ ...error, register: "" });
  };

  const handleLogin = async (e) => {
    e.preventDefault();

    if (!loginData.email || !loginData.password) {
      setError({ ...error, login: "Please fill in all fields" });
      return;
    }

    try {
      const result = await loginUser({
        userOrEmail: loginData.email,
        password: loginData.password,
      }).unwrap();

      // Store user data in localStorage
      localStorage.setItem("user", JSON.stringify(result.data));
      localStorage.setItem("token", result.token);
      localStorage.setItem("userRole", result.data.role);

      // Redirect based on role
      if (result.data.role === "admin") {
        navigate("/dashboard");
      } else {
        navigate("/");
      }
    } catch (err) {
      setError({
        ...error,
        login: err.data?.message || "Login failed. Please try again.",
      });
    }
  };

  const handleRegister = async (e) => {
    e.preventDefault();

    if (
      !registerData.username ||
      !registerData.email ||
      !registerData.password ||
      !registerData.role
    ) {
      setError({ ...error, register: "Please fill in all fields" });
      return;
    }

    try {
      const result = await registerUser({
        userName: registerData.username,
        email: registerData.email,
        password: registerData.password,
        role: registerData.role,
      }).unwrap();

      // Backend returns token and nested data object
      localStorage.setItem("user", JSON.stringify(result.data));
      localStorage.setItem("token", result.token);
      localStorage.setItem("userRole", result.data.role);

      // Redirect based on role
      if (result.data.role === "admin") {
        navigate("/dashboard");
      } else {
        navigate("/");
      }
    } catch (err) {
      setError({
        ...error,
        register: err.data?.message || "Registration failed. Please try again.",
      });
    }
  };

  return (
    <div className="flex flex-col min-h-screen pt-25">
      <div className="flex flex-col w-auto h-80 mx-10 gap-8 bg-[url('https://plus.unsplash.com/premium_photo-1661766077694-6e3750b0fb97?q=80&w=1931&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')] bg-center bg-no-repeat bg-cover rounded-3xl mb-10 bg-transparent items-center justify-center">
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
            <label className="block text-lg mb-2">Email address</label>
            <input
              type="email"
              name="email"
              value={loginData.email}
              onChange={handleLoginChange}
              className="w-full border border-gray-300 rounded-md p-3 focus:outline-none focus:border-black"
            />
          </div>

          <div className="mb-6">
            <label className="block text-lg mb-2">Password</label>
            <input
              type="password"
              name="password"
              value={loginData.password}
              onChange={handleLoginChange}
              className="w-full border border-gray-300 rounded-md p-3 focus:outline-none focus:border-black"
            />
          </div>

          <div className="mb-6">
            <label className="block text-lg mb-2">Role</label>
            <select
              name="role"
              value={loginData.role}
              onChange={handleLoginChange}
              className="w-full border border-gray-300 rounded-md p-3 focus:outline-none focus:border-black"
            >
              <option value="">Select Role</option>
              <option value="customer">Customer</option>
              <option value="admin">Admin</option>
            </select>
          </div>

          {error.login && (
            <div className="mb-4 p-3 bg-red-100 text-red-700 rounded-md">
              {error.login}
            </div>
          )}

          <div className="flex items-center gap-2 mb-6">
            <input
              type="checkbox"
              className="w-4 h-4"
              checked={rememberMe}
              onChange={(e) => setRememberMe(e.target.checked)}
            />
            <span className="text-lg">Remember me</span>
          </div>

          <div className="flex items-center gap-6">
            <button
              onClick={handleLogin}
              disabled={isLoggingIn}
              className="border border-black px-8 py-2 rounded-md hover:bg-black hover:text-white transition disabled:opacity-50"
            >
              {isLoggingIn ? "Logging in..." : "Log In"}
            </button>
            <a href="#" className="text-lg">
              Lost Your Password?
            </a>
          </div>
        </div>

        {/* Registration */}
        <div>
          <h2 className="text-2xl font-semibold mb-8">Register</h2>

          <div className="mb-6">
            <label className="block text-lg mb-2">Username</label>
            <input
              type="text"
              name="username"
              value={registerData.username}
              onChange={handleRegisterChange}
              className="w-full border border-gray-300 rounded-md p-3 focus:outline-none focus:border-black"
            />
          </div>

          <div className="mb-6">
            <label className="block text-lg mb-2">Email address</label>
            <input
              type="email"
              name="email"
              value={registerData.email}
              onChange={handleRegisterChange}
              className="w-full border border-gray-300 rounded-md p-3 focus:outline-none focus:border-black"
            />
          </div>

          <div className="mb-6">
            <label className="block text-lg mb-2">Password</label>
            <input
              type="password"
              name="password"
              value={registerData.password}
              onChange={handleRegisterChange}
              className="w-full border border-gray-300 rounded-md p-3 focus:outline-none focus:border-black"
            />
          </div>

          <div className="mb-6">
            <label className="block text-lg mb-2">Role</label>
            <select
              name="role"
              value={registerData.role}
              onChange={handleRegisterChange}
              className="w-full border border-gray-300 rounded-md p-3 focus:outline-none focus:border-black"
            >
              <option value="">Select Role</option>
              <option value="customer">Customer</option>
              <option value="admin">Admin</option>
            </select>
          </div>

          {error.register && (
            <div className="mb-4 p-3 bg-red-100 text-red-700 rounded-md">
              {error.register}
            </div>
          )}

          <p className="text-lg text-gray-600 mb-8">
            Your personal data will be used to support your experience
            throughout this website, to manage access to your account, and for
            other purposes described in our <strong>privacy policy</strong>.
          </p>

          <button
            onClick={handleRegister}
            disabled={isRegistering}
            className="border border-black px-10 py-2 rounded-md hover:bg-black hover:text-white transition disabled:opacity-50"
          >
            {isRegistering ? "Registering..." : "Register"}
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
