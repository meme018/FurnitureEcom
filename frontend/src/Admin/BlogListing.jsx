import React from "react";
import BorderColorIcon from "@mui/icons-material/BorderColor";
import DeleteIcon from "@mui/icons-material/Delete";
import SearchIcon from "@mui/icons-material/Search";
import PersonIcon from "@mui/icons-material/Person";
import CalendarTodayIcon from "@mui/icons-material/CalendarToday";
import LocalOfferIcon from "@mui/icons-material/LocalOffer";
import { Link } from "react-router";

const BlogListing = () => {
  return (
    <div className="min-h-screen bg-white p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Manage Blogs
          </h1>
        </div>

        {/* Filters */}
        <div className="bg-gray-50 rounded-lg p-6 mb-8">
          <div className="relative">
            <SearchIcon className="absolute left-3 top-3 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Search by title or author..."
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg"
            />
          </div>
        </div>

        {/* Blog Posts */}
        <div className="max-w-4xl mx-auto">
          <article className="mb-12 relative group">
            {/* Action Buttons */}
            <div className="absolute top-4 right-4 flex gap-2 ">
              <button className="p-2 bg-white rounded-full shadow">
                <Link to="/editBlog">
                  <BorderColorIcon className="w-5 h-5" />
                </Link>
              </button>
              <button className="p-2 bg-white rounded-full shadow">
                <DeleteIcon className="w-5 h-5" />
              </button>
            </div>

            <Link to="#">
              {/* Image */}
              <div className="w-full h-80 bg-gray-200 rounded-lg mb-4 flex items-center justify-center">
                Image
              </div>

              {/* Meta */}
              <div className="flex gap-6 text-sm text-gray-500 mb-3">
                <span className="flex items-center gap-1">
                  <PersonIcon fontSize="small" /> Author
                </span>
                <span className="flex items-center gap-1">
                  <CalendarTodayIcon fontSize="small" /> Date
                </span>
                <span className="flex items-center gap-1">
                  <LocalOfferIcon fontSize="small" /> Category
                </span>
              </div>

              {/* Content */}
              <h2 className="text-3xl font-semibold mb-3">Blog Title</h2>
              <p className="text-gray-600 mb-4">
                Blog description preview goes here...
              </p>
            </Link>
          </article>
        </div>
      </div>
    </div>
  );
};

export default BlogListing;
