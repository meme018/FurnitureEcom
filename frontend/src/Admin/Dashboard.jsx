import React from "react";
import Box from "@mui/material/Box";
import Tab from "@mui/material/Tab";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";
import AddProduct from "./AddProduct";
import CreateBlog from "./CreateBlog";

const Dashboard = () => {
  const [value, setValue] = React.useState("1");

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  return (
    <div className="flex flex-col min-h-screen mt-10">
      <p className="text-center text-3xl font-bold p-5">Admin Dashboard</p>
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
            </TabList>
          </Box>
          <TabPanel value="1">
            <AddProduct />
          </TabPanel>
          <TabPanel value="2">
            <CreateBlog />
          </TabPanel>
        </TabContext>
      </Box>
    </div>
  );
};

export default Dashboard;
