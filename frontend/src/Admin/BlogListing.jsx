import React, { useState } from "react";
import BorderColorIcon from "@mui/icons-material/BorderColor";
import DeleteIcon from "@mui/icons-material/Delete";
import SearchIcon from "@mui/icons-material/Search";
import PersonIcon from "@mui/icons-material/Person";
import CalendarTodayIcon from "@mui/icons-material/CalendarToday";
import LocalOfferIcon from "@mui/icons-material/LocalOffer";
import { Link } from "react-router";
import { useGetBlogsQuery, useDeleteBlogMutation } from "../services/blogApi";

const BlogListing = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const { data: blogsData, isLoading, isError } = useGetBlogsQuery();
  const [deleteBlog] = useDeleteBlogMutation();

  const blogs = blogsData?.data || [];

  // Format date
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });
  };

  // Filter blogs based on search
  const filteredBlogs = blogs.filter(
    (blog) =>
      blog.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      blog.author.toLowerCase().includes(searchQuery.toLowerCase()) ||
      blog.category.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Handle delete
  const handleDelete = async (id, title) => {
    if (window.confirm(`Are you sure you want to delete "${title}"?`)) {
      try {
        await deleteBlog(id).unwrap();
        alert("Blog deleted successfully!");
      } catch (error) {
        console.error("Failed to delete blog:", error);
        alert("Failed to delete blog. Please try again.");
      }
    }
  };

  return (
    <div className="min-h-screen bg-white p-8 pt-24">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8 flex justify-between items-center">
          <div className="mx-auto">
            <h1 className="text-3xl font-bold text-gray-900 mb-2 ">
              Manage Blogs
            </h1>
            <p className="text-gray-600">
              {blogs.length} blog{blogs.length !== 1 ? "s" : ""} total
            </p>
          </div>
        </div>

        {/* Search */}
        <div className="bg-gray-50 rounded-lg p-6 mb-8">
          <div className="relative">
            <SearchIcon className="absolute left-3 top-3 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Search by title, author, or category..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-400"
            />
          </div>
        </div>

        {/* Loading & Error States */}
        {isLoading && (
          <div className="text-center py-12">
            <p className="text-gray-500 text-lg">Loading blogs...</p>
          </div>
        )}

        {isError && (
          <div className="text-center py-12">
            <p className="text-red-500 text-lg">Error loading blogs</p>
          </div>
        )}

        {/* No Results */}
        {!isLoading && !isError && filteredBlogs.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-500 text-lg">
              {searchQuery
                ? "No blogs found matching your search"
                : "No blogs yet"}
            </p>
          </div>
        )}

        {/* Blog Posts */}
        {!isLoading && !isError && filteredBlogs.length > 0 && (
          <div className="max-w-4xl mx-auto">
            {filteredBlogs.map((blog) => (
              <article key={blog._id} className="mb-12 relative group">
                {/* Action Buttons */}
                <div className="absolute top-4 right-4 flex gap-2 z-10">
                  <Link to={`/editBlog/${blog._id}`}>
                    <button className="p-2 bg-white rounded-full shadow hover:bg-gray-100 transition-colors">
                      <BorderColorIcon className="w-5 h-5 " />
                    </button>
                  </Link>
                  <button
                    onClick={() => handleDelete(blog._id, blog.title)}
                    className="p-2 bg-white rounded-full shadow hover:bg-gray-100 transition-colors"
                  >
                    <DeleteIcon className="w-5 h-5 " />
                  </button>
                </div>

                {/* Image */}
                <div className="w-full h-80 bg-gray-200 rounded-lg mb-4 overflow-hidden">
                  <img
                    src={blog.image}
                    alt={blog.title}
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                  />
                </div>

                {/* Meta */}
                <div className="flex gap-6 text-sm text-gray-500 mb-3">
                  <span className="flex items-center gap-1">
                    <PersonIcon fontSize="small" /> {blog.author}
                  </span>
                  <span className="flex items-center gap-1">
                    <CalendarTodayIcon fontSize="small" />{" "}
                    {formatDate(blog.date)}
                  </span>
                  <span className="flex items-center gap-1">
                    <LocalOfferIcon fontSize="small" /> {blog.category}
                  </span>
                </div>

                {/* Content */}
                <h2 className="text-3xl font-semibold mb-3">{blog.title}</h2>
                <p className="text-gray-600 mb-4 line-clamp-3">
                  {blog.description}
                </p>
              </article>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default BlogListing;
