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

import Select from "react-select";

// Api and Axios
import api from "../../utils/api";
import axios from "axios";

// Components
import Loader from "../../components/Loader/Loader";

// Admin Dashboard State
import useDashboardState from "../../store/AdminStore/dashboardState";

const AdminBarChart = () => {
  const { dashboardData } = useDashboardState((state) => state);

  // Bar Data
  const [yearSelected, setYearSelected] = useState({
    value: Number(new Date().getFullYear()),
    label: Number(new Date().getFullYear()),
  });
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);

  // Year Options
  const [options, setOptions] = useState([]);

  const fetchAdminBarChart = async () => {
    try {
      setLoading(true);
      const { data } = await axios.get(
        `${api}/admin/barchart/${yearSelected.value}`
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
    <div className="w-full h-96 pb-20 pt-2">
      {loading ? (
        <div className="w-full h-full flex items-center justify-center">
          <Loader />
        </div>
      ) : (
        <>
          <div className="flex justify-between items-center pb-3">
            <div className="ml-auto space-y-1 w-40">
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

          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={data}
              margin={{
                top: 5,
                right: 20,
                left: 10,
                bottom: 5,
              }}
            >
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
        </>
      )}
    </div>
  );
};

export default AdminBarChart;
