import React, { useState } from "react";
import ArrowForwardIosOutlinedIcon from "@mui/icons-material/ArrowForwardIosOutlined";
import { Link, useNavigate } from "react-router";
import { useCart } from "../services/useCart";

const CheckOut = () => {
  const navigate = useNavigate();
  const { cartItems, getCartTotal, clearCart } = useCart();

  const [billingDetails, setBillingDetails] = useState({
    firstName: "",
    lastName: "",
    companyName: "",
    country: "",
    streetAddress: "",
    city: "",
    province: "Western Province",
    zipCode: "",
    phone: "",
    email: "",
    additionalInfo: "",
  });

  const [paymentMethod, setPaymentMethod] = useState("bank");

  const handleInputChange = (e) => {
    setBillingDetails({
      ...billingDetails,
      [e.target.name]: e.target.value,
    });
  };

  const handlePlaceOrder = (e) => {
    e.preventDefault();

    // Validation
    if (
      !billingDetails.firstName ||
      !billingDetails.lastName ||
      !billingDetails.country ||
      !billingDetails.streetAddress ||
      !billingDetails.city ||
      !billingDetails.zipCode ||
      !billingDetails.phone ||
      !billingDetails.email
    ) {
      alert("Please fill in all required fields");
      return;
    }

    // Create order object
    const order = {
      billingDetails,
      items: cartItems,
      total: getCartTotal(),
      paymentMethod,
      orderDate: new Date().toISOString(),
      orderId: `ORD-${Date.now()}`,
    };

    // Store order in localStorage
    const existingOrders = JSON.parse(localStorage.getItem("orders") || "[]");
    existingOrders.push(order);
    localStorage.setItem("orders", JSON.stringify(existingOrders));

    // Clear cart
    clearCart();

    // Show success and redirect
    alert(`Order placed successfully! Order ID: ${order.orderId}`);
    navigate("/");
  };

  if (cartItems.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen">
        <p className="text-2xl text-gray-500 mb-6">Your cart is empty</p>
        <Link
          to="/shop"
          className="border border-black px-8 py-3 rounded-md hover:bg-black hover:text-white transition"
        >
          Continue Shopping
        </Link>
      </div>
    );
  }

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

      <form
        onSubmit={handlePlaceOrder}
        className="grid grid-cols-2 gap-20 px-20 py-10"
      >
        {/* Billing Details */}
        <div>
          <p className="text-2xl font-bold py-4">Billing Details</p>
          <div className="mb-6 grid grid-cols-2 gap-5">
            <div>
              <label className="block text-lg mb-2">First Name *</label>
              <input
                type="text"
                name="firstName"
                value={billingDetails.firstName}
                onChange={handleInputChange}
                required
                className="w-full border border-gray-300 rounded-md p-3 focus:outline-none focus:border-black"
              />
            </div>
            <div>
              <label className="block text-lg mb-2">Last Name *</label>
              <input
                type="text"
                name="lastName"
                value={billingDetails.lastName}
                onChange={handleInputChange}
                required
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
              name="companyName"
              value={billingDetails.companyName}
              onChange={handleInputChange}
              className="w-full border border-gray-300 rounded-md p-3 focus:outline-none focus:border-black"
            />
          </div>

          <div className="mb-6">
            <label className="block text-lg mb-2">Country / Region *</label>
            <input
              type="text"
              name="country"
              value={billingDetails.country}
              onChange={handleInputChange}
              required
              className="w-full border border-gray-300 rounded-md p-3 focus:outline-none focus:border-black"
            />
          </div>

          <div className="mb-6">
            <label className="block text-lg mb-2">Street Address *</label>
            <input
              type="text"
              name="streetAddress"
              value={billingDetails.streetAddress}
              onChange={handleInputChange}
              required
              className="w-full border border-gray-300 rounded-md p-3 focus:outline-none focus:border-black"
            />
          </div>

          <div className="mb-6">
            <label className="block text-lg mb-2">Town / City *</label>
            <input
              type="text"
              name="city"
              value={billingDetails.city}
              onChange={handleInputChange}
              required
              className="w-full border border-gray-300 rounded-md p-3 focus:outline-none focus:border-black"
            />
          </div>

          <div className="mb-6">
            <label className="block text-lg mb-2">Province</label>
            <select
              name="province"
              value={billingDetails.province}
              onChange={handleInputChange}
              className="w-full border border-gray-300 rounded-md p-3 focus:outline-none focus:border-black"
            >
              <option>Western Province</option>
              <option>Central Province</option>
              <option>Southern Province</option>
            </select>
          </div>

          <div className="mb-6">
            <label className="block text-lg mb-2">ZIP Code *</label>
            <input
              type="text"
              name="zipCode"
              value={billingDetails.zipCode}
              onChange={handleInputChange}
              required
              className="w-full border border-gray-300 rounded-md p-3 focus:outline-none focus:border-black"
            />
          </div>

          <div className="mb-6">
            <label className="block text-lg mb-2">Phone *</label>
            <input
              type="tel"
              name="phone"
              value={billingDetails.phone}
              onChange={handleInputChange}
              required
              className="w-full border border-gray-300 rounded-md p-3 focus:outline-none focus:border-black"
            />
          </div>

          <div className="mb-6">
            <label className="block text-lg mb-2">Email Address *</label>
            <input
              type="email"
              name="email"
              value={billingDetails.email}
              onChange={handleInputChange}
              required
              className="w-full border border-gray-300 rounded-md p-3 focus:outline-none focus:border-black"
            />
          </div>

          <div className="mb-6">
            <input
              type="text"
              name="additionalInfo"
              value={billingDetails.additionalInfo}
              onChange={handleInputChange}
              className="w-full border border-gray-300 rounded-md p-3 focus:outline-none mt-10 focus:border-black"
              placeholder="Additional Information"
            />
          </div>
        </div>

        {/* Order Summary */}
        <div>
          <div className="border-b pb-6">
            <div className="flex justify-between font-semibold text-xl mb-4">
              <span>Product</span>
              <span>Subtotal</span>
            </div>

            {cartItems.map((item, index) => (
              <div key={index} className="flex justify-between mt-4 text-lg">
                <span>
                  {item.name} × {item.quantity}
                  {item.selectedSize && ` (${item.selectedSize})`}
                </span>
                <span>Rs. {(item.price * item.quantity).toLocaleString()}</span>
              </div>
            ))}
          </div>

          <div className="flex justify-between mt-6 text-lg">
            <span>Subtotal</span>
            <span>Rs. {getCartTotal().toLocaleString()}</span>
          </div>

          <div className="flex justify-between mt-4 text-lg font-semibold text-yellow-600">
            <span>Total</span>
            <span>Rs. {getCartTotal().toLocaleString()}</span>
          </div>

          <div className="mt-8 space-y-4 text-lg">
            <label className="flex gap-3">
              <input
                type="radio"
                name="payment"
                value="bank"
                checked={paymentMethod === "bank"}
                onChange={(e) => setPaymentMethod(e.target.value)}
              />
              <span>
                <strong>Direct Bank Transfer</strong>
                <p className="text-gray-500 mt-1">
                  Make your payment directly into our bank account. Please use
                  your Order ID as the payment reference.
                </p>
              </span>
            </label>

            <label className="flex gap-3">
              <input
                type="radio"
                name="payment"
                value="bank2"
                checked={paymentMethod === "bank2"}
                onChange={(e) => setPaymentMethod(e.target.value)}
              />
              <span>Direct Bank Transfer</span>
            </label>

            <label className="flex gap-3">
              <input
                type="radio"
                name="payment"
                value="cod"
                checked={paymentMethod === "cod"}
                onChange={(e) => setPaymentMethod(e.target.value)}
              />
              <span>Cash On Delivery</span>
            </label>
          </div>

          <p className="text-xs text-gray-500 mt-6">
            Your personal data will be used to support your experience
            throughout this website, to manage access to your account, and for
            other purposes described in our{" "}
            <span className="underline cursor-pointer">privacy policy</span>.
          </p>

          <button
            type="submit"
            className="mt-8 w-full border border-black py-3 rounded-md hover:bg-black hover:text-white transition"
          >
            Place order
          </button>
        </div>
      </form>

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
