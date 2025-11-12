import React, { useState } from "react";
import useAuth from "../Hooks/useAuth";
import { useNavigate, Link } from "react-router-dom";
import toast from "react-hot-toast";

const ForgetPassword = () => {
  const { resetPassword } = useAuth(); 
  const [email, setEmail] = useState("");
  const navigate = useNavigate();

  const handleReset = (e) => {
    e.preventDefault();

    if (!email) {
      toast.error("Please enter your email address!");
      return;
    }

    resetPassword(email)
      .then(() => {
        toast.success("Password reset email sent! Check your inbox.");
        navigate("/login");
      })
      .catch((err) => {
        toast.error(`Error: ${err.message}`);
        console.error(err);
      });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-100 via-white to-slate-100 flex items-center justify-center p-4">
      <div className="w-full max-w-md bg-white/90 backdrop-blur-xl rounded-2xl shadow-2xl border border-indigo-200 p-8">
        <h1 className="text-3xl font-extrabold text-center text-indigo-700 mb-3">
          Forgot Password?
        </h1>
        <p className="text-center text-gray-500 mb-6">
          Enter your email to receive password reset instructions
        </p>

        <form onSubmit={handleReset} className="space-y-4">
          <div>
            <label className="label text-gray-600 font-semibold">Email</label>
            <input
              type="email"
              placeholder="Enter your email"
              className="input input-bordered w-full focus:ring-2 focus:ring-indigo-400"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <button className="btn w-full bg-indigo-600 hover:bg-indigo-700 text-white font-semibold transition-all duration-300 rounded-xl">
            Send Reset Link
          </button>
        </form>

        <div className="text-center mt-6 text-gray-600">
          Remembered your password?{" "}
          <Link
            to="/login"
            className="link text-indigo-600 font-semibold hover:underline"
          >
            Go back to Login
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ForgetPassword;
