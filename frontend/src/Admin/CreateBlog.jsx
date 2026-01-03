import React, { useState } from "react";
import AddIcon from "@mui/icons-material/Add";
import { usePostBlogMutation } from "../services/blogApi";
import { useNavigate } from "react-router";

const CreateBlog = () => {
  const navigate = useNavigate();
  const [postBlog, { isLoading }] = usePostBlogMutation();

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    image: "",
    author: "Admin",
    category: "Handmade",
  });

  const [errors, setErrors] = useState({});

  const categories = ["Crafts", "Design", "Handmade", "Interior", "Wood"];

  const validateForm = () => {
    const newErrors = {};

    if (!formData.title.trim()) {
      newErrors.title = "Title is required";
    }

    if (!formData.description.trim()) {
      newErrors.description = "Description is required";
    }

    if (!formData.image.trim()) {
      newErrors.image = "Image URL is required";
    } else if (!isValidUrl(formData.image)) {
      newErrors.image = "Please enter a valid URL";
    }

    if (!formData.author.trim()) {
      newErrors.author = "Author name is required";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const isValidUrl = (string) => {
    try {
      new URL(string);
      return true;
    } catch (err) {
      console.error(err);
      return false;
    }
  };

  const handleSubmit = async () => {
    if (!validateForm()) {
      return;
    }

    try {
      const blogData = {
        ...formData,
        date: new Date().toISOString(),
      };

      await postBlog(blogData).unwrap();

      alert("Blog post created successfully!");

      // Reset form
      setFormData({
        title: "",
        description: "",
        image: "",
        author: "Admin",
        category: "Handmade",
      });
      setErrors({});

      // Navigate to blog listing
      navigate("/Dashboard");
    } catch (error) {
      console.error("Failed to create blog:", error);
      alert("Failed to create blog post. Please try again.");
    }
  };

  const handleChange = (field, value) => {
    setFormData({ ...formData, [field]: value });
    // Clear error for this field when user starts typing
    if (errors[field]) {
      setErrors({ ...errors, [field]: "" });
    }
  };

  return (
    <div className="min-h-screen">
      <div className="max-w-4xl mx-auto px-8 py-12">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Create New Blog Post
          </h1>
          <p className="text-gray-600">Add a new post to your blog</p>
        </div>

        {/* Form */}
        <div className="bg-white rounded-lg shadow-md p-8">
          <div className="grid gap-6">
            {/* Title */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Title *
              </label>
              <input
                type="text"
                value={formData.title}
                onChange={(e) => handleChange("title", e.target.value)}
                className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-400 ${
                  errors.title ? "border-red-500" : "border-gray-300"
                }`}
                placeholder="Enter post title"
              />
              {errors.title && (
                <p className="text-red-500 text-sm mt-1">{errors.title}</p>
              )}
            </div>

            {/* Description */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Description *
              </label>
              <textarea
                value={formData.description}
                onChange={(e) => handleChange("description", e.target.value)}
                className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-400 ${
                  errors.description ? "border-red-500" : "border-gray-300"
                }`}
                placeholder="Enter post description"
                rows="5"
              />
              {errors.description && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.description}
                </p>
              )}
            </div>

            {/* Image URL */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Image URL *
              </label>
              <input
                type="url"
                value={formData.image}
                onChange={(e) => handleChange("image", e.target.value)}
                className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-400 ${
                  errors.image ? "border-red-500" : "border-gray-300"
                }`}
                placeholder="https://example.com/image.jpg"
              />
              {errors.image && (
                <p className="text-red-500 text-sm mt-1">{errors.image}</p>
              )}
              {formData.image && isValidUrl(formData.image) && (
                <div className="mt-4">
                  <img
                    src={formData.image}
                    alt="Preview"
                    className="w-full h-48 object-cover rounded-lg"
                    onError={(e) => {
                      e.target.style.display = "none";
                    }}
                  />
                </div>
              )}
            </div>

            {/* Author & Category */}
            <div className="grid grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Author *
                </label>
                <input
                  type="text"
                  value={formData.author}
                  onChange={(e) => handleChange("author", e.target.value)}
                  className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-400 ${
                    errors.author ? "border-red-500" : "border-gray-300"
                  }`}
                  placeholder="Author name"
                />
                {errors.author && (
                  <p className="text-red-500 text-sm mt-1">{errors.author}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Category *
                </label>
                <select
                  value={formData.category}
                  onChange={(e) => handleChange("category", e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-400"
                >
                  {categories.map((cat) => (
                    <option key={cat} value={cat}>
                      {cat}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Submit Button */}
            <div className="pt-4">
              <button
                onClick={handleSubmit}
                disabled={isLoading}
                className={`w-full flex items-center justify-center gap-2 px-6 py-3 rounded-lg transition-colors font-medium ${
                  isLoading
                    ? "bg-gray-400 cursor-not-allowed"
                    : "bg-amber-500 hover:bg-amber-600 text-white"
                }`}
              >
                <AddIcon />
                {isLoading ? "Publishing..." : "Publish Post"}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateBlog;
