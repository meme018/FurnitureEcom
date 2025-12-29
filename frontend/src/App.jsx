import { Route, Routes } from "react-router";
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
import AddProduct from "./Admin/AddProduct";
import CreateBlog from "./Admin/CreateBlog";
import Dashboard from "./Admin/Dashboard";

function App() {
  return (
    <>
      <Navbar />
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
      <Footer />
    </>
  );
}

export default App;
