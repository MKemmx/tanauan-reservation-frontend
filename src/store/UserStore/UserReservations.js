import create from "zustand";
import { devtools } from "zustand/middleware";

// Moment
import moment from "moment";

// API AND AXIOS
import api from "../../utils/api";
import axios from "axios";

const userReservationStore = (set, get) => ({
  reservationData: [],
  loading: false,
  totalReservation: 0,
  successReservation: 0,
  pendingReservation: 0,
  cancelledReservation: 0,
  rejectedReservation: 0,
  fetchMyReservations: async (token) => {
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
        `${api}/reservation/my-reservation`,
        config
      );
      const mainData = data.reservation.map((reservation) => {
        return {
          _id: reservation._id,
          equipments: reservation.equipments,
          title: reservation.title,
          start: moment(reservation.start).format("LLLL"),
          end: moment(reservation.end).format("LLLL"),
          status: reservation.status,
          createdAt: moment(reservation.createdAt).format("L"),
        };
      });

      const successR = mainData.filter(
        (item) => item.status === "reserved"
      ).length;
      const pendingR = mainData.filter(
        (item) => item.status === "pending"
      ).length;
      const cancelledR = mainData.filter(
        (item) => item.status === "canceled"
      ).length;
      const rejectedR = mainData.filter(
        (item) => item.status === "rejected"
      ).length;

      set({
        ...oldState,
        reservationData: mainData,
        totalReservation: data?.reservation.length,
        successReservation: successR,
        pendingReservation: pendingR,
        cancelledReservation: cancelledR,
        rejectedReservation: rejectedR,
        loading: false,
      });
    } catch (error) {
      set({
        ...oldState,
        loading: false,
      });
    }
  },
  cancelReservation: async (token, id) => {
    const config = {
      headers: {
        "auth-token": token,
      },
    };
    try {
      await axios.put(
        `${api}/reservation/cancel-reservation/${id}`,
        {
          status: "canceled",
        },
        config
      );
      return true;
    } catch (error) {
      Swal.fire("Error", `${error.reseponse.data.msg}`, "error");
      return false;
    }
  },
});

const useUserReservationState = create(
  devtools(userReservationStore, {
    name: "userReservations",
  })
);

export default useUserReservationState;
