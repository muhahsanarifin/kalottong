import Image from "next/image";
import KalottongLogo from "../assets/icons/kalottong.svg";
import ActiveNotificationIcon from "../assets/icons/active-notification.png";
import OffNotificationIcon from "../assets/icons/off-notification.png"
import AvatarIcon from "../assets/icons/avatar.png"

const Header = () => {
  return (
    <>
      <header className="flex items-center">
        {/* Left header section */}
        <section>
          <Image
            src={KalottongLogo}
            width={1000}
            height={1000}
            alt="kalottong"
            className="w-125"
          />
        </section>
        {/* Right header section */}
        <section className="ml-auto flex gap-x-4">
          {!true ? (
            <button className="text-white bg-red-orange hover:bg-[#f3551c] text-sm rounded-lg font-medium px-5 py-2.5 focus:ring-4 focus:ring-[#ffb291]">
              Login
            </button>
          ) : (
            <>
              <div className="flex items-center">
                {!true ? (
                  <Image
                    src={ActiveNotificationIcon}
                    width={1000}
                    height={1000}
                    alt="Active Notification"
                    className="w-[1.2rem]"
                  />
                ) : (
                  <Image
                    src={OffNotificationIcon}
                    width={1000}
                    height={1000}
                    alt="Off Notification"
                    className="w-[1rem]"
                  />
                )}
              </div>
              {/* User avatar dropdown with name */}
              <div className="flex items-center">
                <button className="flex items-center text-sm font-medium gap-x-2 focus:ring-4 focus:ring-[#ffb291] rounded-full">
                  <Image
                    src={AvatarIcon}
                    alt="user photo"
                    className="w-[2rem] h-[2rem]"
                  />
                  {"Accan"}
                  <svg
                    className="w-4 h-4 mx-1.5"
                    aria-hidden="true"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fill-rule="evenodd"
                      d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                      clip-rule="evenodd"
                    ></path>
                  </svg>
                </button>
              </div>
            </>
          )}
        </section>
      </header>
    </>
  );
};

export default Header;
