import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import useAuth from "../Hooks/useAuth";
import { motion } from "framer-motion";
import toast from "react-hot-toast";
import { updateProfile } from "firebase/auth";

const Profile = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [newName, setNewName] = useState("");
  const [newPhotoURL, setNewPhotoURL] = useState("");
  const { user, logOut, loading } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await logOut();
    } catch (err) {
      console.error(err);
    }
    navigate("/");
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <span
            className="loading loading-dots text-primary"
            aria-hidden="true"
          ></span>
          <p className="mt-2">Loading profile...</p>
        </div>
      </div>
    );
  }

//   if (!user) {
//     return (
//       <div className="min-h-screen flex items-center justify-center">
//         <div className="text-center">
//           <p className="mb-4">You are not logged in.</p>
//           <Link to="/login" className="btn btn-primary">
//             Login
//           </Link>
//         </div>
//       </div>
//     );
//   }

  const handleUpdateProfile = async () => {
    if (!newName && !newPhotoURL) {
      toast.error("Please provide at least one field to update");
      return;
    }

    try {
      const updates = {};
      if (newName) updates.displayName = newName;
      if (newPhotoURL) updates.photoURL = newPhotoURL;

      // Update the profile
      await updateProfile(user, updates);
      toast.success("Profile updated successfully!");
      setIsEditing(false);
      setNewName("");
      setNewPhotoURL("");
    } catch (error) {
      toast.error("Failed to update profile: " , error.message);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-linear-to-br from-gray-900 via-blue-900 to-indigo-900 p-6">
      <motion.div
        className="max-w-md w-full bg-white/10 backdrop-blur-lg shadow-2xl rounded-2xl p-8 text-center border border-white/20"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        {/* Avatar */}
        <div className="flex flex-col items-center mb-4">
          <div className="avatar mb-4">
            <div className="w-28 rounded-full ring ring-indigo-400 ring-offset-base-100 ring-offset-2 overflow-hidden shadow-lg">
              {user?.photoURL ? (
                <img src={user.photoURL} alt={user.displayName || "User"} />
              ) : (
                <div className="w-28 h-28 bg-indigo-300 flex items-center justify-center text-4xl font-bold text-white">
                  {user?.displayName
                    ? user.displayName.charAt(0).toUpperCase()
                    : "U"}
                </div>
              )}
            </div>
          </div>

          {/* Name & Email */}
          <h2 className="text-2xl font-semibold text-white">
            {user?.displayName || "No name"}
          </h2>
          <p className="text-gray-300 mb-3 text-sm">
            {user?.email || "No email"}
          </p>

          {/* Edit Form */}
          {isEditing ? (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              className="w-full space-y-3 mb-4"
            >
              <input
                type="text"
                placeholder="New Display Name"
                value={newName}
                onChange={(e) => setNewName(e.target.value)}
                className="input input-bordered w-full bg-white/10 text-white placeholder-gray-400"
              />
              <input
                type="text"
                placeholder="New Photo URL"
                value={newPhotoURL}
                onChange={(e) => setNewPhotoURL(e.target.value)}
                className="input input-bordered w-full bg-white/10 text-white placeholder-gray-400"
              />
              <div className="flex gap-2 justify-center">
                <button
                  onClick={handleUpdateProfile}
                  className="btn btn-primary btn-sm"
                >
                  Save Changes
                </button>
                <button
                  onClick={() => {
                    setIsEditing(false);
                    setNewName("");
                    setNewPhotoURL("");
                  }}
                  className="btn btn-ghost btn-sm text-gray-300"
                >
                  Cancel
                </button>
              </div>
            </motion.div>
          ) : (
            <button
              onClick={() => setIsEditing(true)}
              className="btn btn-outline btn-sm border-indigo-400 text-indigo-300 hover:bg-indigo-400 hover:text-white mb-4"
            >
              Edit Profile
            </button>
          )}

          {/* Account Info */}
          <div className="bg-white/10 text-gray-200 text-sm rounded-xl px-4 py-2 mb-4 shadow-inner">
            <p>
              <span className="font-semibold text-indigo-300">
                Account Created:
              </span>{" "}
              {user.metadata?.creationTime || "Not available"}
            </p>
          </div>

          {/* Buttons */}
          <div className="flex gap-4 mt-2">
            <button
              onClick={handleLogout}
              className="btn btn-outline btn-sm border-indigo-400 text-indigo-300 hover:bg-indigo-400 hover:text-white"
            >
              Logout
            </button>
            <Link
              to="/"
              className="btn btn-sm bg-indigo-500 hover:bg-indigo-600 text-white border-none"
            >
              Home
            </Link>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default Profile;
