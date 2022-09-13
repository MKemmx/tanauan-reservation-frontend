// React Icons
import { AiOutlineUser, AiOutlineHome } from "react-icons/ai";

const UserMenu = [
  {
    name: "Home",
    icon: <AiOutlineHome color="#fff" size={26} />,
    link: "/",
  },
  {
    name: "Account Details",
    icon: <AiOutlineUser color="#fff" size={26} />,
    link: "/account-details",
  },
];

export default UserMenu;
