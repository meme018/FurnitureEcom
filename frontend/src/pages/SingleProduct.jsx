import { useState } from "react";
import { useParams, Link, useNavigate } from "react-router";
import ArrowForwardIosOutlinedIcon from "@mui/icons-material/ArrowForwardIosOutlined";
import FacebookIcon from "@mui/icons-material/Facebook";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import StarIcon from "@mui/icons-material/Star";
import TwitterIcon from "@mui/icons-material/Twitter";
import { useGetProductByIdQuery } from "../services/productApi";
import { useCart } from "../services/useCart";

const SingleProduct = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { data: productData, isError } = useGetProductByIdQuery(id);
  const { addToCart } = useCart();

  const product = productData?.data;

  const [selectedImage, setSelectedImage] = useState(0);
  const [selectedSize, setSelectedSize] = useState("");
  const [selectedColor, setSelectedColor] = useState("");
  const [quantity, setQuantity] = useState(1);
  const [showSuccess, setShowSuccess] = useState(false);

  if (isError || !product) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <p className="text-xl text-red-600">Product not found</p>
      </div>
    );
  }

  const handleQuantityChange = (change) => {
    const newQuantity = quantity + change;
    if (newQuantity >= 1 && newQuantity <= product.stock) {
      setQuantity(newQuantity);
    }
  };

  const handleAddToCart = () => {
    // Check if user is logged in
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/registration");
      return;
    }

    // Validate size and color if they exist
    if (product.sizes && product.sizes.length > 0 && !selectedSize) {
      alert("Please select a size");
      return;
    }

    if (product.colors && product.colors.length > 0 && !selectedColor) {
      alert("Please select a color");
      return;
    }

    // Add to cart
    addToCart(product, quantity, selectedSize, selectedColor);

    // Show success message
    setShowSuccess(true);
    setTimeout(() => setShowSuccess(false), 3000);

    // Reset selections
    setQuantity(1);
  };

  return (
    <div className="flex flex-col min-h-screen mt-30">
      {/* Success Message */}
      {showSuccess && (
        <div className="fixed top-24 right-4 z-50 bg-green-500 text-white px-6 py-3 rounded-lg shadow-lg">
          Item added to cart successfully!
        </div>
      )}

      {/* Breadcrumb */}
      <div className="flex flex-row gap-5 px-15">
        <Link to="/" className="text-lg text-gray-500">
          Home
        </Link>
        <ArrowForwardIosOutlinedIcon />
        <Link to="/shop" className="text-lg text-gray-500">
          Shop
        </Link>
        <ArrowForwardIosOutlinedIcon />
        <span className="text-lg font-bold">|</span>
        <span className="text-lg font-bold">{product.name}</span>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 px-15 py-10">
        {/* Images */}
        <div className="flex gap-6">
          {/* Thumbnails */}
          <div className="flex flex-col gap-4">
            {product.images?.map((img, i) => (
              <div
                key={i}
                onClick={() => setSelectedImage(i)}
                className={`w-20 h-20 bg-[#FFF6E5] flex items-center justify-center rounded-lg cursor-pointer ${
                  selectedImage === i ? "ring-2 ring-yellow-500" : ""
                }`}
              >
                <img
                  src={img}
                  alt={`${product.name} ${i + 1}`}
                  className="object-cover w-full h-full rounded-lg"
                />
              </div>
            ))}
          </div>

          {/* Main Image */}
          <div className="flex-1 bg-[#FFF6E5] rounded-xl flex items-center justify-center p-8">
            <img
              src={product.images?.[selectedImage]}
              alt={product.name}
              className="object-contain max-h-96"
            />
          </div>
        </div>

        {/* Product Info */}
        <div>
          <h1 className="text-3xl font-semibold mb-2">{product.name}</h1>
          <p className="text-xl text-gray-500 mb-4">
            Rs. {product.price.toLocaleString()}
          </p>

          {/* Rating */}
          <div className="flex items-center gap-3 mb-4">
            <div className="flex text-yellow-400">
              {[...Array(5)].map((_, i) => (
                <StarIcon key={i} />
              ))}
            </div>
            <span className="text-sm text-gray-500">| 5 Customer Review</span>
          </div>

          <p className="text-gray-600 mb-6">{product.description}</p>

          {/* Size */}
          {product.sizes && product.sizes.length > 0 && (
            <div className="mb-6">
              <p className="font-medium mb-2">Size</p>
              <div className="flex gap-3">
                {product.sizes.map((size) => (
                  <button
                    key={size}
                    onClick={() => setSelectedSize(size)}
                    className={`border px-4 py-2 rounded-md text-sm hover:border-black ${
                      selectedSize === size ? "bg-yellow-100 border-black" : ""
                    }`}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Color */}
          {product.colors && product.colors.length > 0 && (
            <div className="mb-6">
              <p className="font-medium mb-2">Color</p>
              <div className="flex gap-3">
                {product.colors.map((color, i) => (
                  <span
                    key={i}
                    onClick={() => setSelectedColor(color)}
                    style={{ backgroundColor: color }}
                    className={`w-8 h-8 rounded-full cursor-pointer ${
                      selectedColor === color
                        ? "ring-2 ring-offset-2 ring-black"
                        : ""
                    }`}
                  />
                ))}
              </div>
            </div>
          )}

          {/* Stock Info */}
          <div className="mb-4">
            <p className="text-sm text-gray-600">
              {product.stock > 0 ? (
                <span className="text-green-600">
                  In Stock: {product.stock} available
                </span>
              ) : (
                <span className="text-red-600">Out of Stock</span>
              )}
            </p>
          </div>

          {/* Quantity & Cart */}
          <div className="flex items-center gap-6 mb-8">
            <div className="flex items-center border rounded-md">
              <button
                onClick={() => handleQuantityChange(-1)}
                className="px-4 py-2 hover:bg-gray-100"
                disabled={quantity <= 1}
              >
                −
              </button>
              <span className="px-4">{quantity}</span>
              <button
                onClick={() => handleQuantityChange(1)}
                className="px-4 py-2 hover:bg-gray-100"
                disabled={quantity >= product.stock}
              >
                +
              </button>
            </div>

            <button
              onClick={handleAddToCart}
              className="border px-10 py-3 rounded-md hover:bg-black hover:text-white transition disabled:opacity-50 disabled:cursor-not-allowed"
              disabled={product.stock === 0}
            >
              Add To Cart
            </button>
          </div>

          <hr className="mb-6" />

          {/* Meta Info */}
          <div className="text-sm text-gray-500 space-y-2">
            <p>SKU : {product.sku}</p>
            <p>Category : {product.category}</p>
            <p>Tags : {product.tags?.join(", ")}</p>
            <div className="flex items-center gap-4">
              <span>Share :</span>
              <FacebookIcon className="cursor-pointer hover:text-blue-600" />
              <LinkedInIcon className="cursor-pointer hover:text-blue-700" />
              <TwitterIcon className="cursor-pointer hover:text-blue-400" />
            </div>
          </div>
        </div>
      </div>

      <hr className="mb-6" />

      {/* Description Section */}
      <div className="w-auto mt-10 flex flex-col px-15 items-center">
        <div className="flex gap-10 mb-6 text-2xl">
          <button className="font-medium">Description</button>
          <button className="text-gray-400">Additional Information</button>
          <button className="text-gray-400">Reviews [5]</button>
        </div>

        <p className="text-gray-600 text-lg max-w-7xl leading-relaxed">
          {product.description}
        </p>
      </div>

      {/* Product Images Gallery */}
      <div className="grid grid-cols-2 justify-center items-center px-15 py-10 mb-10 gap-10">
        {product.images?.slice(0, 2).map((img, i) => (
          <img
            key={i}
            src={img}
            alt={`${product.name} view ${i + 1}`}
            className="w-full h-auto object-cover rounded-lg"
          />
        ))}
      </div>
    </div>
  );
};

export default SingleProduct;
