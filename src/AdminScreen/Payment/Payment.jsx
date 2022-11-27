import React, { useEffect, useState } from "react";
// Data Table
import DataTable from "react-data-table-component";
import moment from "moment";

// Pdf and CSV
import { CSVLink } from "react-csv";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";

// API
import api from "../../utils/api";
import axios from "axios";
// Global State
import useLoginState from "../../store/loginState";

// Alert and Loader
import Loader from "../../components/Loader/Loader";

// Modals
import ViewModal from "./ViewModal";

const Payment = () => {
  // Login State
  const { token } = useLoginState((state) => state);

  // Modal
  const [showViewModal, setShowModal] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);

  const columns = [
    {
      name: "Reservation Date",
      selector: (row) => (
        <div className="py-3 flex items-start justify-center flex-col space-y-1">
          <div className="capitalize">
            <span className="font-medium"> Start Date: </span>
            {row.reservationId?.start}
          </div>
          <div className="capitalize">
            <span className="font-medium"> End Date: </span>
            {row.reservationId?.end}
          </div>
        </div>
      ),
      sortable: true,
    },
    {
      name: "Reservation Title",
      selector: (row) => (
        <>
          <h2 className="capitalize">{row.reservationId?.title}</h2>
        </>
      ),
      sortable: true,
    },
    {
      name: "Full Name",
      selector: (row) => (
        <>
          <h2 className="capitalize">
            {row.reservationId.userId.firstName}{" "}
            {row.reservationId.userId.lastName}
          </h2>
        </>
      ),
      sortable: true,
    },
    {
      name: "Phone Number",
      selector: (row) => (
        <>
          <h2 className="capitalize">{row.reservationId.userId.phoneNumber}</h2>
        </>
      ),
      sortable: true,
    },
    {
      name: "Email Address",
      selector: (row) => (
        <>
          <h2>{row.reservationId.userId.email}</h2>
        </>
      ),
      sortable: true,
    },
    {
      name: "Payment Recipt",
      selector: (row) => {
        return (
          <div
            className="cursor-pointer py-5 px-2"
            onClick={() => {
              window.open(`${row?.paymentReceipt.url}`);
            }}
          >
            <img
              className="object-contain w-24 h-24"
              src={row?.paymentReceipt.url}
              alt=""
            />
          </div>
        );
      },
      sortable: false,
    },
    // {
    //   name: "Action",
    //   cell: (row) => {
    //     return (
    //       <>
    //         <div
    //           className={`flex flex-col items-center space-y-1 py-2 xl:space-y-0 space-x-2 xl:flex-row`}
    //         >
    //           <button
    //             onClick={() => {
    //               setSelectedUser(row);
    //               setShowModal(true);
    //             }}
    //             className={`bg-blue-500 hover:bg-blue-700 text-white py-1.5 px-2 font-medium duration-200 ease-in-out capitalize rounded-lg`}
    //           >
    //             View
    //           </button>
    //         </div>
    //       </>
    //     );
    //   },
    // },
  ];

  // Local State
  const [data, setData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [search, setSearch] = useState("");

  // Loader Component
  const [loading, setLoading] = useState(false);
  const config = {
    headers: {
      "Content-Type": "application/json",
      "auth-token": token,
    },
  };

  const fetchUsers = async () => {
    try {
      setLoading(true);
      const { data } = await axios.get(`${api}/payment`, config);

      const mainData = data?.payments?.map((payment) => {
        return {
          ...payment,
          reservationId: {
            ...payment.reservationId,
            start: moment(payment.reservationId.start).format("llll"),
            end: moment(payment.reservationId.end).format("llll"),
          },
          createdAt: moment(payment.createdAt).format("l"),
        };
      });

      setData(mainData);
      setLoading(false);
    } catch (error) {
      console.log(error.response.data.msg);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  useEffect(() => {
    const result = data.filter((item) => {
      if (
        item.reservationId?.start.toLowerCase().match(search.toLowerCase()) ||
        item.reservationId?.end.toLowerCase().match(search.toLowerCase()) ||
        item.reservationId?.title.toLowerCase().match(search.toLowerCase()) ||
        item.reservationId?.userId?.firstName
          .toLowerCase()
          .match(search.toLowerCase()) ||
        item.reservationId?.userId?.lastName
          .toLowerCase()
          .match(search.toLowerCase()) ||
        item.reservationId?.userId?.phoneNumber
          .toString()
          .match(search.toLowerCase()) ||
        item.reservationId?.userId?.email
          .toLowerCase()
          .match(search.toLowerCase())
      ) {
        return item;
      }
    });
    setFilteredData(result);
  }, [search]);

  // CSV HEADERS
  const headers = [
    { label: "Start Date", key: `reservationId.start` },
    { label: "End Date", key: `reservationId.start` },
    { label: "Title", key: `reservationId.start` },
    { label: "First Name", key: `reservationId.userId.firstName` },
    { label: "Last Name", key: `reservationId.userId.lastName` },
    { label: "Phone Number", key: `reservationId.userId.phoneNumber` },
    { label: "Email", key: `reservationId.userId.email` },
  ];

  // Export PDF
  const download_pdf = () => {
    let doc = new jsPDF("l");
    let toPrintArray = filteredData.length >= 1 ? filteredData : data;

    let head = [
      [
        "Start Date",
        "End Date",
        "Title",
        "First Name",
        "Last Name",
        "Phone Number",
        "Email",
      ],
    ];
    let body = toPrintArray.map((user) => {
      return [
        user.reservationId.start,
        user.reservationId.end,
        user.reservationId.title,
        user.reservationId.userId.firstName,
        user.reservationId.userId.lastName,
        user.reservationId.userId.phoneNumber,
        user.reservationId.userId.email,
      ];
    });
    doc.autoTable({ head: head, body: body });
    doc.save("Payments.pdf");
  };

  return (
    <>
      {showViewModal && (
        <ViewModal
          user={selectedUser}
          setShowModal={setShowModal}
          fetchUsers={fetchUsers}
        />
      )}

      <div
        id="user-table"
        className="py-4 mt-5 mx-6 rounded-sm shadow-md bg-white"
      >
        <DataTable
          title="Reservation Payments"
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
            <div className="w-full flex flex-col md:flex-row justify-between items-center">
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
                    filename={"Payments.csv"}
                    data={filteredData.length >= 1 ? filteredData : data}
                    headers={headers}
                  >
                    Export CSV
                  </CSVLink>
                </div>
              )}

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

export default Payment;
