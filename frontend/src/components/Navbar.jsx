import React, { useState, useEffect } from "react";
import PersonOutlineOutlinedIcon from "@mui/icons-material/PersonOutlineOutlined";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import FavoriteBorderOutlinedIcon from "@mui/icons-material/FavoriteBorderOutlined";
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";
import LogoutOutlinedIcon from "@mui/icons-material/LogoutOutlined";
import { Link, useNavigate } from "react-router";
import CartPopup from "./CartPopup";
import { useCart } from "../services/useCart";

const Navbar = () => {
  const navigate = useNavigate();
  const [CartOpen, setCartOpen] = useState(false);
  const { getCartCount } = useCart();

  // Initialize state directly from localStorage
  const [isLoggedIn, setIsLoggedIn] = useState(() => {
    return !!localStorage.getItem("token");
  });

  // Listen for auth changes
  useEffect(() => {
    const handleAuthChange = () => {
      setIsLoggedIn(!!localStorage.getItem("token"));
    };

    // Add event listener for custom auth change event
    window.addEventListener("authChange", handleAuthChange);

    // Also check on component mount
    handleAuthChange();

    // Cleanup
    return () => {
      window.removeEventListener("authChange", handleAuthChange);
    };
  }, []);

  const handleLogout = () => {
    // Clear all auth data
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    localStorage.removeItem("userRole");

    setIsLoggedIn(false);

    // Dispatch auth change event
    window.dispatchEvent(new Event("authChange"));

    navigate("/");
  };

  return (
    <div className="fixed top-0 left-0 w-full z-50 flex justify-end items-center h-20 p-10 gap-40 bg-transparent">
      <ul className="flex flex-row text-xl font-semibold ">
        <li className="px-15">
          <Link to="/">Home</Link>
        </li>
        <li className="px-15">
          <Link to="/shop">Shop</Link>
        </li>
        <li className="px-15">
          <a>About</a>
        </li>
        <li className="px-15">
          <Link to="/contact">Contact</Link>
        </li>
      </ul>
      <div className="flex flex-row gap-8 pr-5">
        {isLoggedIn ? (
          <button
            onClick={handleLogout}
            className="flex items-center gap-2 hover:opacity-70 transition"
            title="Logout"
          >
            <LogoutOutlinedIcon sx={{ fontSize: 35 }} />
          </button>
        ) : (
          <Link to="/registration">
            <PersonOutlineOutlinedIcon sx={{ fontSize: 35 }} />
          </Link>
        )}
        <SearchOutlinedIcon sx={{ fontSize: 35 }} />
        <FavoriteBorderOutlinedIcon sx={{ fontSize: 35 }} />
        <div
          className="relative cursor-pointer"
          onClick={() => setCartOpen(true)}
        >
          <ShoppingCartOutlinedIcon sx={{ fontSize: 35 }} />
          {getCartCount() > 0 && (
            <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
              {getCartCount()}
            </span>
          )}
        </div>
      </div>

      <CartPopup isOpen={CartOpen} onClose={() => setCartOpen(false)} />
    </div>
  );
};

export default Navbar;
