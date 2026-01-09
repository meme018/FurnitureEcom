import React from "react";
import sofapng from "../assets/sofa.png";
import sofa from "../assets/sofa2.png";
import sidetable from "../assets/sidetable.png";
import Newarrival from "../assets/nA.png";
import ProductCard from "../components/ProductCard";
import BlogCard from "../components/BlogCard";
import { Link } from "react-router";
import { useGetBlogsQuery } from "../services/blogApi";
import { useGetProductQuery } from "../services/productApi";

const Home = () => {
  const { data: blogsData, isLoading, isError } = useGetBlogsQuery();
  const blogs = blogsData?.data || [];

  const { data, error } = useGetProductQuery();
  const products = data?.data || [];

  return (
    <>
      <div className="grid grid-cols-2 p-10 min-h-screen gap-40 bg-[#fbebb5] pt-20 place-items-center justify-items-center">
        <div className="flex flex-col gap-8">
          <h1 className="text-7xl font-bold tracking-wide">
            Rocket single <br />
            seater
          </h1>
          <Link
            to="/shop"
            className="text-3xl underline underline-offset-8 tracking-wide"
          >
            Shop now
          </Link>
        </div>
        <img src={sofapng} alt="Sofa" className="w-180 h-auto mt-8" />
      </div>

      <div className="grid grid-cols-2 gap-40 p-40 bg-[#faf4f4]">
        <div className="flex flex-col gap-10">
          <img src={sidetable} alt="sofa" className="w-auto h-85 mb-8" />
          <h2 className="text-4xl ">Side table</h2>
          <Link to="/Shop" className="text-2xl underline underline-offset-8">
            View More
          </Link>
        </div>
        <div className="flex flex-col gap-10 justify-center">
          <img src={sofa} alt="Sofa" className="w-auto h-85 mb-8" />
          <h2 className="text-4xl ">Sofa</h2>
          <Link to="/Shop" className="text-2xl underline underline-offset-8">
            View More
          </Link>
        </div>
      </div>

      <div className="flex flex-col items-center gap-7 py-20 bg-white">
        <p className="text-4xl">Top Picks For You</p>
        <p className="text-center text-lg px-60 text-gray-500">
          Find a bright ideal to suit your taste with our great selection of
          suspension, floor and table lights.
        </p>

        {isError && (
          <div className="flex justify-center items-center h-64">
            <p className="text-xl text-red-600">
              Error loading products:{" "}
              {error?.message || "Please try again later"}
            </p>
          </div>
        )}

        <div className="px-20 py-10 grid grid-cols-4 gap-10">
          {products.slice(0, 4).map((product) => (
            <ProductCard key={product._id} product={product} />
          ))}
        </div>
        <Link to="/Shop" className="text-2xl underline underline-offset-8">
          View More{" "}
        </Link>
      </div>

      <div className="flex flex-row items-center justify-center gap-20 px-3 bg-[#fff9e5]">
        <img src={Newarrival} alt="New Arrivals" className="h-170 w-auto p-3" />
        <div className="flex flex-col gap-6 items-center">
          <p className="text-3xl">New Arrivals</p>
          <h1 className="text-6xl font-bold">Asgaard sofa</h1>
          <button className="w-70 text-black text-2xl px-4 py-4 my-5 outline-1">
            Order now
          </button>
        </div>
      </div>

      {/* blog section */}
      <div className="flex flex-col items-center justify-center py-20">
        <h2 className="text-4xl font-semibold mb-4">Our Blogs</h2>
        <p className="text-center text-lg px-60 text-gray-500 mb-10">
          Find inspiration and tips for your home
        </p>

        {isLoading ? (
          <p className="text-gray-500">Loading blogs...</p>
        ) : isError ? (
          <p className="text-red-500">Error loading blogs</p>
        ) : (
          <div className="grid grid-cols-3 gap-20 px-20">
            {blogs.slice(0, 3).map((blog) => (
              <BlogCard key={blog._id} blog={blog} />
            ))}
          </div>
        )}

        <Link
          to="/blog"
          className="text-2xl underline underline-offset-8 mt-10"
        >
          View All Posts
        </Link>
      </div>

      <div className="flex flex-col items-center justify-center h-70 text-center bg-amber-100/60 backdrop-blur-md px-14 py-10 rounded-2xl my-20 mx-20">
        <h1 className="text-4xl font-bold mb-2">Our Instagram</h1>
        <p className="text-gray-600 mb-6">Follow our store on Instagram</p>

        <button className="inline-block px-8 py-3 bg-white text-black rounded-full font-medium shadow-lg transition-all duration-300 hover:-translate-y-1 hover:shadow-xl">
          Follow Us
        </button>
      </div>
    </>
  );
};

export default Home;
