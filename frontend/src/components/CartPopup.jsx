import React from "react";
import CloseIcon from "@mui/icons-material/Close";
import { Link } from "react-router";

const CartPopup = ({ isOpen, onClose }) => {
  return (
    <div>
      {isOpen && (
        <div className="fixed inset-0 bg-black/40 z-40" onClick={onClose} />
      )}

      {/* Drawer */}
      <div
        className={`fixed top-0 right-0 h-full w-[380px] bg-white z-50 transform transition-transform duration-300
        ${isOpen ? "translate-x-0" : "translate-x-full"}`}
      >
        {/* Header */}
        <div className="flex justify-between items-center p-6 border-b">
          <h2 className="text-xl font-semibold">Shopping Cart</h2>
          <CloseIcon className="cursor-pointer" onClick={onClose} />
        </div>

        {/* Cart Item */}
        <div className="p-6 flex gap-4 items-center">
          <div className="w-20 h-20 bg-[#FFF6E5] rounded-lg flex items-center justify-center">
            <img
              src="https://via.placeholder.com/80"
              alt="Asgaard Sofa"
              className="object-contain"
            />
          </div>

          <div className="flex-1">
            <h4 className="font-medium">Asgaard sofa</h4>
            <p className="text-sm text-gray-500">
              1 × <span className="text-yellow-600">Rs. 250,000.00</span>
            </p>
          </div>

          <button className="w-6 h-6 flex items-center justify-center rounded-full bg-gray-200 text-sm">
            ×
          </button>
        </div>

        {/* Subtotal */}
        <div className="px-6 mt-10 flex justify-between text-sm">
          <span>Subtotal</span>
          <span className="text-yellow-600 font-medium">Rs. 250,000.00</span>
        </div>

        {/* Buttons */}
        <div className="absolute bottom-6 left-0 w-full px-6 flex gap-4">
          <Link
            to="/cart"
            className="flex-1 border border-black rounded-full py-2 text-center text-sm hover:bg-black hover:text-white transition"
          >
            View Cart
          </Link>

          <Link
            to="/checkout"
            className="flex-1 border border-black rounded-full py-2 text-center text-sm hover:bg-black hover:text-white transition"
          >
            Checkout
          </Link>
        </div>
      </div>
    </div>
  );
};

export default CartPopup;
