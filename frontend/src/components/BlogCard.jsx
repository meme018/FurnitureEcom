import React from "react";
import sidetable from "../assets/sidetable.png";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import CalendarTodayIcon from "@mui/icons-material/CalendarToday";
import { Link } from "react-router";

const BlogCard = () => {
  return (
    <div className="flex flex-col items-center gap-5">
      <Link to="/blog">
        <img
          src={sidetable}
          alt="Blog Image"
          className="w-100 h-100 object-cover rounded-4xl"
        />
      </Link>

      <h2 className="text-2xl">Blog title</h2>
      <button className="text-2xl font-semibold border-b-2 pb-3">
        Read More
      </button>
      <div className="flex flex-row items-center gap-2 p-2">
        <AccessTimeIcon />
        <p>5 min</p>

        <CalendarTodayIcon />
        <p> 12th oct 2025</p>
      </div>
    </div>
  );
};

export default BlogCard;
