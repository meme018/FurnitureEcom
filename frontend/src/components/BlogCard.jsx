import React from "react";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import CalendarTodayIcon from "@mui/icons-material/CalendarToday";
import { Link } from "react-router";

const BlogCard = ({ blog }) => {
  // Format date to readable format
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });
  };

  return (
    <div className="flex flex-col items-center gap-5">
      <Link to={`/SingleBlog/${blog._id}`}>
        <img
          src={blog.image}
          alt={blog.title}
          className="w-full h-80 object-cover rounded-2xl"
        />
      </Link>

      <h2 className="text-2xl font-semibold text-center px-4">{blog.title}</h2>

      <p className="text-gray-600 text-center px-4 line-clamp-2">
        {blog.description}
      </p>

      <Link to={`/SingleBlog/${blog._id}`} className="text-lg text-gray-900">
        <button className="text-xl font-semibold border-b-2 border-gray-900 pb-2 hover:text-gray-700">
          Read blog
        </button>
      </Link>

      <div className="flex flex-row items-center gap-4 text-gray-500">
        <div className="flex items-center gap-1">
          <AccessTimeIcon fontSize="small" />
          <p>5 min</p>
        </div>

        <div className="flex items-center gap-1">
          <CalendarTodayIcon fontSize="small" />
          <p>{formatDate(blog.date)}</p>
        </div>
      </div>
    </div>
  );
};

export default BlogCard;
