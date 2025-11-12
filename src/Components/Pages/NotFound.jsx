import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

const NotFound = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-indigo-900 to-slate-800 flex flex-col items-center justify-center text-center px-4">
      
      <motion.h1
        className="text-[8rem] md:text-[10rem] font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-purple-600 drop-shadow-lg"
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.6 }}
      >
        404
      </motion.h1>

  
      <motion.p
        className="text-gray-300 text-lg md:text-xl mt-2 mb-8"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3, duration: 0.6 }}
      >
        Oops! The page you’re looking for doesn’t exist or has been moved.
      </motion.p>

    
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6, duration: 0.6 }}
      >
        <Link
          to="/"
          className="px-6 py-3 bg-indigo-600 text-white rounded-2xl shadow-lg hover:bg-indigo-700 hover:shadow-indigo-500/50 transition-all duration-300"
        >
          ⬅ Back to Home
        </Link>
      </motion.div>

      {/* Floating Elements */}
      <motion.div
        className="absolute top-10 left-10 text-5xl text-indigo-500/30 select-none"
        animate={{ y: [0, 20, 0] }}
        transition={{ repeat: Infinity, duration: 4 }}
      >
        ✨
      </motion.div>
      <motion.div
        className="absolute bottom-16 right-16 text-4xl text-purple-500/30 select-none"
        animate={{ y: [0, -20, 0] }}
        transition={{ repeat: Infinity, duration: 5 }}
      >
        🌙
      </motion.div>
    </div>
  );
};

export default NotFound;
