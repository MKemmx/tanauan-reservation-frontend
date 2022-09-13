import React from "react";
import "./LoaderCSS.css";

const Loader = () => {
  return (
    <div>
      <div className="spinner">
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
      </div>
    </div>
  );
};

export default Loader;
