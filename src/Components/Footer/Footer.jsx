import React from "react";
import { Facebook, Twitter, Linkedin, Instagram } from "lucide-react";
import { LiaUniversitySolid } from "react-icons/lia";
const Footer = () => {
  return (
    <footer className="bg-gray-900 text-gray-300 py-12">
      <div className="max-w-6xl mx-auto px-6 grid md:grid-cols-3 gap-10">
        <div>
          <div className="flex items-center gap-2 mb-4">
            <LiaUniversitySolid className="text-5xl" />
            <h2 className="text-2xl font-bold text-white">StudyMate</h2>
          </div>
          <p className="text-gray-400">
            StudyMate connects learners across the world — helping you find your
            ideal study partner, collaborate, and grow faster together.
          </p>
        </div>

        {/* 🔹 Quick Links */}
        <div className="text-center md:text-left">
          <h3 className="text-xl font-semibold text-white mb-4">Quick Links</h3>
          <ul className="space-y-2">
            <li>
              <a href="/" className="hover:text-blue-400 transition">
                Home
              </a>
            </li>
            <li>
              <a href="/about" className="hover:text-blue-400 transition">
                About
              </a>
            </li>
            <li>
              <a href="/partners" className="hover:text-blue-400 transition">
                Top Partners
              </a>
            </li>
            <li>
              <a href="/contact" className="hover:text-blue-400 transition">
                Contact
              </a>
            </li>
          </ul>
        </div>

        {/* 🔹 Social Links */}
        <div className="text-center md:text-right">
          <h3 className="text-xl font-semibold text-white mb-4">Follow Us</h3>
          <div className="flex justify-center md:justify-end gap-4">
            <a
              href="https://facebook.com"
              target="_blank"
              rel="noreferrer"
              className="hover:text-blue-500 transition transform hover:scale-110"
            >
              <Facebook size={22} />
            </a>
            <a
              href="https://twitter.com"
              target="_blank"
              rel="noreferrer"
              className="hover:text-sky-400 transition transform hover:scale-110"
            >
              <div>
                <img
                  className="w-[40px]"
                  src="https://static.dezeen.com/uploads/2023/07/x-logo-twitter-elon-musk_dezeen_2364_col_0-1.jpg"
                  alt=""
                />
              </div>
            </a>
            <a
              href="https://linkedin.com"
              target="_blank"
              rel="noreferrer"
              className="hover:text-blue-600 transition transform hover:scale-110"
            >
              <Linkedin size={22} />
            </a>
            <a
              href="https://instagram.com"
              target="_blank"
              rel="noreferrer"
              className="hover:text-pink-500 transition transform hover:scale-110"
            >
              <Instagram size={22} />
            </a>
          </div>
        </div>
      </div>

      {/* 🔹 Bottom Bar */}
      <div className="border-t border-gray-700 mt-10 pt-6 text-center text-sm text-gray-500">
        © {new Date().getFullYear()}{" "}
        <span className="text-white font-semibold"> StudyMate</span> . All rights
        reserved.
      </div>
    </footer>
  );
};

export default Footer;
