import React from "react";
import PersonOutlineOutlinedIcon from "@mui/icons-material/PersonOutlineOutlined";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import FavoriteBorderOutlinedIcon from "@mui/icons-material/FavoriteBorderOutlined";
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";
import { Link } from "react-router";
import CartPopup from "./CartPopup";

const Navbar = () => {
  const [CartOpen, setCartOpen] = React.useState(false);

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
        <Link to="/registration">
          <PersonOutlineOutlinedIcon sx={{ fontSize: 35 }} />
        </Link>
        <SearchOutlinedIcon sx={{ fontSize: 35 }} />
        <FavoriteBorderOutlinedIcon sx={{ fontSize: 35 }} />
        <ShoppingCartOutlinedIcon
          sx={{ fontSize: 35 }}
          onClick={() => setCartOpen(true)}
        />
      </div>

      <CartPopup isOpen={CartOpen} onClose={() => setCartOpen(false)} />
    </div>
  );
};

export default Navbar;
