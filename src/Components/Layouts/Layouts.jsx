import React from "react";
import Navbar from "../Navbar/Navbar";
import { Outlet } from "react-router-dom";
import Footer from "../Footer/Footer";
import { Toaster } from "react-hot-toast";

const Layouts = () => {
  return (
    <div className="w-11/12 mx-auto">
      <Toaster position="top-center" reverseOrder={false} />
      <Navbar></Navbar>
      <Outlet></Outlet>
      <Footer></Footer>
      <Toaster />
    </div>
  );
};

export default Layouts;
