import React, { useState, useEffect } from "react";

import DataTable from "react-data-table-component";

import moment from "moment";
// API and Axios
import api from "../../utils/api";
import axios from "axios";

// React Icons
import { BsFillTrashFill } from "react-icons/bs";
import {
  AiOutlineEye,
  AiOutlineFileExcel,
  AiOutlineFilePdf,
} from "react-icons/ai";

// Component
import Loader from "../../components/Loader/Loader";

// Pdf and CSV
import { CSVLink } from "react-csv";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";

const SystemLogs = () => {
  const columns = [
    {
      name: "Activity Log",
      selector: (row) => row.logDetail,
      sortable: true,
    },
    {
      name: "Date",
      selector: (row) => row.createdAt,
      sortable: true,
    },
  ];

  // Fetch Logs
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState([]);

  const fetchLogs = async () => {
    try {
      setLoading(true);
      const { data } = await axios.get(`${api}/log`);
      let mainData = data?.allLogs.map((item) => {
        return {
          ...item,
          logDetail: item?.logDetail,
          createdAt: moment(item.createdAt).format("LLLL"),
        };
      });
      setData(mainData);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      console.log(error.response.data.msg);
    }
  };

  // Search Data
  const [searchData, setSearchData] = useState([]);
  const [search, setSearch] = useState("");

  const handleSearch = (e) => {
    let searchItem = e.target.value.toLowerCase().trim();
    setSearch(searchItem);
    let filtered = data?.filter((log) => {
      if (
        log?.logDetail?.toLowerCase().includes(searchItem) ||
        log?.createdAt?.toLowerCase().includes(searchItem)
      ) {
        return log;
      }
    });
    setSearchData(filtered);
  };

  useEffect(() => {
    fetchLogs();
  }, []);

  // CSV HEADERS
  const headers = [
    { label: "Activity Log", key: "logDetail" },
    { label: "Time", key: "createdAt" },
  ];

  const generatePdf = () => {
    // Export PDF
    let head = [["Activity Log", "Time"]];

    let body = data.map((item) => {
      return [item.logDetail, item.createdAt];
    });

    let body2 = searchData?.map((item) => {
      return [item.logDetail, item.createdAt];
    });

    var doc = new jsPDF("l");
    doc.autoTable({
      head: head,
      body: searchData.length > 0 ? body2 : body,
    });
    doc.save(`SPES_System_Monitoring_Log.pdf`);
  };

  return (
    <div className="py-4 mt-5 mx-6 rounded-sm shadow-md bg-white">
      <DataTable
        title="Logs"
        data={search === "" ? data : searchData}
        columns={columns}
        pagination
        subHeader
        progressPending={loading}
        progressComponent={
          <div className="w-full flex items-center justify-center py-24">
            <Loader />
          </div>
        }
        subHeaderComponent={
          <div className="w-full flex flex-col lg:flex-row justify-between lg:items-center">
            <div class="space-x-3 flex mb-2">
              <button
                onClick={generatePdf}
                className="bg-sky-900 text-white flex items-center rounded-md space-x-4 px-2 py-1.5 hover:bg-sky-800"
              >
                <AiOutlineFilePdf className="mr-1" size={18} />
                Generate PDF
              </button>
              <CSVLink
                filename={"SPES_System_Monitoring_Log.csv"}
                data={searchData.length > 0 ? searchData : data}
                headers={headers}
                className="bg-sky-900 text-white flex items-center rounded-md space-x-4 px-2 py-1.5 hover:bg-sky-800"
              >
                <AiOutlineFileExcel className="mr-1" size={18} />
                Generate Excel
              </CSVLink>
            </div>

            <input
              onChange={handleSearch}
              type="text"
              placeholder="Search Here.."
              className="block max-w-xs px-2 py-1.5 w-full text-gray-900 bg-gray-50 rounded-lg border border-gray-300 sm:text-md outline-none"
            />
          </div>
        }
      />
    </div>
  );
};

export default SystemLogs;
