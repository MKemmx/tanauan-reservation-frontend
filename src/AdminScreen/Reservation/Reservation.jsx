import React, { useState, useEffect } from "react";

import Select from "react-select";

// Data Table
import DataTable from "react-data-table-component";
import moment from "moment";

// Pdf and CSV
import { CSVLink } from "react-csv";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";

// Api and Axios
import api from "../../utils/api";
import axios from "axios";

// Component
import Loader from "../../components/Loader/Loader";

// Print
import PrintLetter from "./PrintLetter/PrintLetter";

// View Modal
import ViewModal from "./ViewModal";

// State
import useLoginState from "../../store/loginState";

const Reservation = () => {
  const [data, setData] = useState([]);

  // State
  const { token } = useLoginState((state) => state);

  const [search, setSearch] = useState("");
  const [filteredData, setFilteredData] = useState([]);
  const [loading, setLoading] = useState(false);

  // Show View Modal and modal data
  const [showModal, setShowModal] = useState(false);
  const [reserver, setReserver] = useState(false);

  //
  const options = [
    { value: "pending", label: "Pending" },
    { value: "reserved", label: "Reserved" },
    { value: "rejected", label: "Rejected" },
    { value: "cancelled", label: "Cancelled" },
    { value: "all", label: "All" },
  ];
  const [selectedStatus, setSelectedStatus] = useState(options[0]);

  // Omit Date Approved if pending
  const [hiddentApproved, setHiddenApproved] = useState(false);

  useEffect(() => {
    if (selectedStatus.value === "pending") {
      return setHiddenApproved(true);
    }
    setHiddenApproved(false);
  }, [selectedStatus]);

  // Data Columns
  const columns = [
    {
      name: "Reservation ID",
      selector: (row) => <div>{row._id}</div>,
      sortable: true,
    },
    {
      name: "Reserver",
      selector: (row) => (
        <div className="capitalize">
          {row?.userId?.firstName} {row?.userId?.lastName}
        </div>
      ),
      sortable: true,
    },
    {
      name: "Title",
      selector: (row) => row?.title,
      sortable: true,
    },
    {
      name: "Start Date",
      selector: (row) => row.start,
      sortable: true,
    },
    {
      name: "End Date",
      selector: (row) => row.end,
      sortable: true,
    },
    {
      name: "Status",
      selector: (row) => (
        <>
          {row.status.toLowerCase() === "pending" && (
            <a className="px-3 py-2 capitalize rounded-3xl flex items-center justify-center font-medium bg-orange-600 text-white">
              {row.status}
            </a>
          )}
          {row.status.toLowerCase() === "rejected" && (
            <a className="px-3 py-2 capitalize rounded-3xl flex items-center justify-center font-medium bg-red-600 text-white">
              {row.status}
            </a>
          )}
          {row.status.toLowerCase() === "canceled" && (
            <a className="px-3 py-2 capitalize rounded-3xl flex items-center justify-center font-medium bg-red-600 text-white">
              {row.status}
            </a>
          )}
          {row.status.toLowerCase() === "reserved" && (
            <a className="px-3 py-2 capitalize rounded-3xl flex items-center justify-center font-medium bg-green-600 text-white">
              {row.status}
            </a>
          )}
        </>
      ),
      sortable: true,
    },
    {
      name: "Date Approved",
      selector: (row) => row?.dateApproved,
      omit: hiddentApproved,
      sortable: true,
    },
    {
      name: "Action",
      cell: (row) => {
        return (
          <>
            <div
              className={`flex flex-col  items-center space-y-1 py-2 xl:space-y-0 space-x-2 xl:flex-row`}
            >
              <button
                onClick={() => {
                  setReserver(row);
                  setShowModal(true);
                }}
                className={`bg-blue-500 hover:bg-blue-700 text-white py-1.5 px-2 font-medium duration-200 ease-in-out rounded-lg`}
              >
                View
              </button>

              {row.status === "reserved" && <PrintLetter data={row} />}
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

  // Fetch Reservations
  const fetchReservations = async () => {
    try {
      setLoading(true);
      const { data } = await axios.get(
        `${api}/reservation?status=${selectedStatus.value}`,
        config
      );

      let mainData = data.reservation.map((reser) => {
        return {
          ...reser,
          start: moment(reser.start).format("lll"),
          end: moment(reser.end).format("lll"),
          dateApproved: reser?.dateApproved
            ? moment(reser.dateApproved).format("lll")
            : "",
        };
      });

      setData(mainData);
      setLoading(false);
    } catch (error) {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchReservations();
  }, []);

  useEffect(() => {
    const result = data.filter((item) => {
      if (
        item._id.toLowerCase().match(search.toLowerCase()) ||
        item.title.toLowerCase().match(search.toLowerCase()) ||
        item.userId.firstName.toLowerCase().match(search.toLowerCase()) ||
        item.userId.lastName.toLowerCase().match(search.toLowerCase()) ||
        item.start.toLowerCase().match(search.toLowerCase()) ||
        item.end.toLowerCase().match(search.toLowerCase()) ||
        item.status.toLowerCase().match(search.toLowerCase())
      ) {
        return item;
      }
    });
    setFilteredData(result);
  }, [search]);

  // Call Each Time Query Change`
  useEffect(() => {
    fetchReservations();
  }, [selectedStatus]);

  // CSV HEADERS
  const headers = [
    { label: "First Name", key: "userId.firstName" },
    { label: "Last Name", key: "userId.lastName" },
    { label: "Start Date", key: "start" },
    { label: "End Date", key: "end" },
    { label: "Status", key: "status" },
    { label: "Date Approved", key: "dateApproved" },
  ];

  // Export PDF
  const download_pdf = () => {
    let toPrintArray = filteredData.length >= 1 ? filteredData : data;

    let doc = new jsPDF("l");
    let head = [
      [
        "First Name",
        "Last Name",
        "Title",
        "Start Date",
        "End Date",
        "Reservation Status",
        "Date Approved",
      ],
    ];
    let body = toPrintArray.map((item) => {
      return [
        item.userId.firstName,
        item.userId.lastName,
        item.title,
        item.start,
        item.end,
        item.status,
        item.dateApproved,
      ];
    });
    doc.autoTable({ head: head, body: body });
    doc.save("reservations.pdf");
  };

  return (
    <div>
      {showModal && (
        <ViewModal
          reserver={reserver}
          setShowModal={setShowModal}
          fetchReservations={fetchReservations}
        />
      )}

      <div className="py-4 mt-5 mx-6 rounded-sm shadow-md bg-white">
        <DataTable
          title="Reservations"
          columns={columns}
          data={search === "" ? data : filteredData}
          progressPending={loading}
          progressComponent={
            <div className="w-full flex items-center justify-center py-24">
              <Loader />
            </div>
          }
          pagination
          subHeader
          subHeaderComponent={
            <div className="w-full">
              <div
                className={`w-full flex flex-col md:flex-row justify-between items-center`}
              >
                {data?.length >= 1 ? (
                  <div className="">
                    <div className="space-x-2">
                      <button
                        onClick={download_pdf}
                        className="bg-[#114B7B] text-white px-2 py-1 rounded-md cursor-pointer"
                      >
                        Export PDF
                      </button>
                      <CSVLink
                        className="bg-[#114B7B] text-white px-2 py-1 rounded-md cursor-pointer"
                        filename={"reservers.csv"}
                        data={filteredData.length >= 1 ? filteredData : data}
                        headers={headers}
                      >
                        Export CSV
                      </CSVLink>
                    </div>
                  </div>
                ) : (
                  <div></div>
                )}

                <div className="w-96 py-2 flex items-end justify-end flex-col">
                  <input
                    onChange={(e) => {
                      setSearch(e.target.value);
                    }}
                    value={search}
                    type="text"
                    placeholder="Search here"
                    className="w-full block outline-none max-w-xs px-2 py-1.5 text-gray-900 bg-gray-50 rounded-lg border border-gray-300 sm:text-md"
                  />
                </div>
              </div>

              <div className="w-full flex items-center justify-end mt-1">
                <div className="w-36">
                  <Select
                    onChange={(data) => {
                      setSelectedStatus(data);
                    }}
                    value={selectedStatus}
                    placeholder="Select Status.."
                    options={options}
                  />{" "}
                </div>
              </div>
            </div>
          }
        />
      </div>
    </div>
  );
};

export default Reservation;
