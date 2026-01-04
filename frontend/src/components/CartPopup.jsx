import React from "react";
import CloseIcon from "@mui/icons-material/Close";
import { Link } from "react-router";
import { useCart } from "../services/useCart";

const CartPopup = ({ isOpen, onClose }) => {
  const { cartItems, removeFromCart, getCartTotal } = useCart();

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

        {/* Cart Items */}
        <div className="p-6 max-h-[calc(100vh-250px)] overflow-y-auto">
          {cartItems.length === 0 ? (
            <p className="text-center text-gray-500 py-8">Your cart is empty</p>
          ) : (
            cartItems.map((item, index) => (
              <div key={index} className="flex gap-4 items-center mb-4">
                <div className="w-20 h-20 bg-[#FFF6E5] rounded-lg flex items-center justify-center">
                  <img
                    src={item.image || "https://via.placeholder.com/80"}
                    alt={item.name}
                    className="object-contain w-full h-full rounded-lg"
                  />
                </div>

                <div className="flex-1">
                  <h4 className="font-medium">{item.name}</h4>
                  {item.selectedSize && (
                    <p className="text-xs text-gray-500">
                      Size: {item.selectedSize}
                    </p>
                  )}
                  {item.selectedColor && (
                    <p className="text-xs text-gray-500 flex items-center gap-1">
                      Color:{" "}
                      <span
                        className="w-3 h-3 rounded-full inline-block"
                        style={{ backgroundColor: item.selectedColor }}
                      ></span>
                    </p>
                  )}
                  <p className="text-sm text-gray-500">
                    {item.quantity} ×{" "}
                    <span className="text-yellow-600">
                      Rs. {item.price.toLocaleString()}
                    </span>
                  </p>
                </div>

                <button
                  onClick={() =>
                    removeFromCart(
                      item.id,
                      item.selectedSize,
                      item.selectedColor
                    )
                  }
                  className="w-6 h-6 flex items-center justify-center rounded-full bg-gray-200 text-sm hover:bg-red-100 hover:text-red-600 transition"
                >
                  ×
                </button>
              </div>
            ))
          )}
        </div>

        {/* Subtotal */}
        {cartItems.length > 0 && (
          <>
            <div className="px-6 mt-4 flex justify-between text-sm border-t pt-4">
              <span>Subtotal</span>
              <span className="text-yellow-600 font-medium">
                Rs. {getCartTotal().toLocaleString()}
              </span>
            </div>

            {/* Buttons */}
            <div className="absolute bottom-6 left-0 w-full px-6 flex gap-4">
              <Link
                to="/cart"
                onClick={onClose}
                className="flex-1 border border-black rounded-full py-2 text-center text-sm hover:bg-black hover:text-white transition"
              >
                View Cart
              </Link>

              <Link
                to="/checkout"
                onClick={onClose}
                className="flex-1 border border-black rounded-full py-2 text-center text-sm hover:bg-black hover:text-white transition"
              >
                Checkout
              </Link>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default CartPopup;
