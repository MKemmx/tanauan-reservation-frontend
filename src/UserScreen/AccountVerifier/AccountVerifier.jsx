import React, { useState, useEffect } from "react";

// React Router DOM
import { useParams, useNavigate } from "react-router-dom";

// API AND AXIOS
import axios from "axios";
import api from "../../utils/api";

// Loader
import Loader from "../../components/Loader/Loader";

const AccountVerified = () => {
  const navigate = useNavigate();
  const credentials = useParams();

  // Account Verifier
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState("");

  const accountVerifier = async () => {
    try {
      setLoading(true);
      await axios.put(`${api}/user/account-verifier`, credentials);
      setStatus("success");
      setLoading(false);
    } catch (error) {
      setStatus("failed");
      setLoading(false);
    }
  };

  useEffect(() => {
    accountVerifier();
  }, []);

  return (
    <div className="w-full absolute top-0 left-0 bg-red-100 h-screen bannerImageHead px-10">
      {loading ? (
        <div className="flex h-80 items-center justify-center mt-50">
          <Loader />
        </div>
      ) : (
        <>
          {status === "success" ? (
            <>
              <div className="max-w-xl px-5 bg-green-500 text-white mx-auto mt-20 py-20 text-center rounded-lg">
                <h1 className="text-3xl"> Acount is now verified </h1>
                <button
                  onClick={() => {
                    navigate("/");
                  }}
                  className="text-md mt-10 cursor-pointer bg-green-600 px-3 py-2.5 rounded-md hover:bg-green-700"
                >
                  Click to login
                </button>
              </div>
            </>
          ) : status === "failed" ? (
            <>
              <div className="max-w-xl px-5 bg-red-500 text-white mx-auto mt-20 py-20 text-center rounded-lg">
                <h1 className="text-3xl">
                  Link confirmation does not match any of the registered user!
                </h1>
              </div>
            </>
          ) : (
            <></>
          )}
        </>
      )}
    </div>
  );
};

export default AccountVerified;
