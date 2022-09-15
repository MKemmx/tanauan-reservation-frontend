import React, { useState, useEffect } from "react";

// Data Table
import DataTable from "react-data-table-component";
import moment from "moment";

// Api and Axios
import api from "../../utils/api";
import axios from "axios";

// Compoenent Helper
import Loader from "../../components/Loader/Loader";
// Global State
import useLoginState from "../../store/loginState";

const LogsTable = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  // Login State
  const { token } = useLoginState((state) => state);

  const config = {
    headers: {
      "Content-Type": "application/json",
      "auth-token": token,
    },
  };

  // Data Columns
  const columns = [
    {
      name: "Log Details",
      selector: (row) => row.logDetails,
      sortable: true,
    },
    {
      name: "Date",
      selector: (row) => <>{moment(row.createdAt).format("LLL")}</>,
      sortable: true,
    },
  ];

  // Fetch Reservations
  const fetchLogs = async () => {
    try {
      setLoading(true);
      const { data } = await axios.get(`${api}/adminLog`, config);
      setData(data.adminLogs);
      setLoading(false);
    } catch (error) {
      console.log(error.response.data.msg);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchLogs();
  }, []);

  return (
    <>
      <div className="py-4 mt-5 mx-6 rounded-sm shadow-md bg-white">
        <DataTable
          title="System Logs"
          columns={columns}
          data={data}
          pagination
          progressPending={loading}
          progressComponent={
            <div className="w-full flex items-center justify-center py-24">
              <Loader />
            </div>
          }
          subHeader
          subHeaderComponent={
            <div className="w-full flex justify-end items-center">
              <input
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

export default LogsTable;
