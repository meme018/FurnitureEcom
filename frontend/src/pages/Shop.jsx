import React, { useState } from "react";
import ArrowForwardIosOutlinedIcon from "@mui/icons-material/ArrowForwardIosOutlined";
import ProductCard from "../components/ProductCard";
import SearchIcon from "@mui/icons-material/Search";
import { Link } from "react-router";
import { useGetProductQuery } from "../services/productApi";

const Shop = () => {
  const { data, isLoading, isError, error } = useGetProductQuery();
  const [searchTerm, setSearchTerm] = useState("");
  const [itemsPerPage, setItemsPerPage] = useState(16);
  const [sortBy, setSortBy] = useState("default");
  const [currentPage, setCurrentPage] = useState(1);

  // Extract products from the data object
  const products = data?.data || [];

  // Filter products based on search
  const filteredProducts = products.filter((product) =>
    product.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Sort products
  const sortedProducts = [...filteredProducts].sort((a, b) => {
    if (sortBy === "price") {
      return a.price - b.price;
    }
    return 0; // default order
  });

  // Calculate pagination
  const totalPages = Math.ceil(sortedProducts.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const displayedProducts = sortedProducts.slice(startIndex, endIndex);

  // Reset to page 1 when search or filter changes
  React.useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm, sortBy, itemsPerPage]);

  return (
    <div className="flex flex-col min-h-screen pt-25">
      <div
        className="flex flex-col w-auto h-80 mx-10 gap-8 bg-[url('https://plus.unsplash.com/premium_photo-1661766077694-6e3750b0fb97?q=80&w=1931&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')]
       bg-center bg-no-repeat bg-cover rounded-3xl mb-10 bg-transparent flex items-center justify-center"
      >
        <p className="text-4xl font-semibold">Shop</p>
        <p>
          <Link to="/" className="text-lg font-bold">
            Home
          </Link>{" "}
          <ArrowForwardIosOutlinedIcon />{" "}
          <span className="text-lg text-gray-500">Shop</span>
        </p>
      </div>

      <div className="flex flex-wrap mx-10 items-center justify-between gap-4 mb-8 text-sm text-gray-600">
        {/* Left */}
        <div className="flex text-lg items-center gap-4">
          <button className="flex items-center gap-1 hover:text-black">
            ☰ Filter
          </button>
          <span>
            Showing {startIndex + 1}–
            {Math.min(endIndex, filteredProducts.length)} of{" "}
            {filteredProducts.length} results
          </span>
        </div>

        {/* Right */}
        <div className="flex text-lg items-center gap-4">
          <div className="flex items-center gap-2">
            <span>Show</span>
            <select
              className="border rounded-md px-2 py-1"
              value={itemsPerPage}
              onChange={(e) => setItemsPerPage(Number(e.target.value))}
            >
              <option value={16}>16</option>
              <option value={32}>32</option>
            </select>
          </div>

          <div className="flex items-center gap-2">
            <span>Sort by</span>
            <select
              className="border rounded-md px-2 py-1"
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
            >
              <option value="default">Default</option>
              <option value="price">Price</option>
            </select>
          </div>
        </div>
      </div>

      <div className="rounded-lg p-6 mb-8 min-w-4xl mx-auto">
        <div className="relative">
          <SearchIcon className="absolute left-3 top-3 text-gray-400 w-5 h-5" />
          <input
            type="text"
            placeholder="Search for furnitures..."
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      {/* Loading State */}
      {isLoading && (
        <div className="flex justify-center items-center h-64">
          <p className="text-xl text-gray-600">Loading products...</p>
        </div>
      )}

      {/* Error State */}
      {isError && (
        <div className="flex justify-center items-center h-64">
          <p className="text-xl text-red-600">
            Error loading products: {error?.message || "Please try again later"}
          </p>
        </div>
      )}

      {/* Products Grid */}
      {!isLoading && !isError && (
        <>
          {displayedProducts.length > 0 ? (
            <div className="grid grid-cols-2 mx-10 mb-10 sm:grid-cols-3 lg:grid-cols-4 gap-x-6 gap-y-12">
              {displayedProducts.map((product) => (
                <ProductCard key={product._id} product={product} />
              ))}
            </div>
          ) : (
            <div className="flex justify-center items-center h-64">
              <p className="text-xl text-gray-600">
                No products found matching your search.
              </p>
            </div>
          )}

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="flex justify-center mt-12 mx-10 mb-15">
              <div className="flex text-xl items-center gap-2">
                {/* Previous Button */}
                {currentPage > 1 && (
                  <button
                    onClick={() => setCurrentPage(currentPage - 1)}
                    className="px-4 h-15 w-30 rounded-md hover:bg-yellow-100"
                  >
                    Previous
                  </button>
                )}

                {/* Page Numbers */}
                {Array.from({ length: totalPages }, (_, i) => i + 1).map(
                  (page) => (
                    <button
                      key={page}
                      onClick={() => setCurrentPage(page)}
                      className={`w-15 h-15 rounded-md text-sm font-medium ${
                        currentPage === page
                          ? "bg-yellow-100"
                          : "hover:bg-yellow-100"
                      }`}
                    >
                      {page}
                    </button>
                  )
                )}

                {/* Next Button */}
                {currentPage < totalPages && (
                  <button
                    onClick={() => setCurrentPage(currentPage + 1)}
                    className="px-4 h-15 w-30 rounded-md hover:bg-yellow-100"
                  >
                    Next
                  </button>
                )}
              </div>
            </div>
          )}
        </>
      )}

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

export default Shop;
