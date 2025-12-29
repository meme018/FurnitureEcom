require("dotenv").config();
const express = require("express");
const cors = require("cors");
const connectDatabase = require("./database");

const { createProducts } = requirt("./controller/productController");
const app = express();

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

app.listen(process.env.PORT, () => {
  console.log(`server started on port ${process.env.PORT}`);
});
