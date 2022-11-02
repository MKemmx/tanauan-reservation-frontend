import React, { useState } from "react";
import html2canvas from "html2canvas";

import { AiOutlineFilePdf, AiOutlineFileExcel } from "react-icons/ai";

// Pdf and CSV
import { CSVLink } from "react-csv";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";

const YearlyMenu = ({ data, yearSelected }) => {
  const [openButton, setOpenButton] = useState(false);

  // CSV HEADERS
  const headers = [
    { label: "Month", key: "name" },
    { label: "Total Reserved", key: "reserved" },
  ];

  const generateExcel = () => {
    setOpenButton(false);
  };

  // Export PDF
  const generate_pdf = async () => {
    let head = [["Month", "Total Reservations"]];
    let body = data.map((item) => {
      return [item.name, item.reserved];
    });

    let barchartContainerImage = document.getElementById("barChart");

    html2canvas(barchartContainerImage, { scale: "2" }).then((canvas) => {
      let imgFile = canvas.toDataURL("image/jpeg", 0.3);
      var doc = new jsPDF("a4");
      var width = doc.internal.pageSize.getWidth();

      doc.autoTable({
        head: head,
        body: body,
        didDrawPage: (data) => {
          if (imgFile) {
            doc.addImage(imgFile, "JPEG", 0, 10, width, 60, undefined, "FAST");
          }
        },
        margin: { top: 80 },
      });
      doc.save(`${yearSelected.value}_tanauan_civic_reservations.pdf`);
    });
  };

  return (
    <div>
      <div className="relative inline-block ">
        {/* Dropdown toggle button */}
        <button
          onClick={() => {
            setOpenButton(!openButton);
          }}
          className="relative z-10 block p-2 text-gray-700 bg-white border border-transparent rounded-md dark:text-white focus:border-blue-500 focus:ring-opacity-40 dark:focus:ring-opacity-40 focus:ring-blue-300 dark:focus:ring-blue-400 focus:ring dark:bg-gray-800 focus:outline-none"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="w-5 h-5"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path d="M10 6a2 2 0 110-4 2 2 0 010 4zM10 12a2 2 0 110-4 2 2 0 010 4zM10 18a2 2 0 110-4 2 2 0 010 4z" />
          </svg>
        </button>
        {/* Dropdown menu */}
        {openButton && (
          <>
            <div className="absolute right-0 z-20 w-48 py-2 mt-2 bg-white border-2 border-gray-200 rounded-md shadow-xl dark:bg-gray-800">
              <div
                onClick={generate_pdf}
                className="cursor-pointer border-b border-gray-100  flex items-center py-1 px-2 text-sm text-gray-600 capitalize transition-colors duration-300 transform dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 dark:hover:text-white"
              >
                <AiOutlineFilePdf size={20} />
                <p className="p-3 text-sm text-gray-600 capitalize transition-colors duration-300 transform dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 dark:hover:text-white">
                  Export to PDF
                </p>
              </div>

              <div
                onClick={generateExcel}
                className="cursor-pointer flex items-center py-1 px-2 text-sm text-gray-600 capitalize transition-colors duration-300 transform dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 dark:hover:text-white"
              >
                <AiOutlineFileExcel size={20} />
                <CSVLink
                  className="p-3 text-sm text-gray-600 capitalize transition-colors duration-300 transform dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 dark:hover:text-white"
                  filename={`${yearSelected.value}_tanauan_civic_reservations.csv`}
                  data={data}
                  headers={headers}
                >
                  Export CSV
                </CSVLink>
              </div>
              {/* <hr className="border-gray-200 dark:border-gray-700 " /> */}
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default YearlyMenu;
