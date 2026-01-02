import { useState } from "react";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import DeleteIcon from "@mui/icons-material/Delete";

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
    colors: [], // store hex codes
  });

  const [images, setImages] = useState([]);
  const [customColor, setCustomColor] = useState("#000000");

  const availableSizes = ["XS", "S", "M", "L", "XL", "XXL"];

  /* -------------------- Handlers -------------------- */
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProductData((prev) => ({ ...prev, [name]: value }));
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

  const addCustomColor = () => {
    if (!/^#[0-9A-Fa-f]{6}$/.test(customColor)) {
      alert("Enter a valid hex color (e.g. #ff5733)");
      return;
    }

    setProductData((prev) => ({
      ...prev,
      colors: prev.colors.includes(customColor)
        ? prev.colors
        : [...prev.colors, customColor],
    }));
  };

  const removeColor = (hex) => {
    setProductData((prev) => ({
      ...prev,
      colors: prev.colors.filter((c) => c !== hex),
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

  /* -------------------- UI -------------------- */
  return (
    <div className="flex flex-col min-h-screen">
      <div className="px-8 py-10 flex flex-col gap-6 items-center">
        <h1 className="text-4xl font-bold mb-8">Add New Product</h1>

        <div className="w-full max-w-6xl">
          <div className="flex flex-col lg:flex-row gap-10">
            {/* Product Details */}
            <div className="flex-1">
              <h2 className="text-2xl font-semibold mb-6">Product Images</h2>

              <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center mb-6">
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
                  <p className="text-lg font-medium">Click to upload images</p>
                </label>
              </div>

              {images.length > 0 && (
                <div className="flex flex-wrap gap-4">
                  {images.map((img, index) => (
                    <div key={index} className="relative group">
                      <img
                        src={img.preview}
                        alt="preview"
                        className="w-24 h-24 object-cover rounded-lg"
                      />
                      <button
                        onClick={() => removeImage(index)}
                        className="absolute top-1 right-1 bg-red-500 text-white p-1 rounded-full opacity-0 group-hover:opacity-100"
                      >
                        <DeleteIcon size={14} />
                      </button>
                    </div>
                  ))}
                </div>
              )}

              <h2 className="text-2xl font-semibold mb-6">Product Details</h2>

              <div className="flex flex-col gap-6">
                <input
                  name="name"
                  value={productData.name}
                  onChange={handleInputChange}
                  placeholder="Product Name*"
                  className="border px-4 py-3 rounded-md"
                />

                <input
                  type="number"
                  name="price"
                  value={productData.price}
                  onChange={handleInputChange}
                  placeholder="Price (Rs.)*"
                  className="border px-4 py-3 rounded-md"
                />

                <input
                  name="sku"
                  value={productData.sku}
                  onChange={handleInputChange}
                  placeholder="SKU*"
                  className="border px-4 py-3 rounded-md"
                />

                <select
                  name="category"
                  value={productData.category}
                  onChange={handleInputChange}
                  className="border px-4 py-3 rounded-md"
                >
                  <option value="">Select category</option>
                  <option>Sofas</option>
                  <option>Chairs</option>
                  <option>Tables</option>
                  <option>Beds</option>
                </select>

                <input
                  type="number"
                  name="stock"
                  value={productData.stock}
                  onChange={handleInputChange}
                  placeholder="Stock Quantity*"
                  className="border px-4 py-3 rounded-md"
                />
              </div>
            </div>
          </div>

          {/* Description */}
          <div className="mt-10">
            <textarea
              name="description"
              value={productData.description}
              onChange={handleInputChange}
              rows="6"
              placeholder="Product description*"
              className="w-full border px-4 py-3 rounded-md"
            />
          </div>

          {/* Sizes */}
          <div className="mt-8">
            <h3 className="text-xl font-medium mb-3">Available Sizes</h3>
            <div className="flex gap-3 flex-wrap">
              {availableSizes.map((size) => (
                <button
                  key={size}
                  onClick={() => toggleSize(size)}
                  className={`px-6 py-3 border rounded-md ${
                    productData.sizes.includes(size)
                      ? "bg-black text-white"
                      : ""
                  }`}
                >
                  {size}
                </button>
              ))}
            </div>
          </div>

          {/* Colors */}
          <div className="mt-8">
            <h3 className="text-xl font-medium mb-3">Available Colors</h3>

            {/* Selected Colors */}
            <div className="flex gap-4 flex-wrap mb-4">
              {productData.colors.map((hex) => (
                <div key={hex} className="relative group">
                  <div
                    className="w-12 h-12 rounded-full ring-2 ring-black"
                    style={{ backgroundColor: hex }}
                    title={hex}
                  />
                  <button
                    onClick={() => removeColor(hex)}
                    className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 opacity-0 group-hover:opacity-100"
                  >
                    <Trash2 size={12} />
                  </button>
                </div>
              ))}
            </div>

            {/* Color Input */}
            <div className="flex items-center gap-4">
              <input
                type="color"
                value={customColor}
                onChange={(e) => setCustomColor(e.target.value)}
                className="w-14 h-14"
              />
              <input
                type="text"
                value={customColor}
                onChange={(e) => setCustomColor(e.target.value)}
                className="border px-4 py-3 rounded-md w-40"
                placeholder="#000000"
              />
              <button
                onClick={addCustomColor}
                className="border px-6 py-3 rounded-md hover:bg-black hover:text-white"
              >
                Add Color
              </button>
            </div>
          </div>

          {/* Tags */}
          <div className="mt-8">
            <input
              name="tags"
              value={productData.tags}
              onChange={handleInputChange}
              placeholder="Tags (comma separated)"
              className="w-full border px-4 py-3 rounded-md"
            />
          </div>

          {/* Actions */}
          <div className="mt-10 flex gap-6">
            <button
              onClick={handleSubmit}
              className="bg-black text-white px-12 py-4 rounded-md"
            >
              Add Product
            </button>
            <button className="border px-12 py-4 rounded-md">Cancel</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddProduct;
