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
import SingleBlog from "./pages/SingleBlog";
import EditProduct from "./Admin/EditProduct";
import EditBlog from "./Admin/EditBlog";
import ProtectedRoute from "./components/ProtectedRoute";

// Create a component to handle footer visibility
const FooterHandler = () => {
  const location = useLocation();
  const noFooterPaths = ["/dashboard", "/editProduct", "/editBlog"];

  const shouldHideFooter = noFooterPaths.some((path) =>
    location.pathname.toLowerCase().startsWith(path)
  );

  return !shouldHideFooter && <Footer />;
};

const NavbarHandler = () => {
  const location = useLocation();
  const noNavbarPaths = ["/dashboard", "/editProduct", "/editBlog"];

  const shouldHideNavbar = noNavbarPaths.some((path) =>
    location.pathname.toLowerCase().startsWith(path)
  );

  return !shouldHideNavbar && <Navbar />;
};

function App() {
  return (
    <>
      <NavbarHandler />
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<Home />} />
        <Route path="/shop" element={<Shop />} />
        <Route path="/registration" element={<Registration />} />
        <Route path="/product" element={<SingleProduct />} />
        <Route path="/blog" element={<Blog />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/singleProduct/:id" element={<SingleProduct />} />
        <Route path="/singleBlog/:id" element={<SingleBlog />} />

        {/* Customer Protected Routes */}
        <Route
          path="/cart"
          element={
            <ProtectedRoute requiredRole="customer">
              <Cart />
            </ProtectedRoute>
          }
        />
        <Route
          path="/checkout"
          element={
            <ProtectedRoute requiredRole="customer">
              <CheckOut />
            </ProtectedRoute>
          }
        />

        {/* Admin Protected Routes */}
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute requiredRole="admin">
              <Dashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/editProduct/:id"
          element={
            <ProtectedRoute requiredRole="admin">
              <EditProduct />
            </ProtectedRoute>
          }
        />
        <Route
          path="/editBlog/:id"
          element={
            <ProtectedRoute requiredRole="admin">
              <EditBlog />
            </ProtectedRoute>
          }
        />
      </Routes>
      <FooterHandler />
    </>
  );
}

export default App;
