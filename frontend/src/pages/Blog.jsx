import React, { useState } from "react";
import CalendarTodayIcon from "@mui/icons-material/CalendarToday";
import LocalOfferIcon from "@mui/icons-material/LocalOffer";
import PersonIcon from "@mui/icons-material/Person";
import SearchIcon from "@mui/icons-material/Search";

const Blog = () => {
  const [searchQuery, setSearchQuery] = useState("");

  const blogPosts = [
    {
      id: 1,
      image:
        "https://images.unsplash.com/photo-1499750310107-5fef28a66643?w=800&q=80",
      title: "Going all-in with millennial design",
      excerpt:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Mus mauris vitae ultricies leo integer malesuada nunc. In nulla posuere sollicitudin aliquam ultrices sagittis orci a scelerisque. Diam phasellus vestibulum lorem sed risus ultricies.",
      author: "Admin",
      date: "14 Oct 2022",
      category: "Handmade",
    },
    {
      id: 2,
      image:
        "https://images.unsplash.com/photo-1484480974693-6ca0a78fb36b?w=800&q=80",
      title: "Exploring new ways of decorating",
      excerpt:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Mus mauris vitae ultricies leo integer malesuada nunc. In nulla posuere sollicitudin aliquam ultrices sagittis orci a scelerisque. Diam phasellus vestibulum lorem sed risus ultricies.",
      author: "Admin",
      date: "14 Oct 2022",
      category: "Handmade",
    },
    {
      id: 3,
      image:
        "https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?w=800&q=80",
      title: "Handmade pieces that took time to make",
      excerpt:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Mus mauris vitae ultricies leo integer malesuada nunc. In nulla posuere sollicitudin aliquam ultrices sagittis orci a scelerisque. Diam phasellus vestibulum lorem sed risus ultricies.",
      author: "Admin",
      date: "14 Oct 2022",
      category: "Wood",
    },
  ];

  const recentPosts = [
    {
      id: 1,
      image:
        "https://images.unsplash.com/photo-1499750310107-5fef28a66643?w=200&q=80",
      title: "Going all-in with millennial design",
      date: "14 Aug 2022",
    },
    {
      id: 2,
      image:
        "https://images.unsplash.com/photo-1484480974693-6ca0a78fb36b?w=200&q=80",
      title: "Exploring new ways of decorating",
      date: "14 Aug 2022",
    },
    {
      id: 3,
      image:
        "https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?w=200&q=80",
      title: "Handmade pieces that took time to make",
      date: "14 Aug 2022",
    },
    {
      id: 4,
      image:
        "https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=200&q=80",
      title: "Modern concepts for new spaces",
      date: "14 Aug 2022",
    },
    {
      id: 5,
      image:
        "https://images.unsplash.com/photo-1484480974693-6ca0a78fb36b?w=200&q=80",
      title: "Colorful office redesign",
      date: "14 Aug 2022",
    },
  ];

  const categories = [
    { name: "Crafts", count: 2 },
    { name: "Design", count: 8 },
    { name: "Handmade", count: 7 },
    { name: "Interior", count: 1 },
    { name: "Wood", count: 6 },
  ];

  return (
    <div className="min-h-screen bg-white pt-20">
      <div className="max-w-7xl mx-auto px-8 py-12">
        <div className="flex gap-10">
          {/* Main Content */}
          <div style={{ width: "66%" }}>
            {blogPosts.map((post) => (
              <article key={post.id} className="mb-12">
                <img
                  src={post.image}
                  alt={post.title}
                  className="w-full rounded-lg mb-4"
                  style={{ height: "320px", objectFit: "cover" }}
                />

                <div className="flex items-center gap-6 text-sm text-gray-500 mb-3">
                  <span className="flex items-center gap-1">
                    <PersonIcon size={16} />
                    {post.author}
                  </span>
                  <span className="flex items-center gap-1">
                    <CalendarTodayIcon size={16} />
                    {post.date}
                  </span>
                  <span className="flex items-center gap-1">
                    <LocalOfferIcon size={16} />
                    {post.category}
                  </span>
                </div>

                <h2 className="text-3xl font-semibold mb-3 text-gray-900">
                  {post.title}
                </h2>

                <p className="text-gray-600 mb-4" style={{ lineHeight: "1.7" }}>
                  {post.excerpt}
                </p>

                <button className="text-gray-900 font-medium border-b-2 border-gray-900 pb-1 hover:text-gray-700">
                  Read more
                </button>
              </article>
            ))}

            {/* Pagination */}
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
                  <SearchIcon size={20} className="text-gray-400" />
                </button>
              </div>
            </div>

            {/* Categories */}
            <div className="mb-8">
              <h3 className="text-xl font-semibold mb-6 text-gray-900">
                Categories
              </h3>
              <div className="flex flex-col gap-4">
                {categories.map((category) => (
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

            {/* Recent Posts */}
            <div>
              <h3 className="text-xl font-semibold mb-6 text-gray-900">
                Recent Posts
              </h3>
              <div className="flex flex-col gap-6">
                {recentPosts.map((post) => (
                  <div key={post.id} className="flex gap-4 cursor-pointer">
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
                      <p className="text-xs text-gray-500">{post.date}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Blog;
