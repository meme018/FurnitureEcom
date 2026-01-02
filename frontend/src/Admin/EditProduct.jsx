import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import DeleteIcon from "@mui/icons-material/Delete";
import { Link } from "react-router";

const EditProduct = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <div className="px-8 py-10 flex flex-col gap-6 items-center">
        <h1 className="text-4xl font-bold mb-8">Edit Product</h1>

        <div className="w-full max-w-6xl">
          <div className="flex flex-col lg:flex-row gap-10">
            {/* Product Images */}
            <div className="flex-1">
              <h2 className="text-2xl font-semibold mb-6">Product Images</h2>

              <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center mb-6">
                <input type="file" className="hidden" />
                <label className="cursor-pointer flex flex-col items-center">
                  <CloudUploadIcon className="w-16 h-16 text-gray-400 mb-4" />
                  <p className="text-lg font-medium">Click to upload images</p>
                </label>
              </div>

              {/* Image Preview */}
              <div className="flex flex-wrap gap-4">
                <div className="relative group">
                  <img
                    src=""
                    alt="preview"
                    className="w-24 h-24 object-cover rounded-lg bg-gray-200"
                  />
                  <button className="absolute top-1 right-1 bg-red-500 text-white p-1 rounded-full opacity-0 group-hover:opacity-100">
                    <DeleteIcon />
                  </button>
                </div>
              </div>

              {/* Product Details */}
              <h2 className="text-2xl font-semibold mb-6 mt-8">
                Product Details
              </h2>

              <div className="flex flex-col gap-6">
                <input
                  type="text"
                  placeholder="Product Name*"
                  className="border px-4 py-3 rounded-md"
                />

                <input
                  type="number"
                  placeholder="Price (Rs.)*"
                  className="border px-4 py-3 rounded-md"
                />

                <input
                  type="text"
                  placeholder="SKU*"
                  className="border px-4 py-3 rounded-md"
                />

                <select className="border px-4 py-3 rounded-md">
                  <option>Select category</option>
                  <option>Sofas</option>
                  <option>Chairs</option>
                  <option>Tables</option>
                  <option>Beds</option>
                </select>

                <input
                  type="number"
                  placeholder="Stock Quantity*"
                  className="border px-4 py-3 rounded-md"
                />
              </div>
            </div>
          </div>

          {/* Description */}
          <div className="mt-10">
            <textarea
              rows="6"
              placeholder="Product description*"
              className="w-full border px-4 py-3 rounded-md"
            />
          </div>

          {/* Sizes */}
          <div className="mt-8">
            <h3 className="text-xl font-medium mb-3">Available Sizes</h3>
            <div className="flex gap-3 flex-wrap">
              <button className="px-6 py-3 border rounded-md">XS</button>
              <button className="px-6 py-3 border rounded-md">S</button>
              <button className="px-6 py-3 border rounded-md">M</button>
              <button className="px-6 py-3 border rounded-md">L</button>
              <button className="px-6 py-3 border rounded-md">XL</button>
              <button className="px-6 py-3 border rounded-md">XXL</button>
            </div>
          </div>

          {/* Colors */}
          <div className="mt-8">
            <h3 className="text-xl font-medium mb-3">Available Colors</h3>

            {/* Selected Colors */}
            <div className="flex gap-4 flex-wrap mb-4">
              <div className="relative group">
                <div className="w-12 h-12 rounded-full bg-black ring-2 ring-black" />
                <button className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 opacity-0 group-hover:opacity-100">
                  <DeleteIcon fontSize="small" />
                </button>
              </div>
            </div>

            {/* Color Input */}
            <div className="flex items-center gap-4">
              <input type="color" className="w-14 h-14" />
              <input
                type="text"
                placeholder="#000000"
                className="border px-4 py-3 rounded-md w-40"
              />
              <button className="border px-6 py-3 rounded-md">Add Color</button>
            </div>
          </div>

          {/* Tags */}
          <div className="mt-8">
            <input
              type="text"
              placeholder="Tags (comma separated)"
              className="w-full border px-4 py-3 rounded-md"
            />
          </div>

          {/* Actions */}
          <div className="mt-10 flex gap-6">
            <button className="bg-black text-white px-12 py-4 rounded-md">
              Update Product
            </button>
            <Link to="/Dashboard">
              <button className="border px-12 py-4 rounded-md">Cancel</button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditProduct;
