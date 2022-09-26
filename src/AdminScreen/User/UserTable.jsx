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

const UserTable = () => {
  // Login State
  const { token } = useLoginState((state) => state);

  // Modal
  const [showViewModal, setShowModal] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);

  const columns = [
    // {
    //   name: "User Id",
    //   selector: (row) => <div className="w-12"> {row._id}</div>,
    //   sortable: true,
    // },
    {
      name: "First Name",
      selector: (row) => row.firstName,
      sortable: true,
    },
    {
      name: "Last Name",
      selector: (row) => row.lastName,
      sortable: true,
    },
    {
      name: "Gender",
      selector: (row) => (
        <>
          <h2 className="capitalize">{row.gender}</h2>
        </>
      ),
      sortable: true,
    },
    {
      name: "Barangay",
      selector: (row) => (
        <>
          <h2 className="capitalize">{row.barangay}</h2>
        </>
      ),
      sortable: true,
    },
    {
      name: "Phone Number",
      selector: (row) => row.phoneNumber,
      sortable: true,
    },
    {
      name: "Email Address",
      selector: (row) => row.email,
      sortable: true,
    },
    {
      name: "Organization Type",
      selector: (row) => (
        <>
          <p className="capitalize">{row.organizationType}</p>
        </>
      ),
      sortable: true,
    },
    {
      name: "Emaill Verified",
      selector: (row) => {
        return (
          <>
            {row.isVerified ? (
              <a className="px-3 py-2 capitalize rounded-3xl flex items-center justify-center font-medium bg-green-600 text-white">
                True
              </a>
            ) : (
              <a className="px-3 py-2 capitalize rounded-3xl flex items-center justify-center font-medium bg-red-600 text-white">
                False
              </a>
            )}
          </>
        );
      },
      sortable: true,
    },
    {
      name: "Status",
      selector: (row) => {
        return (
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

            {row.status.toLowerCase() === "active" && (
              <a className="px-3 py-2 capitalize rounded-3xl flex items-center border font-medium bg-green-600 text-white">
                {row.status}
              </a>
            )}
          </>
        );
      },
      sortable: true,
    },
    // {
    //   name: "Registered Date",
    //   selector: (row) => row.createdAt,
    //   sortable: true,
    // },
    {
      name: "Action",
      cell: (row) => {
        return (
          <>
            <div
              className={`flex flex-col items-center space-y-1 py-2 xl:space-y-0 space-x-2 xl:flex-row`}
            >
              <button
                onClick={() => {
                  setSelectedUser(row);
                  setShowModal(true);
                }}
                className={`bg-blue-500 hover:bg-blue-700 text-white py-1.5 px-2 font-medium duration-200 ease-in-out capitalize rounded-lg`}
              >
                View
              </button>
            </div>
          </>
        );
      },
    },
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
      const { data } = await axios.get(`${api}/user/`, config);
      const mainData = data.users.map((user) => {
        return {
          ...user,
          createdAt: moment(user.createdAt).format("l"),
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
        item.firstName.toLowerCase().match(search.toLowerCase()) ||
        item.lastName.toLowerCase().match(search.toLowerCase()) ||
        item.gender.toLowerCase().match(search.toLowerCase()) ||
        item.barangay.toLowerCase().match(search.toLowerCase()) ||
        item.phoneNumber.match(search) ||
        item.email.toLowerCase().match(search.toLowerCase()) ||
        item.organizationType.toLowerCase().match(search.toLowerCase()) ||
        item.isVerified.toString().toLowerCase().match(search.toLowerCase()) ||
        item.status.toLowerCase().match(search.toLowerCase())
        // item.createdAt.toLowerCase().match(search.toLowerCase())
      ) {
        return item;
      }
    });
    setFilteredData(result);
  }, [search]);

  // CSV HEADERS
  const headers = [
    { label: "First Name", key: "firstName" },
    { label: "Last Name", key: "lastName" },
    { label: "Gender", key: "gender" },
    { label: "Barangay", key: "barangay" },
    { label: "Phone Number", key: "phoneNumber" },
    { label: "Email Address", key: "email" },
    { label: "Email Verified", key: "isVerified" },
    { label: "Status", key: "status" },
  ];

  // Export PDF
  const download_pdf = () => {
    let doc = new jsPDF("l");
    let head = [
      [
        "First Name",
        "Last Name",
        "Gender",
        "Barangay",
        "Phone Number",
        "Email Address",
        "Email Verified",
        "Account Status",
      ],
    ];
    let body = data.map((user) => {
      return [
        user.firstName,
        user.lastName,
        user.gender,
        user.barangay,
        user.phoneNumber,
        user.email,
        user.isVerified,
        user.status,
      ];
    });
    doc.autoTable({ head: head, body: body });
    doc.save("users.pdf");
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
          title="Users"
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
                    filename={"users.csv"}
                    data={data}
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

export default UserTable;
