import React from "react";
import Box from "@mui/material/Box";
import Tab from "@mui/material/Tab";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";
import LogoutOutlinedIcon from "@mui/icons-material/LogoutOutlined";
import AddProduct from "./AddProduct";
import CreateBlog from "./CreateBlog";
import ProductListing from "./ProductListing";
import BlogListing from "./BlogListing";
import { useNavigate } from "react-router";

const Dashboard = () => {
  const [value, setValue] = React.useState("1");
  const navigate = useNavigate();

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const handleLogout = () => {
    // Clear all auth data
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    localStorage.removeItem("userRole");

    navigate("/");
  };

  return (
    <div className="flex flex-col min-h-screen mt-10">
      <div className="flex justify-between items-center px-10 mb-5">
        <p className="text-3xl font-bold">Admin Dashboard</p>

        <button
          onClick={handleLogout}
          className="flex items-center gap-2 px-6 py-2 border border-black rounded-md hover:bg-black hover:text-white transition"
        >
          <LogoutOutlinedIcon />
          <span>Logout</span>
        </button>
      </div>

      <Box sx={{ width: "100%", typography: "body1" }}>
        <TabContext value={value}>
          <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
            <TabList
              onChange={handleChange}
              aria-label="lab API tabs example"
              centered
            >
              <Tab label="Add Product" value="1" />
              <Tab label="Create Blog" value="2" />
              <Tab label="Product Listing" value="3" />
              <Tab label="Blog Listing" value="4" />
            </TabList>
          </Box>
          <TabPanel value="1">
            <AddProduct />
          </TabPanel>
          <TabPanel value="2">
            <CreateBlog />
          </TabPanel>
          <TabPanel value="3">
            <ProductListing />
          </TabPanel>
          <TabPanel value="4">
            <BlogListing />
          </TabPanel>
        </TabContext>
      </Box>
    </div>
  );
};

export default Dashboard;
