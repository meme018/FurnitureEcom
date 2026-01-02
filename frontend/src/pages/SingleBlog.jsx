import React from "react";
import CalendarTodayIcon from "@mui/icons-material/CalendarToday";
import LocalOfferIcon from "@mui/icons-material/LocalOffer";
import PersonIcon from "@mui/icons-material/Person";
import ArrowForwardIosOutlinedIcon from "@mui/icons-material/ArrowForwardIosOutlined";
import { Link } from "react-router";

const SingleBlog = () => {
  // This would typically come from props or route params
  const blogPost = {
    id: 1,
    image:
      "https://images.unsplash.com/photo-1499750310107-5fef28a66643?w=1200&q=80",
    title: "Going all-in with millennial design",
    author: "Admin",
    date: "14 Oct 2022",
    category: "Handmade",
  };

  return (
    <div className="min-h-screen bg-white">
      <div className="mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-row py-10 items-center  gap-2 text-lg max-w-6xl mx-auto mt-20">
          <Link to="/blog">Blog</Link> <ArrowForwardIosOutlinedIcon />{" "}
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
              <PersonIcon className="text-lg" />
              <span>{blogPost.author}</span>
            </div>
            <div className="flex items-center gap-2">
              <CalendarTodayIcon className="text-lg" />
              <span>{blogPost.date}</span>
            </div>
            <div className="flex items-center gap-2">
              <LocalOfferIcon className="text-lg" />
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
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua. Mus
              mauris vitae ultricies leo integer malesuada nunc. In nulla
              posuere sollicitudin aliquam ultrices sagittis orci a scelerisque.
              Diam phasellus vestibulum lorem sed risus ultricies tristique
              nulla aliquet.
            </p>

            <p>
              Mollis nunc sed id semper risus in hendrerit gravida rutrum.
              Posuere urna nec tincidunt praesent semper feugiat. Habitant morbi
              tristique senectus et netus et malesuada fames ac. Ipsum a arcu
              cursus vitae congue mauris rhoncus aenean. Purus semper eget duis
              at tellus at urna condimentum.
            </p>

            <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">
              The Evolution of Modern Design
            </h2>

            <p>
              Facilisis mauris sit amet massa vitae tortor condimentum lacinia
              quis. Vitae elementum curabitur vitae nunc sed velit dignissim
              sodales ut. Eu scelerisque felis imperdiet proin fermentum leo vel
              orci porta. Pellentesque diam volutpat commodo sed egestas egestas
              fringilla phasellus.
            </p>
            <p>
              Ornare arcu dui vivamus arcu felis bibendum ut tristique et.
              Egestas dui id ornare arcu odio ut sem nulla. Eu consequat ac
              felis donec et odio pellentesque diam volutpat. Tincidunt eget
              nullam non nisi est sit amet facilisis magna.
            </p>

            <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">
              Key Principles to Follow
            </h2>

            <ul className="list-disc list-inside space-y-2">
              <li>Minimalism and simplicity in every element</li>
              <li>Natural materials and sustainable choices</li>
              <li>Function meets aesthetic appeal</li>
              <li>Personal touches that tell your story</li>
            </ul>

            <p>
              Sed blandit libero volutpat sed cras ornare arcu dui. Volutpat
              commodo sed egestas egestas fringilla phasellus faucibus
              scelerisque. Lectus vestibulum mattis ullamcorper velit sed
              ullamcorper morbi tincidunt.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SingleBlog;
