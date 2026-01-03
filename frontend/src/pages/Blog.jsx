import React, { useState } from "react";
import CalendarTodayIcon from "@mui/icons-material/CalendarToday";
import LocalOfferIcon from "@mui/icons-material/LocalOffer";
import PersonIcon from "@mui/icons-material/Person";
import SearchIcon from "@mui/icons-material/Search";
import { Link } from "react-router";
import { useGetBlogsQuery } from "../services/blogApi";

const Blog = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const { data: blogsData, isLoading, isError } = useGetBlogsQuery();
  const blogPosts = blogsData?.data || [];

  // Format date
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });
  };

  // Filter blogs based on search query
  const filteredBlogs = blogPosts.filter(
    (blog) =>
      blog.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      blog.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      blog.category.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Get recent posts (last 5)
  const recentPosts = [...blogPosts].reverse().slice(0, 5);

  // Get categories with counts
  const categories = blogPosts.reduce((acc, blog) => {
    const category = blog.category;
    acc[category] = (acc[category] || 0) + 1;
    return acc;
  }, {});

  const categoryArray = Object.entries(categories).map(([name, count]) => ({
    name,
    count,
  }));

  return (
    <div className="min-h-screen bg-white pt-20">
      <div className="max-w-7xl mx-auto px-8 py-12">
        <div className="flex gap-10">
          {/* Main Content */}
          <div style={{ width: "66%" }}>
            {isLoading ? (
              <p className="text-gray-500 text-center">Loading blogs...</p>
            ) : isError ? (
              <p className="text-red-500 text-center">Error loading blogs</p>
            ) : filteredBlogs.length === 0 ? (
              <p className="text-gray-500 text-center">No blogs found</p>
            ) : (
              <>
                {filteredBlogs.map((post) => (
                  <article key={post._id} className="mb-12">
                    <img
                      src={post.image}
                      alt={post.title}
                      className="w-full rounded-lg mb-4"
                      style={{ height: "320px", objectFit: "cover" }}
                    />

                    <div className="flex items-center gap-6 text-sm text-gray-500 mb-3">
                      <span className="flex items-center gap-1">
                        <PersonIcon fontSize="small" />
                        {post.author}
                      </span>
                      <span className="flex items-center gap-1">
                        <CalendarTodayIcon fontSize="small" />
                        {formatDate(post.date)}
                      </span>
                      <span className="flex items-center gap-1">
                        <LocalOfferIcon fontSize="small" />
                        {post.category}
                      </span>
                    </div>

                    <h2 className="text-3xl font-semibold mb-3 text-gray-900">
                      {post.title}
                    </h2>

                    <p
                      className="text-gray-600 mb-4"
                      style={{ lineHeight: "1.7" }}
                    >
                      {post.description}
                    </p>

                    <Link to={`/singleBlog/${post._id}`}>
                      <button className="text-gray-900 font-medium border-b-2 border-gray-900 pb-1 hover:text-gray-700">
                        Read more
                      </button>
                    </Link>
                  </article>
                ))}

                {/* Pagination - only show if there are blogs */}
                {filteredBlogs.length > 3 && (
                  <div className="flex items-center justify-center gap-4 mt-12">
                    <button className="w-12 h-12 flex items-center justify-center bg-amber-100 text-gray-900 rounded-lg hover:bg-amber-200">
                      1
                    </button>
                    <button className="w-12 h-12 flex items-center justify-center bg-amber-50 text-gray-700 rounded-lg hover:bg-amber-100">
                      2
                    </button>
                    <button className="w-12 h-12 flex items-center justify-center bg-amber-50 text-gray-700 rounded-lg hover:bg-amber-100">
                      3
                    </button>
                    <button className="px-6 h-12 flex items-center justify-center bg-amber-50 text-gray-700 rounded-lg hover:bg-amber-100">
                      Next
                    </button>
                  </div>
                )}
              </>
            )}
          </div>

          {/* Sidebar */}
          <div style={{ width: "34%" }}>
            {/* Search */}
            <div className="mb-8">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-400"
                  style={{ paddingRight: "48px" }}
                />
                <button
                  className="absolute top-0 bottom-0 flex items-center justify-center"
                  style={{ right: "12px" }}
                >
                  <SearchIcon fontSize="small" className="text-gray-400" />
                </button>
              </div>
            </div>

            {/* Categories */}
            {categoryArray.length > 0 && (
              <div className="mb-8">
                <h3 className="text-xl font-semibold mb-6 text-gray-900">
                  Categories
                </h3>
                <div className="flex flex-col gap-4">
                  {categoryArray.map((category) => (
                    <div
                      key={category.name}
                      className="flex items-center justify-between text-gray-600 hover:text-gray-900 cursor-pointer"
                    >
                      <span>{category.name}</span>
                      <span className="text-gray-400">{category.count}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Recent Posts */}
            {recentPosts.length > 0 && (
              <div>
                <h3 className="text-xl font-semibold mb-6 text-gray-900">
                  Recent Posts
                </h3>
                <div className="flex flex-col gap-6">
                  {recentPosts.map((post) => (
                    <Link
                      to={`/singleBlog/${post._id}`}
                      key={post._id}
                      className="flex gap-4 cursor-pointer hover:opacity-80"
                    >
                      <img
                        src={post.image}
                        alt={post.title}
                        className="rounded-lg"
                        style={{
                          width: "80px",
                          height: "80px",
                          objectFit: "cover",
                          flexShrink: 0,
                        }}
                      />
                      <div className="flex-1">
                        <h4 className="text-sm font-medium text-gray-900 mb-2 hover:text-amber-600">
                          {post.title}
                        </h4>
                        <p className="text-xs text-gray-500">
                          {formatDate(post.date)}
                        </p>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Blog;
