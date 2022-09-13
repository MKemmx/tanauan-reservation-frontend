import create from "zustand";
import { devtools } from "zustand/middleware";

// Moment
import moment from "moment";

// API AND AXIOS
import api from "../../utils/api";
import axios from "axios";

const UserCalendarStore = (set, get) => ({
  calendarData: [],
  loading: false,
  fetchReservations: async (token) => {
    let oldState = get();
    const config = {
      headers: {
        "auth-token": token,
      },
    };

    try {
      set({
        ...oldState,
        loading: true,
      });

      const { data } = await axios.get(
        `${api}/reservation/calendar-reservations`,
        config
      );

      const MSINHOUR = 1000 * 60 * 60;
      const mainData = data.reservation.map((reser) => {
        let hourChecker = Math.round(
          Math.abs(
            new Date(reser.end).getTime() - new Date(reser.start).getTime()
          ) / MSINHOUR
        );

        return {
          ...reser,
          start: moment(reser.start).toDate(),
          end: moment(reser.end).toDate(),
          allDay: hourChecker > 24 ? true : false,
        };
      });

      set({
        ...oldState,
        calendarData: mainData,
        loading: false,
      });
    } catch (error) {
      set({
        loading: false,
      });
    }
  },
});

const useUserCalendar = create(
  devtools(UserCalendarStore, {
    name: "userCalendar",
  })
);

export default useUserCalendar;
