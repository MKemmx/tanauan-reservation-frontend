import React, { useState, useEffect } from "react";
import {
  BarChart,
  Bar,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

// Components
import YearlyMenu from "./YearlyMenu";

import Select from "react-select";

// Api and Axios
import api from "../../utils/api";
import axios from "axios";

// Components
import Loader from "../../components/Loader/Loader";

// Admin Dashboard State
import useDashboardState from "../../store/AdminStore/dashboardState";
import useLoginState from "../../store/loginState";

const AdminBarChart = () => {
  const { dashboardData } = useDashboardState((state) => state);
  const { token } = useLoginState((state) => state);

  // Bar Data
  const [yearSelected, setYearSelected] = useState({
    value: Number(new Date().getFullYear()),
    label: Number(new Date().getFullYear()),
  });
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);

  // Year Options
  const [options, setOptions] = useState([]);

  const config = {
    headers: {
      "Content-Type": "application/json",
      "auth-token": token,
    },
  };

  const fetchAdminBarChart = async () => {
    try {
      setLoading(true);
      const { data } = await axios.get(
        `${api}/admin/barchart/${yearSelected.value}`,
        config
      );
      let yearlyReservations = data.barChartData.yearlyReservations;
      calcData(yearlyReservations);
      let yearOptions = data.barChartData.yearOptions.map((year) => {
        return {
          value: year,
          label: year,
        };
      });
      setOptions(yearOptions);
      setLoading(false);
    } catch (error) {
      console.log(error.response.data.msg);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAdminBarChart();
  }, [yearSelected.value]);

  //! Show Bar Graph Yearly Data
  const calcData = (yearlyArray) => {
    let months = [
      {
        name: "January",
        reserved: 0,
      },
      {
        name: "February",
        reserved: 0,
      },
      {
        name: "March",
        reserved: 0,
      },
      {
        name: "April",
        reserved: 0,
      },
      {
        name: "May",
        reserved: 0,
      },
      {
        name: "June",
        reserved: 0,
      },
      {
        name: "July",
        reserved: 0,
      },
      {
        name: "August",
        reserved: 0,
      },
      {
        name: "September",
        reserved: 0,
      },
      {
        name: "October",
        reserved: 0,
      },
      {
        name: "November",
        reserved: 0,
      },
      {
        name: "December",
        reserved: 0,
      },
    ];
    yearlyArray.map((item) => {
      const reservedMonth = new Date(item.start).toLocaleString("default", {
        month: "long",
      });
      for (let i = 0; i < months.length; i++) {
        if (
          months[i].name.toLowerCase() === reservedMonth.toLocaleLowerCase()
        ) {
          months[i].reserved += 1;
        }
      }
    });
    setData(months);
  };

  return (
    <div className="w-full">
      {loading ? (
        <div className="w-full h-96 flex items-center justify-center">
          <Loader />
        </div>
      ) : (
        <>
          <div className="w-full flex justify-between align-center py-5 px-4 border-b-2 border-gray-200 mb-3">
            <h2 className="text-lg font-medium text-gray-600">
              Yearly Reservations
            </h2>

            <div>
              <YearlyMenu data={data} yearSelected={yearSelected} />
            </div>
          </div>

          <div className="px-5">
            <div className="flex justify-end items-center my-2">
              <div className=" space-y-1 w-40">
                <label className="text-gray-700">Select Year:</label>
                <Select
                  value={yearSelected}
                  onChange={({ value }) => {
                    setYearSelected({
                      value: value,
                      label: value,
                    });
                  }}
                  name="year"
                  options={options}
                />
              </div>
            </div>

            <div id="barChart" className="pr-10 py-5 bg-white">
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={data}>
                  <CartesianGrid strokeDasharray="1 1" />
                  <XAxis dataKey="name" />
                  <YAxis
                    type="number"
                    dataKey={(item) => parseInt(item.reserved)}
                    allowDecimals={false}
                    domain={[0, "dataMax + 5"]}
                  />
                  <Tooltip />
                  <Bar dataKey="reserved" fill="#0A3E69" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default AdminBarChart;
