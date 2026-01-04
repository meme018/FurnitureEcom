import React, { createContext, useState, useEffect } from "react";

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState(() => {
    // Initialize cart from localStorage
    const savedCart = localStorage.getItem("cart");
    return savedCart ? JSON.parse(savedCart) : [];
  });

  // Save cart to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cartItems));
    // Dispatch event so other components can listen
    window.dispatchEvent(new Event("cartChange"));
  }, [cartItems]);

  const addToCart = (
    product,
    quantity = 1,
    selectedSize = "",
    selectedColor = ""
  ) => {
    setCartItems((prevItems) => {
      // Check if item already exists with same size and color
      const existingItemIndex = prevItems.findIndex(
        (item) =>
          item.id === product._id &&
          item.selectedSize === selectedSize &&
          item.selectedColor === selectedColor
      );

      if (existingItemIndex !== -1) {
        // Update quantity if item exists
        const updatedItems = [...prevItems];
        updatedItems[existingItemIndex].quantity += quantity;
        return updatedItems;
      } else {
        // Add new item
        return [
          ...prevItems,
          {
            id: product._id,
            name: product.name,
            price: product.price,
            image: product.images?.[0] || "",
            quantity,
            selectedSize,
            selectedColor,
            stock: product.stock,
          },
        ];
      }
    });
  };

  const removeFromCart = (itemId, selectedSize = "", selectedColor = "") => {
    setCartItems((prevItems) =>
      prevItems.filter(
        (item) =>
          !(
            item.id === itemId &&
            item.selectedSize === selectedSize &&
            item.selectedColor === selectedColor
          )
      )
    );
  };

  const updateQuantity = (
    itemId,
    newQuantity,
    selectedSize = "",
    selectedColor = ""
  ) => {
    if (newQuantity < 1) return;

    setCartItems((prevItems) =>
      prevItems.map((item) =>
        item.id === itemId &&
        item.selectedSize === selectedSize &&
        item.selectedColor === selectedColor
          ? { ...item, quantity: Math.min(newQuantity, item.stock) }
          : item
      )
    );
  };

  const clearCart = () => {
    setCartItems([]);
  };

  const getCartTotal = () => {
    return cartItems.reduce(
      (total, item) => total + item.price * item.quantity,
      0
    );
  };

  const getCartCount = () => {
    return cartItems.reduce((count, item) => count + item.quantity, 0);
  };

  return (
    <CartContext.Provider
      value={{
        cartItems,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        getCartTotal,
        getCartCount,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export { CartContext };
