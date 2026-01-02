import { Route, Routes, useLocation } from "react-router";
import Home from "./pages/Home";
import Navbar from "./components/navbar";
import Shop from "./pages/Shop";
import Registration from "./pages/Registration";
import SingleProduct from "./pages/SingleProduct";
import Footer from "./components/Footer";
import Blog from "./pages/Blog";
import Contact from "./pages/Contact";
import Cart from "./pages/Cart";
import CheckOut from "./pages/CheckOut";
import Dashboard from "./Admin/Dashboard";

// Create a component to handle footer visibility
const FooterHandler = () => {
  const location = useLocation();
  const noFooterPaths = ["/Dashboard"];

  return (
    !noFooterPaths.some((path) => location.pathname.startsWith(path)) && (
      <Footer />
    )
  );
};

const NavbarHandler = () => {
  const location = useLocation();
  const noNavbarPaths = ["/Dashboard"];

  return (
    !noNavbarPaths.some((path) => location.pathname.startsWith(path)) && (
      <Navbar />
    )
  );
};

function App() {
  return (
    <>
      <NavbarHandler />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/shop" element={<Shop />} />
        <Route path="/registration" element={<Registration />} />
        <Route path="/product" element={<SingleProduct />} />
        <Route path="/blog" element={<Blog />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/checkout" element={<CheckOut />} />
        <Route path="/singleProduct" element={<SingleProduct />} />

        {/* Admin Routes */}
        <Route path="/dashboard" element={<Dashboard />} />
      </Routes>
      <FooterHandler />
    </>
  );
}

export default App;
