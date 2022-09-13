import React from "react";

// Components
import Navbar from "../../components/Navbar/Navbar";

const Content = ({ children }) => {
  return (
    <div className="w-full bg-[#E6EAEE] h-screen overflow-x-hidden">
      <Navbar />
      <div className="px-3 py-8">{children}</div>
    </div>
  );
};

export default Content;
