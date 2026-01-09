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

  const [isLoggedIn, setIsLoggedIn] = useState(() => {
    return !!localStorage.getItem("token");
  });

  useEffect(() => {
    const handleAuthChange = () => {
      setIsLoggedIn(!!localStorage.getItem("token"));
    };

    window.addEventListener("authChange", handleAuthChange);
    handleAuthChange();

    return () => {
      window.removeEventListener("authChange", handleAuthChange);
    };
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    localStorage.removeItem("userRole");
    setIsLoggedIn(false);
    window.dispatchEvent(new Event("authChange"));
    navigate("/");
  };

  return (
    <div className="fixed top-0 left-0 w-full py-2 z-50 bg-transparent">
      <div className="max-w-7xl mx-auto flex items-center justify-between h-16 px-4">
        <div className="hidden w-20 h-20"></div>

        <ul className="flex text-xl gap-10  font-semibold whitespace-nowrap">
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/shop">Shop</Link>
          </li>
          <li>
            <a>About</a>
          </li>
          <li>
            <Link to="/contact">Contact</Link>
          </li>
        </ul>

        <div className="flex items-center gap-4 sm:gap-6">
          {isLoggedIn ? (
            <button onClick={handleLogout} title="Logout">
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
      </div>

      <CartPopup isOpen={CartOpen} onClose={() => setCartOpen(false)} />
    </div>
  );
};

export default Navbar;
