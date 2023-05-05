import React, { useState, useRef, useEffect, use } from "react";
import { useOnClickOutside } from "usehooks-ts";
import Image from "next/image";
import Link from "next/link";
import { getCookie } from "cookies-next";
import { useSelector, useDispatch } from "react-redux";

import { usersAction } from "../redux/reducers/users";
import type { RootState, AppDispatch } from "@/redux/store";

import { AuthModal, LogoutModal } from "./Modal";
import { HeaderProfileSkeletonLoader } from "./Feed";

import KalottongLogo from "../assets/icons/kalottong.svg";
import ActiveNotificationIcon from "../assets/icons/active-notification.png";
import OffNotificationIcon from "../assets/icons/off-notification.png";

const Header: React.FC<{ onActive?: any }> = ({ onActive }) => {
  const useAppDispatch: () => AppDispatch = useDispatch;
  const dispatch = useAppDispatch();
  const profile = useSelector(
    (state: RootState) => state.user.retriveProfile.data
  );
  const profileLoading = useSelector(
    (state: RootState) => state.user.retriveProfile?.isLoading
  );
  const [hiddenClickOutside, setHiddenClickOutside] = useState<Boolean>(true);
  const [hiddenClickInside, setHiddenClickInside] = useState<Boolean>(true);
  const [showAuthModal, setShowAuthModal] = useState<boolean>(false);
  const [accessToken, setAccessToken] = useState<any>(getCookie("token"));
  const [showLogoutModal, setShowLogoutModal] = useState(false);

  useEffect(() => {
    dispatch(usersAction.retriveProfileThunk({}));
  }, [dispatch]);

  const handleClickInside = () => {
    setHiddenClickInside(false);
  };

  const userProfile = useRef(null);
  const handleClickOutside = () => {
    setHiddenClickInside(true);
    setHiddenClickOutside(!hiddenClickOutside);
  };
  useOnClickOutside(userProfile, handleClickOutside);

  return (
    <>
      {/* Modal */}
      <AuthModal
        onShow={showAuthModal}
        onSetClose={() => setShowAuthModal(false)}
      />
      {showLogoutModal && (
        <LogoutModal onSetShow={() => setShowLogoutModal(!showLogoutModal)} />
      )}
      <header className="flex items-center">
        {/* Left header section */}
        <section>
          <Image
            src={KalottongLogo}
            width={500}
            height={500}
            alt="kalottong"
            className="w-125"
          />
        </section>
        {/* Right header section */}
        <section className="ml-auto flex gap-x-4">
          {!accessToken ? (
            <button
              className="text-white bg-red-orange hover:bg-[#f3551c] text-sm rounded-lg font-medium px-5 py-2.5 focus:ring-2 focus:ring-offset-2 focus:ring-[#ffb291]"
              onClick={() => setShowAuthModal(true)}
            >
              Login
            </button>
          ) : (
            <>
              <div className="flex items-center">
                {!true ? (
                  <Image
                    src={ActiveNotificationIcon}
                    width={500}
                    height={500}
                    alt="Active Notification"
                    className="w-[1.2rem]"
                  />
                ) : (
                  <Image
                    src={OffNotificationIcon}
                    width={500}
                    height={500}
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
                        : "flex items-center text-sm font-medium gap-x-2 focus:ring-2 focus:ring-offset-2 focus:ring-[#ffb291] rounded-full z-40"
                    }
                    onClick={handleClickInside}
                  >
                    {profileLoading ? (
                      <HeaderProfileSkeletonLoader />
                    ) : (
                      <>
                        <Image
                          src={`${process.env.NEXT_PUBLIC_IMAGE_CLOUDNIARY}/${profile?.image}`}
                          alt="user photo"
                          className="w-[2rem] h-[2rem] rounded-[100%]"
                          width={500}
                          height={500}
                          loading="lazy"
                        />
                        {profile?.lastname}
                      </>
                    )}
                    <svg
                      className="w-4 h-4 mx-1.5"
                      aria-hidden="true"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        fillRule="evenodd"
                        d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                        clipRule="evenodd"
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
                      : "border-2 border-solid absolute right-0 bg-white divide-y divide-gray-100 rounded-lg mt-2 z-50"
                  }
                >
                  <div className="px-4 py-3 text-sm text-gray-900">
                    <div className="font-medium ">
                      {profile?.firstname} {profile?.lastname}
                    </div>
                    <div className="truncate">{profile?.email}</div>
                  </div>
                  <ul className="py-2 text-sm text-gray-700">
                    <li>
                      {!onActive && (
                        <Link
                          href="/users/profile"
                          className="block px-4 py-2 hover:bg-gray-100"
                        >
                          Settings
                        </Link>
                      )}
                      {onActive && (
                        <p className={`${onActive} block px-4 py-2`}>
                          Settings
                        </p>
                      )}
                    </li>
                  </ul>
                  <div className="py-2">
                    <button
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-[100%] text-left"
                      onClick={() => setShowLogoutModal(!showAuthModal)}
                    >
                      Sign out
                    </button>
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
