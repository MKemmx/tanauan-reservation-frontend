import React, { useEffect, useState } from "react";

// React Calendar and moment
import { Calendar, momentLocalizer } from "react-big-calendar";
import "react-big-calendar/lib/css/react-big-calendar.css";

// Moment
import moment from "moment";

// State Store
import useLoginState from "../../store/loginState";
import useUserCalendarState from "../../store/UserStore/UserCalendar";

// Component
import Loader from "../../components/Loader/Loader";
import UserCalendarModal from "./UserCalendarModal";

// Localizer
const localizer = momentLocalizer(moment);

const UserCalendar = () => {
  // States
  const { token } = useLoginState((state) => state);
  const { fetchReservations, calendarData, loading } = useUserCalendarState(
    (state) => state
  );

  useEffect(() => {
    fetchReservations(token);
  }, []);

  //? Modal Calendar  Detail
  const [showCalendarDetail, setShowCalendarDetail] = useState(null);
  const closeCalendarDetail = () => {
    setShowCalendarDetail(null);
  };

  return (
    <div>
      {showCalendarDetail !== null && (
        <UserCalendarModal
          showCalendarDetail={showCalendarDetail}
          closeCalendarDetail={closeCalendarDetail}
        />
      )}

      {loading ? (
        <div className="w-max-lg py-28 flex items-center justify-center">
          <Loader />
        </div>
      ) : (
        <Calendar
          localizer={localizer}
          events={calendarData}
          startAccessor="start"
          endAccessor="end"
          eventPropGetter={(event) => {
            const backgroundColor = event?.allDay ? "#DC3545" : "#F39C12";
            const color = event.allDay ? "white" : "white";
            return { style: { backgroundColor, color } };
          }}
          style={{ width: "100%", margin: "20px auto", height: "70vh" }}
          components={{
            eventWrapper: ({ event, children }) => {
              return (
                <div
                  onClick={() => {
                    setShowCalendarDetail(event);
                  }}
                  className="w-full"
                >
                  {children}
                </div>
              );
            },
          }}
        />
      )}
    </div>
  );
};

export default UserCalendar;
