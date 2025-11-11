import React, { useState } from "react";
import axios from "axios";
import useAuth from "../Hooks/useAuth";
import toast from "react-hot-toast";

const CreatePartner = () => {
  const { user } = useAuth();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    profileimage: "",
    subject: "",
    studyMode: "",
    availability: "",
    location: "",
    experience: "",
    rating: "",
    connections: 0,
  });

  // 🔹 Handle Input Change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // 🔹 Handle Submit
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!user?.email) {
      toast.error("You must be logged in to create a profile!");
      return;
    }

    setLoading(true);
    const newProfile = {
      ...formData,
      email: user.email,
    };

    try {
      const res = await axios.post("http://localhost:3000/user", newProfile);
      if (res.data.insertedId) {
        toast.success("Profile created successfully!");
        setFormData({
          name: "",
          profileimage: "",
          subject: "",
          studyMode: "",
          availability: "",
          location: "",
          experience: "",
          rating: "",
          patnerCount: 0,
        });
      }
    } catch (err) {
      console.error(err);
      toast.error("Something went wrong while creating profile!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex justify-center items-center py-10 px-4">
      <div className="bg-white shadow-lg rounded-2xl p-8 w-full max-w-2xl">
        <h2 className="text-3xl font-bold text-center mb-6 text-gray-800">
          Create Partner Profile
        </h2>

        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Name */}
          <div>
            <label className="block font-semibold mb-1 text-gray-700">
              Full Name
            </label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              className="w-full border border-gray-300 px-3 py-2 rounded-lg focus:outline-blue-500"
            />
          </div>

          {/* Profile Image */}
          <div>
            <label className="block font-semibold mb-1 text-gray-700">
              Profile Image URL
            </label>
            <input
              type="text"
              name="profileimage"
              value={formData.profileimage}
              onChange={handleChange}
              placeholder="https://example.com/photo.jpg"
              className="w-full border border-gray-300 px-3 py-2 rounded-lg focus:outline-blue-500"
            />
          </div>

          {/* Subject */}
          <div>
            <label className="block font-semibold mb-1 text-gray-700">
              Subject
            </label>
            <input
              type="text"
              name="subject"
              value={formData.subject}
              onChange={handleChange}
              placeholder="e.g. English, Math, Programming"
              className="w-full border border-gray-300 px-3 py-2 rounded-lg focus:outline-blue-500"
            />
          </div>

          {/* Study Mode */}
          <div>
            <label className="block font-semibold mb-1 text-gray-700">
              Study Mode
            </label>
            <select
              name="studyMode"
              value={formData.studyMode}
              onChange={handleChange}
              className="w-full border border-gray-300 px-3 py-2 rounded-lg focus:outline-blue-500"
            >
              <option value="">Select...</option>
              <option value="Online">Online</option>
              <option value="Offline">Offline</option>
            </select>
          </div>

          {/* Availability */}
          <div>
            <label className="block font-semibold mb-1 text-gray-700">
              Availability Time
            </label>
            <input
              type="text"
              name="availability"
              value={formData.availability}
              onChange={handleChange}
              placeholder="e.g. Evening 6–9 PM"
              className="w-full border border-gray-300 px-3 py-2 rounded-lg focus:outline-blue-500"
            />
          </div>

          {/* Location */}
          <div>
            <label className="block font-semibold mb-1 text-gray-700">
              Location
            </label>
            <input
              type="text"
              name="location"
              value={formData.location}
              onChange={handleChange}
              placeholder="e.g. Dhaka, Banani"
              className="w-full border border-gray-300 px-3 py-2 rounded-lg focus:outline-blue-500"
            />
          </div>

          {/* Experience Level */}
          <div>
            <label className="block font-semibold mb-1 text-gray-700">
              Experience Level
            </label>
            <select
              name="experience"
              value={formData.experience}
              onChange={handleChange}
              className="w-full border border-gray-300 px-3 py-2 rounded-lg focus:outline-blue-500"
            >
              <option value="">Select...</option>
              <option value="Beginner">Beginner</option>
              <option value="Intermediate">Intermediate</option>
              <option value="Expert">Expert</option>
            </select>
          </div>

          {/* Rating */}
          <div>
            <label className="block font-semibold mb-1 text-gray-700">
              Rating
            </label>
            <input
              type="number"
              name="rating"
              value={formData.rating}
              onChange={handleChange}
              placeholder="e.g. 4.5"
              min="0"
              max="5"
              step="0.1"
              className="w-full border border-gray-300 px-3 py-2 rounded-lg focus:outline-blue-500"
            />
          </div>

          {/* Email */}
          <div>
            <label className="block font-semibold mb-1 text-gray-700">
              Email 
            </label>
            <input
              type="email"
              value={user?.email || ""}
              readOnly
              className="w-full border border-gray-300 bg-gray-100 px-3 py-2 rounded-lg cursor-not-allowed"
            />
          </div>

          {/* Submit */}
          <div className="pt-3 text-center">
            <button
              type="submit"
              disabled={loading}
              className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg font-semibold transition"
            >
              {loading ? "Creating..." : "Create Profile"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreatePartner;
