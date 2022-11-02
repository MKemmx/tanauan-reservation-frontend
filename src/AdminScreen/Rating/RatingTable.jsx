import React, { useEffect, useState } from "react";
// Data Table
import DataTable from "react-data-table-component";

// Pdf and CSV
import { CSVLink } from "react-csv";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";

// API
import api from "../../utils/api";
import axios from "axios";

// Global State
import useLoginState from "../../store/loginState";

// Components
import Loader from "../../components/Loader/Loader";
import ViewRating from "./ViewRating";

const RatingTable = () => {
  // Login State
  const { token } = useLoginState((state) => state);

  // Local State
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [filteredData, setFilteredData] = useState([]);
  const [search, setSearch] = useState("");

  // View Rating
  const [ratingData, setRatingData] = useState(null);
  const closeRating = () => {
    setRatingData(null);
  };

  const columns = [
    {
      name: "Reservation ID",
      selector: (row) => (
        <>
          <p className="text-base">{row.reservationId?._id}</p>
        </>
      ),
      sortable: true,
    },

    {
      name: "Rating Rate",
      selector: (row) => (
        <>
          <p className="text-base capitalize">{row.ratingScore}</p>
        </>
      ),
      sortable: true,
    },
    {
      name: "Rating Message",
      selector: (row) => (
        <>
          <p className="text-base w-80">{row.ratingMessage}</p>
        </>
      ),
      sortable: true,
    },
    {
      name: "Actions",
      cell: (row) => {
        return (
          <>
            <div
              className={`flex flex-col items-center space-y-1 py-2 xl:space-y-0 space-x-2 xl:flex-row`}
            >
              <button
                onClick={() => {
                  setRatingData(row);
                }}
                className={`flex items-center bg-blue-600 hover:bg-blue-700 text-white py-1.5 px-2 font-medium duration-200 ease-in-out capitalize rounded-lg`}
              >
                View
              </button>
            </div>
          </>
        );
      },
    },
  ];

  const config = {
    headers: {
      "Content-Type": "application/json",
      "auth-token": token,
    },
  };
  const fetchRatings = async () => {
    try {
      setLoading(true);
      const { data } = await axios.get(`${api}/rating`, config);

      setData(data.ratings);
      setLoading(false);
    } catch (error) {
      console.log(error.response.data.msg);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRatings();
  }, []);

  useEffect(() => {
    const result = data.filter((item) => {
      if (
        item.ratingScore.toString().match(search.toLowerCase()) ||
        item.ratingMessage.toLowerCase().match(search.toLowerCase())
      ) {
        return item;
      }
    });
    setFilteredData(result);
  }, [search]);

  // CSV HEADERS
  const headers = [
    { label: "Rating Rate", key: "ratingScore" },
    { label: "Rating Message", key: "ratingMessage" },
  ];

  // Export PDF
  const download_pdf = () => {
    let doc = new jsPDF("l");

    let toPrintArray = filteredData.length >= 1 ? filteredData : data;

    let head = [["Rating Rate", "Rating Message"]];
    let body = toPrintArray.map((item) => {
      return [item.ratingScore, item.ratingMessage];
    });
    doc.autoTable({ head: head, body: body });
    doc.save("ratings.pdf");
  };

  return (
    <>
      {ratingData !== null && (
        <ViewRating ratingData={ratingData} closeRating={closeRating} />
      )}

      <div className="py-4 mt-5 mx-6 rounded-sm shadow-md bg-white">
        <DataTable
          title="Ratings"
          columns={columns}
          data={filteredData.length <= 0 ? data : filteredData}
          progressPending={loading}
          progressComponent={
            <div className="w-full flex items-center justify-center py-24">
              <Loader />
            </div>
          }
          pagination
          subHeader
          subHeaderComponent={
            <div className="w-full flex flex-col md:flex-row justify-between items-center">
              <div>
                {data?.length >= 1 && (
                  <div className="space-x-2 pb-2">
                    <button
                      onClick={download_pdf}
                      className="bg-[#114B7B] text-white px-2 py-1 rounded-md cursor-pointer"
                    >
                      Export PDF
                    </button>
                    <CSVLink
                      className="bg-[#114B7B] text-white px-2 py-1 rounded-md cursor-pointer"
                      filename={"equipment.csv"}
                      data={filteredData.length >= 1 ? filteredData : data}
                      headers={headers}
                    >
                      Export CSV
                    </CSVLink>
                  </div>
                )}
              </div>

              <input
                onChange={(e) => {
                  setSearch(e.target.value);
                }}
                value={search}
                type="text"
                placeholder="Search here"
                id="large-input"
                className="block outline-none max-w-xs px-2 py-1.5 w-full text-gray-900 bg-gray-50 rounded-lg border border-gray-300 sm:text-md"
              />
            </div>
          }
        />
      </div>
    </>
  );
};

export default RatingTable;
