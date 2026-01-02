const Product = require("../model/productModel.js");

// Create a new product
exports.createProducts = async (req, res) => {
  try {
    const {
      name,
      price,
      description,
      category,
      sku,
      tags,
      images,
      sizes,
      colors,
      stock, // ADD THIS
    } = req.body;

    const newProduct = await Product.create({
      name,
      price,
      description,
      category,
      sku,
      tags,
      images,
      sizes,
      colors,
      stock, // ADD THIS
    });

    res.status(201).json({
      message: "Product created successfully",
      data: newProduct,
    });
  } catch (error) {
    res.status(500).json({ message: "Server Error", error: error.message });
  }
};

// get all products
exports.getAllProducts = async (req, res) => {
  try {
    const products = await Product.find();
    res.status(200).json({
      message: "Products retrieved successfully",
      data: products,
    });
  } catch (error) {
    res.status(500).json({ message: "Server Error", error: error.message });
  }
};

// get product by id
exports.getProductById = async (req, res) => {
  try {
    const { id } = req.params;
    const product = await Product.findById(id);

    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }
    res.status(200).json({
      message: "Product retrieved successfully",
      data: product,
    });
  } catch (error) {
    res.status(500).json({ message: "Server Error", error: error.message });
  }
};
