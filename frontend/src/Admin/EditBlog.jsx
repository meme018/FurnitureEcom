import React, { useState, useEffect } from "react";
import AddIcon from "@mui/icons-material/Add";
import { Link, useNavigate, useParams } from "react-router";
import {
  useGetBlogByIdQuery,
  useUpdateBlogMutation,
} from "../services/blogApi";

const EditBlog = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const {
    data: blogData,
    isLoading: isFetching,
    isError: fetchError,
  } = useGetBlogByIdQuery(id);
  const [updateBlog, { isLoading: isUpdating }] = useUpdateBlogMutation();

  const blog = blogData?.data;

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    image: "",
    author: "",
    category: "Handmade",
  });

  const [errors, setErrors] = useState({});

  // Update form data when blog data is loaded
  useEffect(() => {
    if (blog) {
      setFormData({
        title: blog.title || "",
        description: blog.description || "",
        image: blog.image || "",
        author: blog.author || "",
        category: blog.category || "Handmade",
      });
    }
  }, [blog]);

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
      return false;
    }
  };

  const handleSubmit = async () => {
    if (!validateForm()) {
      return;
    }

    try {
      await updateBlog({
        id,
        ...formData,
        date: new Date().toISOString(),
      }).unwrap();

      alert("Blog post updated successfully!");
      navigate("/dashboard");
    } catch (error) {
      console.error("Failed to update blog:", error);
      alert("Failed to update blog post. Please try again.");
    }
  };

  const handleChange = (field, value) => {
    setFormData({ ...formData, [field]: value });
    if (errors[field]) {
      setErrors({ ...errors, [field]: "" });
    }
  };

  if (isFetching) {
    return (
      <div className="min-h-screen bg-gray-50 pt-20 flex items-center justify-center">
        <p className="text-gray-500 text-xl">Loading blog...</p>
      </div>
    );
  }

  if (fetchError || !blogData?.data) {
    return (
      <div className="min-h-screen bg-gray-50 pt-20 flex items-center justify-center">
        <div className="text-center">
          <p className="text-red-500 text-xl mb-4">Error loading blog</p>
          <Link to="/dashboard" className="text-amber-600 underline">
            Return to dashboard
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 pt-20">
      <div className="max-w-4xl mx-auto px-8 py-12">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Edit Blog Post
          </h1>
          <p className="text-gray-600">Update your existing blog post</p>
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
                rows="5"
                className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-400 ${
                  errors.description ? "border-red-500" : "border-gray-300"
                }`}
                placeholder="Enter post description"
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

            {/* Action Buttons */}
            <div className="pt-4 flex gap-4">
              <button
                onClick={handleSubmit}
                disabled={isUpdating}
                className={`flex-1 flex items-center justify-center gap-2 px-6 py-3 rounded-lg transition-colors font-medium ${
                  isUpdating
                    ? "bg-gray-400 cursor-not-allowed"
                    : "bg-amber-500 hover:bg-amber-600 text-white"
                }`}
              >
                <AddIcon />
                {isUpdating ? "Updating..." : "Update Post"}
              </button>

              <Link to="/dashboard" className="flex-1">
                <button className="w-full border border-gray-300 px-6 py-3 rounded-lg hover:bg-gray-50 transition-colors">
                  Cancel
                </button>
              </Link>
            </div>
          </div>
        </div>

        {/* Info Message */}
        <div className="mt-6 bg-blue-50 border border-blue-200 rounded-lg p-4">
          <p className="text-blue-800 font-medium">
            You are editing:{" "}
            <span className="font-bold">{blogData.data.title}</span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default EditBlog;
