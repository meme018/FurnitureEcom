import React from "react";
import ArrowForwardIosOutlinedIcon from "@mui/icons-material/ArrowForwardIosOutlined";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import LocalPhoneIcon from "@mui/icons-material/LocalPhone";
import WatchLaterIcon from "@mui/icons-material/WatchLater";
import { Link } from "react-router";

const Contact = () => {
  return (
    <div className="flex flex-col min-h-screen">
      {" "}
      <div
        className="flex flex-col w-auto h-80 mt-25 mx-10 gap-8 bg-[url('https://plus.unsplash.com/premium_photo-1661766077694-6e3750b0fb97?q=80&w=1931&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')]
         bg-center bg-no-repeat bg-cover rounded-3xl mb-10 bg-transparent flex items-center justify-center"
      >
        <p className="text-4xl font-semibold">Contact</p>
        <p>
          <Link to="/" className="text-lg font-bold">
            Home
          </Link>{" "}
          <ArrowForwardIosOutlinedIcon />{" "}
          <span className="text-lg text-gray-500">Contact</span>
        </p>
      </div>
      <div className="flex flex-col items-center gap-5">
        <p className="text-2xl font-semibold">Get In Touch With Us</p>
        <caption className="text-lg text-gray-500">
          For more information about our products & services. Please Feel to
          drop us <br /> an email. Our staff always be there to help you out. Do
          not hesitate!{" "}
        </caption>
      </div>
      <div className="min-h-screen flex items-center justify-center bg-white px-6">
        <div className="max-w-6xl w-full grid grid-cols-1 md:grid-cols-2 gap-16">
          {/* Left Info Section */}
          <div className="space-y-10">
            <div className="flex gap-4">
              <span className="text-2xl">
                <LocationOnIcon />
              </span>
              <div>
                <h3 className="font-semibold text-lg">Address</h3>
                <p className="text-gray-600">
                  236 5th SE Avenue, New <br />
                  York NY10000, United <br />
                  States
                </p>
              </div>
            </div>

            <div className="flex gap-4">
              <span className="text-2xl">
                <LocalPhoneIcon />
              </span>
              <div>
                <h3 className="font-semibold text-lg">Phone</h3>
                <p className="text-gray-600">
                  Mobile: +(84) 546-6789 <br />
                  Hotline: +(84) 456-6789
                </p>
              </div>
            </div>

            <div className="flex gap-4">
              <span className="text-2xl">
                <WatchLaterIcon />
              </span>
              <div>
                <h3 className="font-semibold text-lg">Working Time</h3>
                <p className="text-gray-600">
                  Monday–Friday: 9:00 – 22:00 <br />
                  Saturday–Sunday: 9:00 – 21:00
                </p>
              </div>
            </div>
          </div>

          {/* Right Form Section */}
          <div>
            <form className="space-y-6">
              <div>
                <label className="block text-sm font-semibold mb-2">
                  Your name
                </label>
                <input
                  type="text"
                  placeholder="Abc"
                  className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-black"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold mb-2">
                  Email address
                </label>
                <input
                  type="email"
                  placeholder="Abc@def.com"
                  className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-black"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold mb-2">
                  Subject
                </label>
                <input
                  type="text"
                  placeholder="This is optional"
                  className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-black"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold mb-2">
                  Message
                </label>
                <textarea
                  rows="4"
                  placeholder="Hi! I'd like to ask about"
                  className="w-full border border-gray-300 rounded-lg px-4 py-3 resize-none focus:outline-none focus:ring-2 focus:ring-black"
                />
              </div>

              <button
                type="submit"
                className="border border-black font-semibold px-8 py-3 rounded-full hover:bg-black hover:text-white transition"
              >
                Submit
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
