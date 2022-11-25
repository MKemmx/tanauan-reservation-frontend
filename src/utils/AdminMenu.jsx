// Icons
import {
  MdOutlineDashboard,
  MdOutlineAccessTime,
  MdPayment,
} from "react-icons/md";
import { FaUsers } from "react-icons/fa";
import { AiOutlineSchedule, AiOutlineStar } from "react-icons/ai";
import { BsTools } from "react-icons/bs";

export const adminMenu = [
  {
    name: "Dashboard",
    icon: <MdOutlineDashboard color="#fff" size={26} />,
    link: "/",
  },
  {
    name: "Reservations",
    icon: <AiOutlineSchedule color="#fff" size={26} />,
    link: "/reservation",
  },
  {
    name: "Users",
    icon: <FaUsers color="#fff" size={26} />,
    link: "/user",
  },
  {
    name: "Equipments",
    icon: <BsTools color="#fff" size={26} />,
    link: "/equipment",
  },
  {
    name: "Ratings",
    icon: <AiOutlineStar color="#fff" size={26} />,
    link: "/rating",
  },
  {
    name: "Payments",
    icon: <MdPayment color="#fff" size={26} />,
    link: "/payment",
  },
  {
    name: "System Logs",
    icon: <MdOutlineAccessTime color="#fff" size={26} />,
    link: "/logs",
  },
];
