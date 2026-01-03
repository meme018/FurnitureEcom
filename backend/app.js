require("dotenv").config();
const express = require("express");
const cors = require("cors");
const connectDatabase = require("./database");
const {
  createProducts,
  getAllProducts,
  getProductById,
  deleteProductById,
  updateProductById,
} = require("./controller/productController");
const app = express();
const { createUser, loginUser } = require("./controller/userController");
const {
  createBlog,
  getAllBlogs,
  getBlogById,
  updateBlogById,
  deleteBlogById,
} = require("./controller/blogController");

const corsOptions = {
  origin: "http://localhost:3000",
  methods: ["GET", "POST", "PUT", "DELETE", "PATCH"],
  allowedHeaders: ["Content-Type", "Authorization"],
  credentials: true,
  optionsSuccessStatus: 200,
};

app.use(cors());
app.use(express.json());

connectDatabase();

//product routes
app.post("/api/products", createProducts);
app.get("/api/products", getAllProducts);
app.get("/api/products/:id", getProductById);
app.put("/api/products/:id", updateProductById);
app.delete("/api/products/:id", deleteProductById);

// user routes
app.post("/api/users", createUser);
app.post("/api/users/login", loginUser);

// blog routes
app.post("/api/blogs", createBlog);
app.get("/api/blogs", getAllBlogs);
app.get("/api/blogs/:id", getBlogById);
app.put("/api/blogs/:id", updateBlogById);
app.delete("/api/blogs/:id", deleteBlogById);

app.listen(process.env.PORT, () => {
  console.log(`server started on port ${process.env.PORT}`);
  console.log("JWT_SECRET exists:", !!process.env.JWT_SECRET);
  console.log("JWT_SECRET length:", process.env.JWT_SECRET?.length);
});
