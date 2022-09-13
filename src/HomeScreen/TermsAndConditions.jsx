import React from "react";

// React Router DOM
import { useNavigate } from "react-router-dom";

// Tanauan Log
import Tanauanlogo from "../images/tanauanlogo.jpg";
import BetterAndBrighter from "../images/betterandbrighter.jpg";

const TermsAndConditions = () => {
  const navigate = useNavigate();

  return (
    <div className="h-auto py-12 w-full flex justify-center items-center bannerImageHead terms-and-conditions">
      <div className="mx-5 lg:container h-auto rounded-2xl pb-10 bg-white">
        <div className="flex justify-between items-center mt-5 mb-10 py-2 shadow-md px-5">
          <img
            className="w-16 h-16 sm:w-20 sm:h-20 object-contain rounded-full"
            src={Tanauanlogo}
            alt="logo"
          />
          <img
            className="w-16 h-16 sm:w-20 sm:h-20 object-contain"
            src={BetterAndBrighter}
            alt="logo"
          />
        </div>

        <div className="px-8 md:px-14">
          <div className="mb-8">
            <h1 className="font-bold text-center text-2xl md:text-3xl">
              Online Services Terms of Use and Privacy Statement
            </h1>
          </div>

          <div className="border-b border-gray-300 py-2 mb-2">
            <h1 className="text-lg md:text-2xl font-bold mb-2">
              Terms and Conditions:
            </h1>
            <p className=" text-sm md:text-base">
              Lorem ipsum dolor, sit amet consectetur adipisicing elit. Vero
              inventore facere ad, possimus itaque voluptates hic autem
              officiis, iste, maxime delectus placeat explicabo dolores odit
              asperiores iure! Labore maxime cupiditate assumenda dolor repellat
              vel, explicabo reiciendis fugit, dignissimos at praesentium eum
              mollitia. Magnam cum fuga illum veritatis vitae molestiae quidem.
            </p>
          </div>

          <div className="border-b border-gray-300 py-2 mb-2">
            <div>
              <h1 className="text-lg md:text-2xl font-bold mb-2">
                Interpretation and Definitions:
              </h1>
              <p className="text-lg md:text-lg font-bold pb-1">
                Interpretation:
              </p>
              <p className=" text-sm md:text-base">
                The words of which the initial letter is capitalized have
                meanings defined under the following conditions. The following
                definitions shall have the same meaning regardless of whether
                they appear in singular or in plural.
              </p>
            </div>

            {/* <h1 className="text-lg md:text-2xl font-bold mb-2"> */}
            <div>
              <div className="border-b border-gray-300 py-2 mb-2">
                <h1 className="text-lg md:text-lg font-bold pb-1">
                  Definitions:
                </h1>
                <p> For the purposes of these Terms of Use: </p>
              </div>

              <ul className="space-y-2 mt-2 px-6">
                <li className="list-disc text-sm md:text-base">
                  <span className="font-bold text-base"> Device </span> means
                  any device that can access the Service such as a computer, a
                  cellphone or a digital tablet.
                </li>
                <li className="list-disc text-sm md:text-base">
                  <span className="font-bold text-base"> Service </span> refers
                  to the Website and Online Services.
                </li>
                <li className="list-disc text-sm md:text-base">
                  <span className="font-bold text-base"> Terms of Use </span>
                  (also referred as "Terms") mean these Terms of Use that form
                  the entire agreement between You and the University regarding
                  the use of the Service. This Terms and Conditions agreement
                </li>
                <li className="list-disc text-sm md:text-base">
                  <span className="font-bold text-base">
                    Third-party Social Media Service{" "}
                  </span>
                  means any services or content (including data, information,
                  products or services) provided by a third-party that may be
                  displayed, included or made available by the Service.
                </li>

                <li className="list-disc text-sm md:text-base">
                  <span className="font-bold text-base">You </span>
                  means the individual accessing or using the Service, or the
                  company, or other legal entity on behalf of which such
                  individual is accessing or using the Service, as applicable.
                </li>
              </ul>
            </div>
          </div>

          <div className="border-b border-gray-300 py-2 mb-2">
            <div>
              <h1 className="text-lg md:text-2xl font-bold mb-2">
                Acknowledgement:
              </h1>
            </div>
            <div className="space-y-2.5 text-sm md:text-base">
              <p>
                These are the Terms and Conditions governing the use of this
                Service and the agreement that operates between You and the
                University. These Terms and Conditions set out the rights and
                obligations of all users regarding the use of the Service.
              </p>

              <p>
                Your access to and use of the Service is conditioned on Your
                acceptance of and compliance with these Terms and Conditions.
                These Terms and Conditions apply to all visitors, users and
                others who access or use the Service.
              </p>

              <p>
                By accessing or using EVSU website and online services, you
                certify that you have read and reviewed this Agreement and that
                you agree to comply with its terms. If you do not want to be
                bound by the terms of this Agreement, You may not access the
                Service. EVSU only grants use and access to this website, its
                products, and its services to those who have accepted its terms.
              </p>

              <p>
                The University reserves the right to update the Terms at any
                time without notice and this can be viewed by clicking on the
                "Terms of Use" hypertext link located at the bottom of our Web
                pages and log-in page of our online applications or services.
              </p>

              <p>
                Additional terms or requirements may be required by the
                different online services of EVSU, and those additional terms
                become part of your agreement with the University if you use
                those online services.
              </p>
            </div>
          </div>

          <div className="border-b border-gray-300 py-2 mb-2">
            <div>
              <h1 className="text-lg md:text-2xl font-bold md:mb-2">
                Contact:
              </h1>
            </div>
            <p className="text-sm md:text-base">
              Us If you have any questions about these Terms and Conditions, You
              can contact us: <br /> By email: tanauangym@gmail.com
            </p>
          </div>

          <div className="mt-2 flex justify-between">
            <p className="text-sm text-gray-700">
              <span
                onClick={() => {
                  navigate(-1);
                }}
                className="hover:text-[#0A3E69] cursor-pointer"
              >
                Go Back
              </span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TermsAndConditions;
