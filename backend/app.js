require("dotenv").config();
const express = require("express");
const cors = require("cors");
const connectDatabase = require("./database");

const {
  createProducts,
  getAllProducts,
  getProductById,
} = require("./controller/productController");
const app = express();

const { createUser, loginUser } = require("./controller/userController");

const corsOptions = {
  origin: "http://localhost:3000",
  methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
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

// user routes
app.post("/api/users", createUser);
app.post("/api/users/login", loginUser);

app.listen(process.env.PORT, () => {
  console.log(`server started on port ${process.env.PORT}`);
});
