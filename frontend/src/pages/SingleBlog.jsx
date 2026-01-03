import React from "react";
import CalendarTodayIcon from "@mui/icons-material/CalendarToday";
import LocalOfferIcon from "@mui/icons-material/LocalOffer";
import PersonIcon from "@mui/icons-material/Person";
import ArrowForwardIosOutlinedIcon from "@mui/icons-material/ArrowForwardIosOutlined";
import { Link, useParams } from "react-router";
import { useGetBlogByIdQuery } from "../services/blogApi";

const SingleBlog = () => {
  const { id } = useParams();
  const { data: blogData, isLoading, isError } = useGetBlogByIdQuery(id);
  const blogPost = blogData?.data;

  // Format date
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <p className="text-gray-500 text-xl">Loading blog...</p>
      </div>
    );
  }

  if (isError || !blogPost) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center">
          <p className="text-red-500 text-xl mb-4">Error loading blog</p>
          <Link to="/blog" className="text-amber-600 underline">
            Return to blogs
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      <div className="mx-auto px-4 sm:px-6 lg:px-8">
        {/* Breadcrumb */}
        <div className="flex flex-row py-10 items-center gap-2 text-lg max-w-6xl mx-auto mt-20">
          <Link to="/blog" className="hover:text-amber-600">
            Blog
          </Link>
          <ArrowForwardIosOutlinedIcon fontSize="small" />
          <span className="text-lg text-gray-500">Blog Details</span>
        </div>

        {/* Main Content */}
        <div className="max-w-6xl mx-auto">
          {/* Featured Image */}
          <img
            src={blogPost.image}
            alt={blogPost.title}
            className="w-full h-96 object-cover rounded-lg mb-8"
          />

          {/* Meta Information */}
          <div className="flex flex-wrap items-center gap-6 text-sm text-gray-500 mb-6">
            <div className="flex items-center gap-2">
              <PersonIcon fontSize="small" />
              <span>{blogPost.author}</span>
            </div>
            <div className="flex items-center gap-2">
              <CalendarTodayIcon fontSize="small" />
              <span>{formatDate(blogPost.date)}</span>
            </div>
            <div className="flex items-center gap-2">
              <LocalOfferIcon fontSize="small" />
              <span>{blogPost.category}</span>
            </div>
          </div>

          {/* Title */}
          <h1 className="text-4xl font-bold text-gray-900 mb-6">
            {blogPost.title}
          </h1>

          {/* Content */}
          <div
            className="prose prose-lg max-w-none"
            style={{ lineHeight: "1.8" }}
          >
            <p className="text-gray-700 text-lg mb-6">{blogPost.description}</p>
          </div>

          {/* Back to blog button */}
          <div className="mt-12 mb-8">
            <Link to="/blog">
              <button className="px-6 py-3 bg-amber-100 text-gray-900 rounded-lg hover:bg-amber-200 transition-colors">
                ← Back to all blogs
              </button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SingleBlog;
