import ArrowForwardIosOutlinedIcon from "@mui/icons-material/ArrowForwardIosOutlined";
import FacebookIcon from "@mui/icons-material/Facebook";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import StarIcon from "@mui/icons-material/Star";
import TwitterIcon from "@mui/icons-material/Twitter";
import sidetable from "../assets/sidetable.png";
import { Link } from "react-router";
import ProductCard from "../components/ProductCard";

const SingleProduct = () => {
  return (
    <div className="flex flex-col min-h-screen  mt-30">
      <div className="flex flex-row gap-5 px-15">
        <Link to="/" className="text-lg text-gray-500">
          Home
        </Link>{" "}
        <ArrowForwardIosOutlinedIcon />{" "}
        <Link to="/shop" className="text-lg text-gray-500">
          Shop
        </Link>{" "}
        <ArrowForwardIosOutlinedIcon />
        <span className="text-lg font-bold">|</span>
        <span className="text-lg font-bold">Product Name</span>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 px-15 py-10">
        {/* Images */}
        <div className="flex gap-6">
          {/* Thumbnails */}
          <div className="flex flex-col gap-4">
            {[1, 2, 3, 4].map((_, i) => (
              <div
                key={i}
                className="w-20 h-20 bg-[#FFF6E5] flex items-center justify-center rounded-lg"
              >
                <img
                  src="https://via.placeholder.com/80"
                  alt="thumb"
                  className="object-contain"
                />
              </div>
            ))}
          </div>

          {/* Main Image */}
          <div className="flex-1 bg-[#FFF6E5] rounded-xl flex items-center justify-center">
            <img
              src="https://via.placeholder.com/400"
              alt="Asgaard Sofa"
              className="object-contain"
            />
          </div>
        </div>

        {/* Product Info */}
        <div>
          <h1 className="text-3xl font-semibold mb-2">Asgaard sofa</h1>
          <p className="text-xl text-gray-500 mb-4">Rs. 250,000.00</p>

          {/* Rating */}
          <div className="flex items-center gap-3 mb-4">
            <div className="flex text-yellow-400">
              <StarIcon />
            </div>
            <span className="text-sm text-gray-500">| 5 Customer Review</span>
          </div>

          <p className="text-gray-600 mb-6">
            Setting the bar as one of the loudest speakers in its class, the
            Kilburn is a compact, stout-hearted hero with a well-balanced audio
            which boasts a clear midrange and extended highs.
          </p>

          {/* Size */}
          <div className="mb-6">
            <p className="font-medium mb-2">Size</p>
            <div className="flex gap-3">
              {["L", "XL", "XS"].map((size) => (
                <button
                  key={size}
                  className="border px-4 py-2 rounded-md text-sm hover:border-black"
                >
                  {size}
                </button>
              ))}
            </div>
          </div>

          {/* Color */}
          <div className="mb-6">
            <p className="font-medium mb-2">Color</p>
            <div className="flex gap-3">
              <span className="w-8 h-8 rounded-full bg-purple-500 cursor-pointer" />
              <span className="w-8 h-8 rounded-full bg-black cursor-pointer" />
              <span className="w-8 h-8 rounded-full bg-yellow-600 cursor-pointer" />
            </div>
          </div>

          {/* Quantity & Cart */}
          <div className="flex items-center gap-6 mb-8">
            <div className="flex items-center border rounded-md">
              <button className="px-4 py-2">−</button>
              <span className="px-4">0</span>
              <button className="px-4 py-2">+</button>
            </div>

            <button className="border px-10 py-3 rounded-md hover:bg-black hover:text-white transition">
              Add To Cart
            </button>
          </div>

          <hr className="mb-6" />

          {/* Meta Info */}
          <div className="text-sm text-gray-500 space-y-2">
            <p>SKU : SS001</p>
            <p>Category : Sofas</p>
            <p>Tags : Sofa, Chair, Home, Shop</p>
            <div className="flex items-center gap-4">
              <span>Share :</span>
              <FacebookIcon />
              <LinkedInIcon />
              <TwitterIcon />
            </div>
          </div>
        </div>
      </div>

      <hr className="mb-6" />

      <div className="w-auto mt-10 flex flex-col px-15 items-center">
        <div className="flex gap-10  mb-6 text-2xl">
          <button className="font-medium">Description</button>
          <button className="text-gray-400">Additional Information</button>
          <button className="text-gray-400">Reviews [5]</button>
        </div>

        <p className="text-gray-400 text-xl max-w-7xl">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Rem
          asperiores ratione sed repudiandae aspernatur unde cumque dolorem
          eaque ipsam. Quidem vero dolorem quae dolorum laudantium et aliquid
          voluptate. Porro eum molestiae, ipsa labore placeat officia in
          perspiciatis harum officiis voluptates. Maxime nam veritatis
          exercitationem consequuntur amet porro laborum aspernatur ab, corrupti
          repellat distinctio. Enim debitis ex eligendi voluptate illo ea est
          quas alias delectus voluptates dolorem, repellat id, cum minima
          doloremque corporis rem repellendus odio iusto provident aspernatur
          suscipit facere et possimus? Fugit dolor minima itaque, maiores
          suscipit quasi optio odit totam nam excepturi explicabo reiciendis,
          harum facilis necessitatibus commodi?
        </p>
      </div>

      <div className="grid grid-cols-2 justify-center items-center px-15 py-10 mb-10 gap-10">
        <img
          src={sidetable}
          alt="Banner"
          className="w-full h-auto object-cover"
        />
        <img
          src={sidetable}
          alt="Banner"
          className="w-full h-auto object-cover"
        />
      </div>

      <hr className="mb-6" />

      <div className="flex flex-col items-center py-10 gap-10">
        <p className="text-3xl font-bold">Related Product</p>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mt-6 px-15">
          <ProductCard />
          <ProductCard />
          <ProductCard />
          <ProductCard />
        </div>

        <button className="border-b-2 px-10 py-3  text-lg font-bold hover:bg-black hover:text-white transition mt-10 mx-auto block">
          View More
        </button>
      </div>
    </div>
  );
};

export default SingleProduct;
