import React, { useEffect, useState } from "react";
// Data Table
import DataTable from "react-data-table-component";

import Swal from "sweetalert2";

// React Icons
import { MdDeleteOutline } from "react-icons/md";
import { BsCheck } from "react-icons/bs";

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
import AddModal from "./AddModal";
import EditModal from "./EditModal";
import Loader from "../../components/Loader/Loader";

const EquipmentTable = () => {
  // Login State
  const { token } = useLoginState((state) => state);

  // Modal
  const [editModalData, setEditModalData] = useState(null);
  const [showAddModal, setShowAddModal] = useState(false);

  // Local State
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [filteredData, setFilteredData] = useState([]);
  const [search, setSearch] = useState("");

  const closeAddModal = () => {
    setShowAddModal(false);
  };

  const closeEditModal = () => {
    setEditModalData(null);
  };

  const columns = [
    {
      name: "Name",
      selector: (row) => (
        <>
          <p className="text-base capitalize">{row.name}</p>
        </>
      ),
      sortable: true,
    },
    {
      name: "Status",
      selector: (row) => {
        return (
          <>
            {row.status.toLowerCase() === "available" ? (
              <>
                <a className="px-3 py-2 capitalize rounded-3xl flex items-center justify-center font-medium bg-green-600 text-white">
                  {row.status}
                </a>
              </>
            ) : (
              <>
                <a className="px-3 py-2 capitalize rounded-3xl flex items-center justify-center font-medium bg-red-600 text-white">
                  {row.status}
                </a>
              </>
            )}
          </>
        );
      },
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
              {row.status === "available" ? (
                <button
                  onClick={() => {
                    updateEquipmentStatus({
                      id: row._id,
                      status: "not available",
                    });
                  }}
                  className={`flex items-center bg-red-600 hover:bg-red-700 text-white py-1.5 px-2 font-medium duration-200 ease-in-out capitalize rounded-lg`}
                >
                  Deactivate
                  {/* <MdDeleteOutline className="ml-1" size={18} /> */}
                </button>
              ) : (
                <button
                  onClick={() => {
                    updateEquipmentStatus({ id: row._id, status: "available" });
                  }}
                  className={`flex items-center bg-green-600 hover:bg-green-700 text-white py-1.5 px-2 font-medium duration-200 ease-in-out capitalize rounded-lg`}
                >
                  Activate
                  {/* <BsCheck className="ml-1" size={18} /> */}
                </button>
              )}

              <button
                onClick={() => {
                  setEditModalData(row);
                }}
                className={`flex items-center bg-orange-600 hover:bg-orange-700 text-white py-1.5 px-2 font-medium duration-200 ease-in-out capitalize rounded-lg`}
              >
                Edit
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
  const fetchEquipments = async () => {
    try {
      setLoading(true);
      const { data } = await axios.get(`${api}/equipment`, config);
      setData(data.equipments);
      setLoading(false);
    } catch (error) {
      console.log(error.response.data.msg);
      setLoading(false);
    }
  };

  const updateEquipmentStatus = async ({ id, status }) => {
    try {
      await axios.put(
        `${api}/equipment/update-status/${id}`,
        {
          status: status,
        },
        config
      );
      await fetchEquipments();
      return Swal.fire("Success", `Equipment is now ${status}`, "success");
    } catch (error) {
      return Swal.fire("Error", `${error.response.data.msg}`, "error");
    }
  };

  useEffect(() => {
    fetchEquipments();
  }, []);

  useEffect(() => {
    const result = data.filter((item) => {
      if (
        item.name.toLowerCase().match(search.toLowerCase()) ||
        item.status.toLowerCase().match(search.toLowerCase())
      ) {
        return item;
      }
    });
    setFilteredData(result);
  }, [search]);

  // CSV HEADERS
  const headers = [
    { label: "Equipment Name", key: "name" },
    { label: "Status", key: "status" },
  ];

  // Export PDF
  const download_pdf = () => {
    let doc = new jsPDF("l");

    let toPrintArray = filteredData.length >= 1 ? filteredData : data;

    let head = [["Equipment Name", "Status"]];
    let body = toPrintArray.map((item) => {
      return [item.name, item.status];
    });
    doc.autoTable({ head: head, body: body });
    doc.save("equipment.pdf");
  };

  return (
    <>
      {showAddModal && (
        <AddModal
          closeAddModal={closeAddModal}
          fetchEquipments={fetchEquipments}
        />
      )}

      {editModalData !== null && (
        <EditModal
          closeEditModal={closeEditModal}
          fetchEquipments={fetchEquipments}
          editModalData={editModalData}
        />
      )}

      <div className="py-4 mt-5 mx-6 rounded-sm shadow-md bg-white">
        <DataTable
          title="Equipments"
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
            <div className="w-full flex flex-col md:flex-row justify-between items-center ">
              <div>
                <button
                  onClick={() => {
                    setShowAddModal(true);
                  }}
                  className="bg-[#114B7B] text-white px-3 py-1 rounded-md mb-2"
                >
                  Add
                </button>

                {data?.length >= 1 && (
                  <div className="space-x-2 mb-2">
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

export default EquipmentTable;
