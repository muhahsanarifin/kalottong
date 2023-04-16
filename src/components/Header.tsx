import React, { useState, useRef, useEffect } from "react";
import { useOnClickOutside } from "usehooks-ts";
import Image from "next/image";
import Link from "next/link";
import KalottongLogo from "../assets/icons/kalottong.svg";
import ActiveNotificationIcon from "../assets/icons/active-notification.png";
import OffNotificationIcon from "../assets/icons/off-notification.png";
import AvatarIcon from "../assets/icons/avatar.png";
import { AuthModal } from "./Modal";
import { getCookie } from "cookies-next";

const Header: React.FC = () => {
  const [hiddenClickOutside, setHiddenClickOutside] = useState<Boolean>(true);
  const [hiddenClickInside, setHiddenClickInside] = useState<Boolean>(true);
  const [showModal, setShowModal] = useState<boolean>(false);
  const [accessToken, setAccessToken] = useState<any>();

  const handleClickInside = () => {
    setHiddenClickInside(false);
  };

  const userProfile = useRef(null);
  const handleClickOutside = () => {
    setHiddenClickInside(true);
    setHiddenClickOutside(!hiddenClickOutside);
  };
  useOnClickOutside(userProfile, handleClickOutside);

  useEffect(() => {
    const token = getCookie("token");
    setAccessToken(token);
  }, []);

  return (
    <>
      <AuthModal
        onShow={showModal}
        onSetClose={() => setShowModal(!showModal)}
      />
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
          {!accessToken ? (
            <button
              className="text-white bg-red-orange hover:bg-[#f3551c] text-sm rounded-lg font-medium px-5 py-2.5 focus:ring-4 focus:ring-[#ffb291]"
              onClick={() => setShowModal(!showModal)}
            >
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
              <div className="relative">
                {/* User avatar dropdown with name */}
                <div className="flex items-center">
                  <button
                    className={
                      hiddenClickInside || hiddenClickOutside
                        ? "flex items-center text-sm font-medium gap-x-2 rounded-full z-40"
                        : "flex items-center text-sm font-medium gap-x-2 focus:ring focus:ring-[#ffb291] rounded-full z-40"
                    }
                    onClick={handleClickInside}
                  >
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
                {/* Dropdown menu */}
                <div
                  ref={userProfile}
                  className={
                    hiddenClickInside || hiddenClickOutside
                      ? "hidden"
                      : "border-2 border-solid absolute right-0 bg-white divide-y divide-gray-100 rounded-lg mt-2"
                  }
                >
                  <div className="px-4 py-3 text-sm text-gray-900">
                    <div className="font-medium ">User</div>
                    <div className="truncate">accan@.com</div>
                  </div>
                  <ul className="py-2 text-sm text-gray-700">
                    <li>
                      <Link
                        href="/users/profile"
                        className="block px-4 py-2 hover:bg-gray-100"
                      >
                        Settings
                      </Link>
                    </li>
                  </ul>
                  <div className="py-2">
                    <Link
                      href="#"
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    >
                      Sign out
                    </Link>
                  </div>
                </div>
              </div>
            </>
          )}
        </section>
      </header>
    </>
  );
};

export default Header;
