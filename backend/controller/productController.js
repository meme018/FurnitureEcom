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
    });
    res.status(201).json({
      message: "Product created successfully",
      data: newProduct,
    });
  } catch (error) {
    res.status(500).json({ message: "Server Error", error: error.message });
  }
};
