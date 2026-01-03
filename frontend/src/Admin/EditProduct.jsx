import { useState } from "react";
import { useParams, useNavigate } from "react-router";
import DeleteIcon from "@mui/icons-material/Delete";
import {
  useGetProductByIdQuery,
  useUpdateProductMutation,
} from "../services/productApi";

const EditProduct = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const {
    data: productData,
    isLoading: isFetching,
    isError,
  } = useGetProductByIdQuery(id);
  const [updateProduct, { isLoading }] = useUpdateProductMutation();

  const product = productData?.data;

  const [formData, setFormData] = useState({
    name: product?.name || "",
    price: product?.price || "",
    description: product?.description || "",
    sku: product?.sku || "",
    category: product?.category || "",
    tags: product?.tags?.join(", ") || "",
    stock: product?.stock || "",
    sizes: product?.sizes || [],
    colors: product?.colors || [],
  });

  const [imageUrls, setImageUrls] = useState(
    product?.images?.length > 0 ? product.images : [""]
  );
  const [customColor, setCustomColor] = useState("#000000");

  const availableSizes = [
    "XS",
    "S",
    "M",
    "L",
    "XL",
    "XXL",
    "Standard",
    "3-Tier",
    "5-Tier",
  ];
  const categories = [
    "Sofas",
    "Chairs",
    "Tables",
    "Beds",
    "Storage",
    "Lighting",
    "Decor",
  ];

  /* -------------------- Handlers -------------------- */
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleImageUrlChange = (index, value) => {
    const newUrls = [...imageUrls];
    newUrls[index] = value;
    setImageUrls(newUrls);
  };

  const addImageUrlField = () => {
    setImageUrls([...imageUrls, ""]);
  };

  const removeImageUrl = (index) => {
    setImageUrls(imageUrls.filter((_, i) => i !== index));
  };

  const toggleSize = (size) => {
    setFormData((prev) => ({
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

    setFormData((prev) => ({
      ...prev,
      colors: prev.colors.includes(customColor)
        ? prev.colors
        : [...prev.colors, customColor],
    }));
  };

  const removeColor = (hex) => {
    setFormData((prev) => ({
      ...prev,
      colors: prev.colors.filter((c) => c !== hex),
    }));
  };

  const handleSubmit = async () => {
    // Validation
    if (
      !formData.name ||
      !formData.price ||
      !formData.sku ||
      !formData.category ||
      !formData.stock ||
      !formData.description
    ) {
      alert("Please fill in all required fields");
      return;
    }

    const validUrls = imageUrls.filter((url) => url.trim() !== "");
    if (validUrls.length === 0) {
      alert("Please add at least one image URL");
      return;
    }

    try {
      const tagsArray = formData.tags
        .split(",")
        .map((tag) => tag.trim())
        .filter((tag) => tag !== "");

      const payload = {
        id: id,
        name: formData.name,
        price: Number(formData.price),
        description: formData.description,
        category: formData.category,
        sku: formData.sku,
        tags: tagsArray,
        images: validUrls,
        sizes: formData.sizes,
        colors: formData.colors,
        stock: Number(formData.stock),
      };

      await updateProduct(payload).unwrap();
      alert("Product updated successfully!");
      navigate("/dashboard");
    } catch (error) {
      alert(
        "Failed to update product: " +
          (error.data?.message || error.message || "Please try again")
      );
    }
  };

  if (isFetching) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <p className="text-xl text-gray-600">Loading product...</p>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <p className="text-xl text-red-600">Product not found</p>
      </div>
    );
  }

  /* -------------------- UI -------------------- */
  return (
    <div className="flex flex-col min-h-screen">
      <div className="px-8 py-10 flex flex-col gap-6 items-center">
        <h1 className="text-4xl font-bold mb-8">Edit Product</h1>

        <div className="w-full max-w-6xl">
          <div className="flex flex-col lg:flex-row gap-10">
            {/* Product Images */}
            <div className="flex-1">
              <h2 className="text-2xl font-semibold mb-6">Product Images</h2>

              <div className="space-y-4 mb-6">
                {imageUrls.map((url, index) => (
                  <div key={index} className="flex gap-2">
                    <input
                      type="url"
                      value={url}
                      onChange={(e) =>
                        handleImageUrlChange(index, e.target.value)
                      }
                      placeholder="Enter image URL (e.g., https://example.com/image.jpg)"
                      className="flex-1 border px-4 py-3 rounded-md"
                    />
                    {imageUrls.length > 1 && (
                      <button
                        onClick={() => removeImageUrl(index)}
                        className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600"
                      >
                        <DeleteIcon />
                      </button>
                    )}
                  </div>
                ))}
                <button
                  onClick={addImageUrlField}
                  className="border px-6 py-3 rounded-md hover:bg-gray-50"
                >
                  + Add Another Image URL
                </button>
              </div>

              {/* Image Preview */}
              {imageUrls.some((url) => url.trim() !== "") && (
                <div>
                  <h3 className="text-lg font-medium mb-3">Preview</h3>
                  <div className="flex flex-wrap gap-4">
                    {imageUrls
                      .filter((url) => url.trim() !== "")
                      .map((url, index) => (
                        <div key={index} className="relative group">
                          <img
                            src={url}
                            alt={`preview ${index + 1}`}
                            className="w-24 h-24 object-cover rounded-lg"
                            onError={(e) => {
                              e.target.src =
                                "https://via.placeholder.com/100?text=Invalid+URL";
                            }}
                          />
                        </div>
                      ))}
                  </div>
                </div>
              )}

              <h2 className="text-2xl font-semibold mb-6 mt-8">
                Product Details
              </h2>

              <div className="flex flex-col gap-6">
                <input
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  placeholder="Product Name*"
                  className="border px-4 py-3 rounded-md"
                />

                <input
                  type="number"
                  name="price"
                  value={formData.price}
                  onChange={handleInputChange}
                  placeholder="Price (Rs.)*"
                  className="border px-4 py-3 rounded-md"
                />

                <input
                  name="sku"
                  value={formData.sku}
                  onChange={handleInputChange}
                  placeholder="SKU*"
                  className="border px-4 py-3 rounded-md"
                />

                <select
                  name="category"
                  value={formData.category}
                  onChange={handleInputChange}
                  className="border px-4 py-3 rounded-md"
                >
                  <option value="">Select category*</option>
                  {categories.map((cat) => (
                    <option key={cat} value={cat}>
                      {cat}
                    </option>
                  ))}
                </select>

                <input
                  type="number"
                  name="stock"
                  value={formData.stock}
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
              value={formData.description}
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
                  className={`px-6 py-3 border rounded-md transition ${
                    formData.sizes.includes(size)
                      ? "bg-black text-white"
                      : "hover:bg-gray-100"
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
            {formData.colors.length > 0 && (
              <div className="flex gap-4 flex-wrap mb-4">
                {formData.colors.map((hex) => (
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
                      <DeleteIcon fontSize="small" />
                    </button>
                  </div>
                ))}
              </div>
            )}

            {/* Color Input */}
            <div className="flex items-center gap-4">
              <input
                type="color"
                value={customColor}
                onChange={(e) => setCustomColor(e.target.value)}
                className="w-14 h-14 cursor-pointer"
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
              value={formData.tags}
              onChange={handleInputChange}
              placeholder="Tags (comma separated)"
              className="w-full border px-4 py-3 rounded-md"
            />
            <p className="text-sm text-gray-500 mt-2">
              Example: Modern, Luxury, Wooden
            </p>
          </div>

          {/* Actions */}
          <div className="mt-10 flex gap-6">
            <button
              onClick={handleSubmit}
              disabled={isLoading}
              className="bg-black text-white px-12 py-4 rounded-md hover:bg-gray-800 disabled:bg-gray-400 disabled:cursor-not-allowed"
            >
              {isLoading ? "Updating..." : "Update Product"}
            </button>
            <button
              onClick={() => navigate("/dashboard")}
              className="border px-12 py-4 rounded-md hover:bg-gray-50"
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditProduct;
