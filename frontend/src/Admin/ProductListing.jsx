import React from "react";
import BorderColorIcon from "@mui/icons-material/BorderColor";
import DeleteIcon from "@mui/icons-material/Delete";
import SearchIcon from "@mui/icons-material/Search";
import { Link } from "react-router";

const ProductListing = () => {
  return (
    <div className="min-h-screen bg-white p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Manage Products
          </h1>
        </div>

        {/* Filters */}
        <div className="bg-gray-50 rounded-lg p-6 mb-8">
          <div className="relative">
            <SearchIcon className="absolute left-3 top-3 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Search by name or SKU..."
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg"
            />
          </div>
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="relative group rounded-lg p-4">
            {/* Action Buttons */}
            <div className="absolute top-6 right-6 flex gap-2 ">
              <button className="p-2 bg-white rounded-full shadow">
                <Link to="/editProduct">
                  <BorderColorIcon className="w-5 h-5 " />
                </Link>
              </button>
              <button className="p-2 bg-white rounded-full shadow">
                <DeleteIcon className="w-5 h-5 " />
              </button>
            </div>

            <Link to="#">
              {/* Image */}
              <div className="bg-amber-100 rounded-lg h-80 flex items-center justify-center">
                Image
              </div>

              {/* Info */}
              <h2 className="text-xl mt-4">Product Name</h2>
              <p className="text-2xl font-bold">Rs. 0</p>

              <div className="flex gap-2 mt-2">
                <span className="px-3 py-1 bg-green-100 rounded-full text-sm">
                  Stock: 0
                </span>
                <span className="px-3 py-1 bg-gray-100 rounded-full text-sm">
                  Category
                </span>
              </div>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductListing;
