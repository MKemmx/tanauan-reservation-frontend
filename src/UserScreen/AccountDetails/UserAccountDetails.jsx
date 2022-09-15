import React from "react";

// React Router DOM
import { useNavigate } from "react-router-dom";

// Logos
import tanauanLogo from "../../images/tanauanlogo.jpg";
import tanauanSlogan from "../../images/betterandbrighter.jpg";

// login Staet
import useLoginState from "../../store/loginState";

const UserAccountDetails = () => {
  //? Login State
  const { user } = useLoginState((state) => state);

  // Navigate
  const navigate = useNavigate();

  return (
    <div>
      <div className="flex flex-col justify-between md:flex-row md:space-x-2 container mx-auto">
        <div className="h-fit mx-auto mb-8 md:mb-0 w-80 overflow-hidden">
          <div className="mb-1 pt-2 bg-white shadow-lg rounded-lg">
            <img
              className="object-contain mb-3 w-full h-60 py-2"
              src={`${user?.profile.url}`}
              alt="avatar"
            />
            <div className="bg-green-600 text-center capitalize py-3 text-white rounded-lg w-full">
              {user?.isVerified ? "Account verified" : "Account unverified"}
            </div>
          </div>

          <button
            onClick={() => {
              navigate("/change-password");
            }}
            className="bg-[#0A3E69] hover:bg-sky-800 w-full text-white text-center mt-3 py-3"
          >
            Change Password
          </button>
        </div>

        <div className="bg-white w-full rounded-md">
          <div className="flex justify-between py-3 px-5 shadow-md">
            <img
              className="h-16 rounded-full object-contain"
              src={tanauanLogo}
              alt=""
            />
            <img className="h-16 object-contain" src={tanauanSlogan} alt="" />
          </div>

          <div className="mt-5 px-5 flex items-center justify-between">
            {/* Account Informations */}
            <div className="space-y-3 w-full">
              <h1>
                First Name:
                <span className="font-medium"> {user?.firstName} </span>
              </h1>
              <h1>
                Last Name:
                <span className="font-medium"> {user?.lastName} </span>
              </h1>
              <h1>
                Gender:
                <span className="font-medium capitalize"> {user?.gender} </span>
              </h1>
              <h1>
                Email:
                <span className="font-medium"> {user?.email} </span>
              </h1>
              <h1>
                Phone Number:
                <span className="font-medium"> {user?.phoneNumber} </span>
              </h1>
              <h1>
                Barangay:
                <span className="font-medium"> {user?.barangay} </span>
              </h1>
            </div>
            {/* Account IDS */}
            <div className="flex flex-col w-full items-center ">
              <div>
                <h1 className="font-medium text-lg"> Uploaded ID Details </h1>
              </div>
              <div className="flex flex-col md:flex-row items-center py-5 md:py-0">
                <div>
                  <img
                    className="w-60 md:h-60 rounded-lg object-contain"
                    src={user?.frontID?.url}
                    alt="front-id-image"
                  />
                </div>

                <div>
                  <img
                    className="w-60 md:h-60 rounded-lg object-contain"
                    src={user?.backID?.url}
                    alt="back-id-image"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserAccountDetails;
