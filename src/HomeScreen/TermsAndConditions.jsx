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
                GOVERNMENT:
              </h1>
            </div>
            <div className="space-y-2.5 text-sm md:text-base">
              <ul className="pl-8">
                <li className="list-disc">
                  For reservation is at least 48 hrs before the event.
                </li>
                <li className="list-disc">
                  Immediate use and reservation is strictly prohibited.
                </li>
                <li className="list-disc"> No smoking in the facility.</li>
                <li className="list-disc">
                  Shall NOT bear any liability for the loss, theft, or damage to
                  any property belonging to the Applicant or guests before,
                  during, or after the event.
                </li>
                <li className="list-disc">
                  Decorations are permissible with the use of clear/masking
                  tape, provided all evidence of its use is removed and surfaces
                  are not damaged.
                </li>
                <li className="list-disc">
                  Maintain the cleanliness orderliness of the facility
                </li>
                <li className="list-disc">
                  The exits are not to be blocked in any manner at ANY time.
                </li>
                <li className="list-disc">
                  The property shall be return on it original condition prior to
                  its usage.
                </li>
              </ul>
            </div>
          </div>

          <div className="border-b border-gray-300 py-2 mb-2">
            <div>
              <h1 className="text-lg md:text-2xl font-bold mb-2">
                NON-GOVERNMENT:
              </h1>
            </div>
            <div className="space-y-2.5 text-sm md:text-base">
              <ul className="pl-8">
                <li className="list-disc">
                  No payment, no confirmation of reservation
                </li>
                <li className="list-disc">
                  For reservation is atleast 48 HRS or above
                </li>
                <li className="list-disc">
                  24 HRS of payment before the event.
                </li>
                <li className="list-disc">
                  Reservation for 1 day equivalent to 8 hrs and beond is another
                  payment.
                </li>
                <li className="list-disc">
                  Immediate use and reservation is strictly probhibited.
                </li>
                <li className="list-disc">No smooking in the facility.</li>
                <li className="list-disc">
                  Shall NOT bear any liability for the loss, theft, or damage to
                  any property belonging to the Applicant or guests before,
                  during, or after the event.
                </li>
                <li className="list-disc">
                  Decorations are permissible with the use of clear/masking
                  tape, provided all evidence of its use is removed and surfaces
                  are not damaged.
                </li>
                <li className="list-disc">
                  Maintain the cleanliness orderliness of the facility.
                </li>
                <li className="list-disc">
                  The exits are not to be blocked in any manner at ANY time.
                </li>
              </ul>
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
        </div>
      </div>
    </div>
  );
};

export default TermsAndConditions;
