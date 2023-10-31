import KalottongLogo from "../assets/icons/kalottong.svg";
import ActiveNotificationIcon from "../assets/icons/active-notification.png";
import OffNotificationIcon from "../assets/icons/off-notification.png";
import AddTaskIcon from "../assets/icons/plus.png";
import AddSubTaskIcon from "../assets/icons/plus-red-orange.png";
import ArrowDownOrange from "../assets/icons/arrow-down-2-red-orange.png";
import ArrowDown from "../assets/icons/arrow-down-2.png";
import ArrowUpGray from "../assets/icons/arrow-up-2-gray.png";
import ArrowRight from "../assets/icons/arrow-right-2.png";
import MoreIcon from "../assets/icons/more-vertical.png";
import Menu from "../assets/icons/menu.png";
import Calender from "../assets/icons/calendar.png";
import EditIcon from "../assets/icons/edit.png";
import DeleteIcon from "../assets/icons/delete.png";
import FourZeroFour from "../assets/icons/404-error.svg";

export {
  KalottongLogo,
  ActiveNotificationIcon,
  OffNotificationIcon,
  AddTaskIcon,
  AddSubTaskIcon,
  ArrowDownOrange,
  ArrowDown,
  ArrowUpGray,
  ArrowRight,
  MoreIcon,
  Menu,
  Calender,
  EditIcon,
  DeleteIcon,
  FourZeroFour,
};

export const EmailIconOrange = () => {
  return (
    <svg
      aria-hidden="true"
      className="w-5 h-5 text-red-orange-dark dark:text-red-orange"
      fill="currentColor"
      viewBox="0 0 20 20"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z"></path>
      <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z"></path>
    </svg>
  );
};

export const EmailIconGray = () => {
  return (
    <svg
      aria-hidden="true"
      className="w-5 h-5 text-gray-500 dark:text-gray-400 opacity-75"
      fill="currentColor"
      viewBox="0 0 20 20"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z"></path>
      <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z"></path>
    </svg>
  );
};