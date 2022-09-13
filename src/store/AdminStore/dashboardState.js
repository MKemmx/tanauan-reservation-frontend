import create from "zustand";
import { devtools } from "zustand/middleware";

import moment from "moment";

// API AND AXIOS
import api from "../../utils/api";
import axios from "axios";

const dashboardStore = (set, get) => ({
  dashboardData: [],
  loading: false,
  fetchDashboardData: async (token) => {
    let oldState = get();
    const config = {
      headers: {
        "Content-Type": "application/json",
        "auth-token": token,
      },
    };

    try {
      set({
        ...oldState,
        loading: true,
      });
      const { data } = await axios.get(`${api}/admin/dashboard`, config);

      set({
        dashboardData: data.dashboardData,
        loading: false,
      });
    } catch (error) {
      console.log(error.reseponse.data.msg);
      set({
        ...oldState,
        loading: false,
      });
    }
  },
});

const useDashboardState = create(
  devtools(dashboardStore, {
    name: "adminDashboard",
  })
);

export default useDashboardState;
