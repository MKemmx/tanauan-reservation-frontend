import React, { useRef } from "react";

// Tanauan Logo
import tanauanSlogan from "../../../images/betterandbrighter.jpg";
import tanauanLogo from "../../../images/tanauanlogo.jpg";

// React to Print
import ReactToPrint from "react-to-print";

// Login State
import useLoginState from "../../../store/loginState";
import moment from "moment";

const PrintLetter = ({ data }) => {
  const { user } = useLoginState((state) => state);

  const componentRef = useRef();
  return (
    <>
      <ReactToPrint
        trigger={() => (
          <button className="p-1 px-1.5 bg-green-600 text-white text-sm rounded-md mr-2">
            Print
          </button>
        )}
        content={() => componentRef.current}
      />

      <div
        style={{
          display: "none",
        }}
      >
        <div className="print-container" ref={componentRef}>
          {/* Letter */}
          <div className="mt-6 px-10">
            {/* Logo */}
            <div className="flex justify-between items-center">
              <img className="w-24" src={tanauanLogo} />
              <img className="w-24" src={tanauanSlogan} />
            </div>

            {/* Title Intro */}
            <div className="text-center font-medium my-4 text-lg">
              <p> Republic of the Philippines </p>
              <p> Province of Leyte </p>
              <p>
                Reservation Form for the Tanauan Civic Center Reservation System
              </p>
            </div>

            {/* Ltter Start */}
            <div className="mt-12">
              {/* Header */}
              <div className="my-2 mb-10 tracking-wider">
                <p>Tanauan Leyte Gymnasium</p>
                <p>Brgy. Canramos Tanauan, Leyte</p>
              </div>
              {/* Body */}
              <div>
                <p className="tracking-wide">
                  Permission to use the venue Respected Sir/Madam, With due
                  respect, my name is
                  <span className="capitalize font-medium">
                    {" "}
                    {user.firstName}
                  </span>
                  <span className="font-medium capitalize">
                    {" "}
                    {user.lastName}{" "}
                  </span>
                  and I am from Barangay{" "}
                  <span className="font-medium"> {user.barangay}</span>. I am
                  writing this letter to request for access of the Tanauan Leyte
                  Gymnasium for for the purpose of my{" "}
                  <span className="font-medium">{data?.title} </span>. The
                  timings for the event is from
                  <span className="font-medium"> {data?.start}</span> to{" "}
                  <span className="font-medium">{data?.end}</span>.
                </p>
              </div>

              {/* Conclusion */}
              <div className="mt-14 tracking-wide">
                <p>
                  Hence, I request the authority to permit Tanauan Leyte GYM
                  Administrator to use the Tanauan GYM for above mentioned date.
                  I promise you that, no harm or damage will be done by any
                  means.
                </p>
              </div>

              {/* Footer */}
              <div className="mt-14 flex justify-between items-center tracking-wide">
                <div className="leading-6">
                  <p>Yours Sincerely/Faithfully, </p>
                  <p>
                    <span className="font-medium capitalize">
                      {" "}
                      {user.firstName}{" "}
                    </span>{" "}
                    <span className="font-medium capitalize">
                      {" "}
                      {user.lastName}{" "}
                    </span>{" "}
                  </p>
                </div>

                <div className="w-22">
                  <p className="overline">
                    Signature of the Assigned Personnel
                  </p>
                </div>
              </div>

              <div className="h-36">
                {data?.equipments?.length > 0 ? (
                  <>
                    {/* Borrowed Items */}
                    <div className="mt-5">
                      <div className="mb-1">
                        <h1 className="font-medium"> Requested Equipments: </h1>
                      </div>
                      <div className="flex space-x-1">
                        {data?.equipments.map((item) => (
                          <div className="flex items-center">
                            <input
                              type="checkbox"
                              defaultValue
                              className="w-4 h-4 text-blue-600 bg-gray-100 rounded border-gray-300 focus:ring-blue-500 focus:ring-2"
                            />
                            <label className="ml-2 text-base font-normal">
                              {item?.name}
                            </label>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Success Fully Returned */}
                    <div className="mt-5">
                      <div className="mb-1">
                        <h1 className="font-medium"> Returned Equipments: </h1>
                      </div>
                      <div className="flex space-x-1">
                        {data?.equipments.map((item) => (
                          <div className="flex items-center">
                            <input
                              type="checkbox"
                              defaultValue
                              className="w-4 h-4 text-blue-600 bg-gray-100 rounded border-gray-300 focus:ring-blue-500 focus:ring-2"
                            />
                            <label className="ml-2 text-base font-normal">
                              {item?.name}
                            </label>
                          </div>
                        ))}
                      </div>
                    </div>
                  </>
                ) : (
                  <></>
                )}
              </div>

              {/* Expiration Date */}
              <div className="mt-20">
                <p> NOT VALID WITHOUT OFFICAL SEAL & SIGNATURE </p>
              </div>

              <div className="mt-3 w-full py-4 flex flex-col items-end justify-center">
                <div>
                  Downloaded By: {user?.firstName} {user?.middleName}
                  {user?.lastName}
                </div>
                <div>{moment().format("LLLL")}</div>
              </div>
            </div>
          </div>

          {/* IDs */}
          <div className="mt-18 pt-8 px-10">
            {/* Logo */}
            <div className="flex justify-between items-center">
              <img className="w-24" src={tanauanLogo} />
              <img className="w-24" src={tanauanSlogan} />
            </div>
            {/* Title Intro */}
            <div className="text-center font-medium my-4 text-lg">
              <p> Republic of the Philippines </p>
              <p> Province of Leyte </p>
              <p>
                Reservation Form for the Tanauan Civic Center Reservation System
              </p>
            </div>

            {/* Id Verifications */}
            <div className="mt-10">
              <div className="mb-10">
                <h1 className="font-normal">
                  IDs used for the verification of the reserver.
                </h1>
              </div>

              <div className="pt-15">
                <div className="mb-8">
                  <h1 className="text-center font-medium"> Front ID: </h1>
                  <img
                    className="w-full h-52 object-contain mt-2"
                    src={`${user?.frontID.url}`}
                    alt=""
                  />
                </div>
                <div>
                  <h1 className="text-center font-medium"> Back ID: </h1>
                  <img
                    className="w-full h-52 object-contain mt-2"
                    src={`${user?.backID.url}`}
                    alt=""
                  />
                </div>
              </div>

              <div className="mt-28 w-full py-4 flex flex-col items-end justify-center">
                <div>
                  Downloaded By: {user?.firstName} {user?.middleName}
                  {user?.lastName}
                </div>
                <div>{moment().format("LLLL")}</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default PrintLetter;
