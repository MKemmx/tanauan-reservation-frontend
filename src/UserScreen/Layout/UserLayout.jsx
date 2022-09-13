import React from "react";

// Imports
import Sidebar from "./Sidebar";
import Content from "./Content";

const UserLayout = ({ children }) => {
  return (
    <div className="flex">
      <Sidebar />
      <Content children={children} />
    </div>
  );
};

export default UserLayout;
