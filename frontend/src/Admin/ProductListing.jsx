import React, { useState } from "react";
import BorderColorIcon from "@mui/icons-material/BorderColor";
import DeleteIcon from "@mui/icons-material/Delete";
import SearchIcon from "@mui/icons-material/Search";
import AddIcon from "@mui/icons-material/Add";
import { Link } from "react-router";
import {
  useGetProductQuery,
  useDeleteProductMutation,
} from "../services/productApi";

const ProductListing = () => {
  const { data, isLoading, isError } = useGetProductQuery();
  const [deleteProduct] = useDeleteProductMutation();
  const [searchTerm, setSearchTerm] = useState("");
  const [deleteConfirm, setDeleteConfirm] = useState(null);

  const products = data?.data || [];

  // Filter products based on search
  const filteredProducts = products.filter(
    (product) =>
      product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.sku.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleDelete = async (id) => {
    try {
      await deleteProduct(id).unwrap();
      alert("Product deleted successfully!");
      setDeleteConfirm(null);
    } catch (error) {
      alert(
        "Failed to delete product: " + (error.message || "Please try again")
      );
    }
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <p className="text-xl text-gray-600">Loading products...</p>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <p className="text-xl text-red-600">Error loading products</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8 flex justify-between items-center">
          <div className="mx-auto">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              Manage Products
            </h1>
            <p className="text-gray-600">
              Total Products: {filteredProducts.length}
            </p>
          </div>
        </div>

        {/* Filters */}
        <div className="bg-gray-50 rounded-lg p-6 mb-8">
          <div className="relative">
            <SearchIcon className="absolute left-3 top-3 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Search by name or SKU..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg"
            />
          </div>
        </div>

        {/* Products Grid */}
        {filteredProducts.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {filteredProducts.map((product) => (
              <div
                key={product._id}
                className="relative group rounded-lg p-4 border hover:shadow-lg transition"
              >
                {/* Action Buttons */}
                <div className="absolute top-6 right-6 flex gap-2 z-10">
                  <Link to={`/editProduct/${product._id}`}>
                    <button className="p-2 bg-white rounded-full shadow hover:bg-gray-100">
                      <BorderColorIcon className="w-5 h-5" />
                    </button>
                  </Link>
                  <button
                    onClick={() => setDeleteConfirm(product._id)}
                    className="p-2 bg-white rounded-full shadow hover:bg-red-50"
                  >
                    <DeleteIcon className="w-5 h-5 text-red-600" />
                  </button>
                </div>

                {/* Image */}
                <div className="bg-amber-100 rounded-lg h-80 flex items-center justify-center overflow-hidden">
                  <img
                    src={product.images?.[0]}
                    alt={product.name}
                    className="w-full h-full object-cover"
                  />
                </div>

                {/* Info */}
                <h2 className="text-xl mt-4 font-semibold truncate">
                  {product.name}
                </h2>
                <p className="text-2xl font-bold">
                  Rs. {product.price.toLocaleString()}
                </p>

                <div className="flex gap-2 mt-2 flex-wrap">
                  <span
                    className={`px-3 py-1 rounded-full text-sm ${
                      product.stock > 0
                        ? "bg-green-100 text-green-700"
                        : "bg-red-100 text-red-700"
                    }`}
                  >
                    Stock: {product.stock}
                  </span>
                  <span className="px-3 py-1 bg-gray-100 rounded-full text-sm">
                    {product.category}
                  </span>
                </div>
                <p className="text-sm text-gray-500 mt-2">SKU: {product.sku}</p>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-16">
            <p className="text-xl text-gray-500">No products found</p>
          </div>
        )}

        {/* Delete Confirmation Modal */}
        {deleteConfirm && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg p-8 max-w-md w-full mx-4">
              <h2 className="text-2xl font-bold mb-4">Confirm Delete</h2>
              <p className="text-gray-600 mb-6">
                Are you sure you want to delete this product? This action cannot
                be undone.
              </p>
              <div className="flex gap-4">
                <button
                  onClick={() => handleDelete(deleteConfirm)}
                  className="flex-1 bg-red-600 text-white px-6 py-3 rounded-lg hover:bg-red-700"
                >
                  Delete
                </button>
                <button
                  onClick={() => setDeleteConfirm(null)}
                  className="flex-1 border px-6 py-3 rounded-lg hover:bg-gray-50"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductListing;
