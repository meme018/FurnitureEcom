import { Link } from "react-router";

const Footer = () => {
  return (
    <footer className="bg-white px-8 md:px-16 py-20">
      {/* Top section */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-16">
        {/* Address */}
        <div className="text-gray-400 text-lg leading-relaxed">
          <p>400 University Drive Suite 200 Coral</p>
          <p>Gables,</p>
          <p>FL 33134 USA</p>
        </div>

        {/* Links */}
        <div>
          <h4 className="text-gray-400 text-xl mb-8">Links</h4>
          <ul className="space-y-8 text-lg font-semibold text-black">
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/shop">Shop</Link>
            </li>
            <li>
              <Link to="/about">About</Link>
            </li>
            <li>
              <Link to="/contact">Contact</Link>
            </li>
          </ul>
        </div>

        {/* Help */}
        <div>
          <h4 className="text-gray-400 text-xl mb-8">Help</h4>
          <ul className="space-y-8 text-lg font-semibold text-black">
            <li>Payment Options</li>
            <li>Returns</li>
            <li>Privacy Policies</li>
          </ul>
        </div>

        {/* Newsletter */}
        <div>
          <h4 className="text-gray-400 text-xl mb-8">Newsletter</h4>
          <div className="flex items-center gap-6">
            <input
              type="email"
              placeholder="Enter Your Email Address"
              className="border-b border-black outline-none pb-2 w-full text-lg placeholder-gray-400"
            />
            <button className="border-b border-black pb-2 text-lg font-semibold uppercase">
              Subscribe
            </button>
          </div>
        </div>
      </div>

      {/* Divider */}
      <div className="border-t mt-20 pt-8">
        <p className="text-lg text-black">
          2022 Meubel House. All rights reverved
        </p>
      </div>
    </footer>
  );
};

export default Footer;
