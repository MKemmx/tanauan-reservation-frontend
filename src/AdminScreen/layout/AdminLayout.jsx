import React, { useEffect } from "react";

// React Router DOM
import { useNavigate } from "react-router-dom";

// Components
import Sidebar from "./Sidebar";
import Content from "./Content";

// Global States
import useLoginState from "../../store/loginState";

const AdminLayout = ({ children }) => {
  const navigate = useNavigate();
  const { isAuthenticated } = useLoginState((state) => state);

  useEffect(() => {
    if (!isAuthenticated) {
      return navigate("/");
    }
  }, [isAuthenticated]);

  return (
    <div className="flex">
      <Sidebar />
      <Content children={children} />
    </div>
  );
};

export default AdminLayout;
