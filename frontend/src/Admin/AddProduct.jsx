import { useState } from "react";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";

const AddProduct = () => {
  const [productData, setProductData] = useState({
    name: "",
    price: "",
    description: "",
    sku: "",
    category: "",
    tags: "",
    stock: "",
    sizes: [],
    colors: [],
  });

  const [images, setImages] = useState([]);

  const availableSizes = ["XS", "S", "M", "L", "XL", "XXL"];
  const availableColors = [
    { name: "Purple", hex: "#9333ea" },
    { name: "Black", hex: "#000000" },
    { name: "Gold", hex: "#ca8a04" },
    { name: "Blue", hex: "#3b82f6" },
    { name: "Red", hex: "#ef4444" },
    { name: "Green", hex: "#22c55e" },
  ];

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProductData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleImageUpload = (e) => {
    const files = Array.from(e.target.files);
    const newImages = files.map((file) => ({
      file,
      preview: URL.createObjectURL(file),
    }));
    setImages((prev) => [...prev, ...newImages]);
  };

  const removeImage = (index) => {
    setImages((prev) => prev.filter((_, i) => i !== index));
  };

  const toggleSize = (size) => {
    setProductData((prev) => ({
      ...prev,
      sizes: prev.sizes.includes(size)
        ? prev.sizes.filter((s) => s !== size)
        : [...prev.sizes, size],
    }));
  };

  const toggleColor = (color) => {
    setProductData((prev) => ({
      ...prev,
      colors: prev.colors.includes(color.name)
        ? prev.colors.filter((c) => c !== color.name)
        : [...prev.colors, color.name],
    }));
  };

  const handleSubmit = () => {
    if (
      !productData.name ||
      !productData.price ||
      !productData.sku ||
      !productData.category ||
      !productData.stock ||
      !productData.description
    ) {
      alert("Please fill in all required fields");
      return;
    }
    console.log("Product Data:", productData);
    console.log("Images:", images);
    alert("Product added successfully!");
  };

  return (
    <div className="flex flex-col min-h-screen">
      <div className="px-8 py-10 flex flex-col gap-6 items-center">
        <h1 className="text-4xl font-bold mb-8">Add New Product</h1>

        <div className="w-full max-w-6xl">
          <div className="flex flex-col lg:flex-row gap-10">
            {/* Left Column - Images */}
            <div className="flex-1">
              <h2 className="text-2xl font-semibold mb-6">Product Images</h2>

              {/* Image Upload Area */}
              <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center mb-6 hover:border-gray-400 transition">
                <input
                  type="file"
                  id="image-upload"
                  multiple
                  accept="image/*"
                  onChange={handleImageUpload}
                  className="hidden"
                />
                <label
                  htmlFor="image-upload"
                  className="cursor-pointer flex flex-col items-center"
                >
                  <CloudUploadIcon className="w-16 h-16 text-gray-400 mb-4" />
                  <p className="text-lg font-medium mb-2">
                    Click to upload images
                  </p>
                  <p className="text-sm text-gray-500">
                    or drag and drop PNG, JPG up to 10MB
                  </p>
                </label>
              </div>

              {/* Image Preview Flex */}
              {images.length > 0 && (
                <div className="flex flex-wrap gap-4">
                  {images.map((img, index) => (
                    <div key={index} className="relative group shrink-0">
                      <div className="w-24 h-24 bg-amber-50 rounded-lg overflow-hidden">
                        <img
                          src={img.preview}
                          alt={`Preview ${index}`}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <button
                        onClick={() => removeImage(index)}
                        className="absolute top-1 right-1 bg-red-500 text-white p-1 rounded-full opacity-0 group-hover:opacity-100 transition"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Right Column - Product Details */}
            <div className="flex-1">
              <h2 className="text-2xl font-semibold mb-6">Product Details</h2>

              <div className="flex flex-col gap-6">
                {/* Product Name */}
                <div>
                  <label className="block font-medium mb-2">
                    Product Name*
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={productData.name}
                    onChange={handleInputChange}
                    className="w-full border rounded-md px-4 py-3 focus:outline-none focus:border-black"
                    placeholder="Enter product name"
                  />
                </div>

                {/* Price */}
                <div>
                  <label className="block font-medium mb-2">Price (Rs.)*</label>
                  <input
                    type="number"
                    name="price"
                    value={productData.price}
                    onChange={handleInputChange}
                    className="w-full border rounded-md px-4 py-3 focus:outline-none focus:border-black"
                    placeholder="250000.00"
                  />
                </div>

                {/* SKU */}
                <div>
                  <label className="block font-medium mb-2">SKU*</label>
                  <input
                    type="text"
                    name="sku"
                    value={productData.sku}
                    onChange={handleInputChange}
                    className="w-full border rounded-md px-4 py-3 focus:outline-none focus:border-black"
                    placeholder="SS001"
                  />
                </div>

                {/* Category */}
                <div>
                  <label className="block font-medium mb-2">Category*</label>
                  <select
                    name="category"
                    value={productData.category}
                    onChange={handleInputChange}
                    className="w-full border rounded-md px-4 py-3 focus:outline-none focus:border-black"
                  >
                    <option value="">Select category</option>
                    <option value="Sofas">Sofas</option>
                    <option value="Chairs">Chairs</option>
                    <option value="Tables">Tables</option>
                    <option value="Beds">Beds</option>
                    <option value="Storage">Storage</option>
                  </select>
                </div>

                {/* Stock */}
                <div>
                  <label className="block font-medium mb-2">
                    Stock Quantity*
                  </label>
                  <input
                    type="number"
                    name="stock"
                    value={productData.stock}
                    onChange={handleInputChange}
                    className="w-full border rounded-md px-4 py-3 focus:outline-none focus:border-black"
                    placeholder="100"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Full Width Sections */}
          <div className="mt-10 flex flex-col gap-8">
            {/* Description */}
            <div>
              <label className="block font-medium mb-2 text-xl">
                Description*
              </label>
              <textarea
                name="description"
                value={productData.description}
                onChange={handleInputChange}
                rows="6"
                className="w-full border rounded-md px-4 py-3 focus:outline-none focus:border-black"
                placeholder="Enter detailed product description..."
              />
            </div>

            {/* Sizes */}
            <div>
              <label className="block font-medium mb-3 text-xl">
                Available Sizes
              </label>
              <div className="flex gap-3 flex-wrap">
                {availableSizes.map((size) => (
                  <button
                    key={size}
                    onClick={() => toggleSize(size)}
                    className={`border px-6 py-3 rounded-md text-sm transition ${
                      productData.sizes.includes(size)
                        ? "bg-black text-white border-black"
                        : "hover:border-black"
                    }`}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>

            {/* Colors */}
            <div>
              <label className="block font-medium mb-3 text-xl">
                Available Colors
              </label>
              <div className="flex gap-4 flex-wrap">
                {availableColors.map((color) => (
                  <button
                    key={color.name}
                    onClick={() => toggleColor(color)}
                    className={`relative w-12 h-12 rounded-full transition ${
                      productData.colors.includes(color.name)
                        ? "ring-4 ring-offset-2 ring-black"
                        : ""
                    }`}
                    style={{ backgroundColor: color.hex }}
                    title={color.name}
                  />
                ))}
              </div>
            </div>

            {/* Tags */}
            <div>
              <label className="block font-medium mb-2 text-xl">Tags</label>
              <input
                type="text"
                name="tags"
                value={productData.tags}
                onChange={handleInputChange}
                className="w-full border rounded-md px-4 py-3 focus:outline-none focus:border-black"
                placeholder="Sofa, Chair, Home, Shop (comma separated)"
              />
            </div>

            {/* Action Buttons */}
            <div className="flex flex-wrap gap-6 pt-6">
              <button
                onClick={handleSubmit}
                className="bg-black text-white px-12 py-4 rounded-md hover:bg-gray-800 transition text-lg font-medium"
              >
                Add Product
              </button>
              <button className="border border-black px-12 py-4 rounded-md hover:bg-gray-100 transition text-lg font-medium">
                Save as Draft
              </button>
              <button className="border px-12 py-4 rounded-md hover:bg-gray-100 transition text-lg font-medium flex items-center gap-2">
                Cancel
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddProduct;
