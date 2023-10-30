import React, { useState, useRef, useEffect } from "react";
import { useOnClickOutside, useToggle } from "usehooks-ts";
import { Icon } from "@iconify/react";
import Image from "next/image";
import Link from "next/link";
import cookie from "@/utils/storage/cookies";
import { useSelector, useDispatch } from "react-redux";

import { usersAction } from "../redux/reducers/users";
import { fiturAction } from "@/redux/reducers/fitur";
import type { RootState, AppDispatch } from "@/redux/store";

import { AuthModal, LogoutModal, NotificationModal } from "./Modal";
import { HeaderProfileSkeletonLoader, Info } from "./Feed";
import {
  KalottongLogo,
  ActiveNotificationIcon,
  OffNotificationIcon,
} from "../utils/assest";

const Header: React.FC<{ onActive?: any }> = ({ onActive }) => {
  const useAppDispatch: () => AppDispatch = useDispatch;
  const dispatch = useAppDispatch();
  const retriveProfile = useSelector(
    (state: RootState) => state.user.retriveProfile
  );

  const info = useSelector((state: RootState) => state.fitur.info);

  const [hiddenClickOutside, setHiddenClickOutside] = useState<boolean>(true);
  const [hiddenClickInside, setHiddenClickInside] = useState<boolean>(true);
  const [showAuthModal, setShowAuthModal] = useState<boolean>(false);
  const [showLogoutModal, setShowLogoutModal] = useState(false);
  const [toggleNotification, toggel] = useToggle();
  const profile = {
    image: retriveProfile.data?.image,
    firstname: retriveProfile.data?.firstname,
    lastname: retriveProfile.data?.lastname,
    notelp: retriveProfile.data?.notelp,
  };

  useEffect(() => {
    dispatch(
      usersAction.retriveProfileThunk({
        accessToken: cookie.get({ key: "token" }),
      })
    );
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
        setClose={() => setShowAuthModal(false)}
      />
      {showLogoutModal && (
        <LogoutModal
          setShow={() => setShowLogoutModal(!showLogoutModal)}
          setCloseShowLogoutModal={setShowLogoutModal}
          closeShowLogoutModal={showLogoutModal}
        />
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
        <section className="flex-1 flex justify-end gap-x-2 items-center">
          {cookie.get({ key: "token" }) ? (
            <>
              <div className="flex items-center relative flex-1 justify-end">
                {!true ? (
                  <button
                    onClick={toggel}
                    className="hover:bg-[#CCCED2] p-2 rounded-[100%]"
                  >
                    <Image
                      src={ActiveNotificationIcon}
                      width={500}
                      height={500}
                      alt="Active Notification"
                      className="w-[1.2rem]"
                    />
                  </button>
                ) : (
                  <button
                    onClick={toggel}
                    className="hover:bg-[#CCCED2] p-2 rounded-[100%]"
                  >
                    <Image
                      src={OffNotificationIcon}
                      width={500}
                      height={500}
                      alt="Off Notification"
                      className="w-[1rem]"
                    />
                  </button>
                )}
                {toggleNotification && <NotificationModal />}
              </div>
              <div className="relative">
                {/* User avatar dropdown with name */}
                <div className="flex items-center">
                  <button
                    className={
                      hiddenClickInside || hiddenClickOutside
                        ? "flex items-center text-sm font-medium gap-x-2 rounded-full z-40 min-w-[172px] sm:min-w-0"
                        : "flex items-center text-sm font-medium gap-x-2 focus:ring-2 focus:ring-offset-2 focus:ring-red-orange rounded-full z-40 min-w-[172px] sm:min-w-0"
                    }
                    onClick={handleClickInside}
                  >
                    {retriveProfile?.isLoading ||
                    !retriveProfile?.data?.image ? (
                      <HeaderProfileSkeletonLoader />
                    ) : (
                      <>
                        <Image
                          src={`${process.env.NEXT_PUBLIC_IMAGE_CLOUDNIARY}/${retriveProfile?.data?.image}`}
                          alt="user photo"
                          className="w-[2rem] h-[2rem] rounded-[100%]"
                          width={500}
                          height={500}
                          loading="lazy"
                        />
                        <p className="flex-1 sm:hidden font-semibold">
                          {retriveProfile?.data?.firstname}{" "}
                          {retriveProfile?.data?.lastname}
                        </p>
                      </>
                    )}
                    <svg
                      className="w-4 h-4 ml-auto sm:hidden"
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
                    <div className="truncate font-semibold">
                      {retriveProfile?.data?.email}
                    </div>
                  </div>
                  <ul className="py-2 text-sm text-gray-700">
                    <li>
                      {!onActive && (
                        <Link
                          href="/users/profile"
                          className="block px-4 py-2 hover:bg-gray-100"
                        >
                          Profile
                        </Link>
                      )}
                      {onActive && (
                        <p className={`${onActive} block px-4 py-2`}>Profile</p>
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
          ) : (
            <button
              className="flex"
              onClick={() => setShowAuthModal(true)}
            >
              <Icon
                icon="pepicons-pop:enter-circle"
                color="#f3551c"
                width="28"
                height="28"
              />
            </button>
          )}
        </section>
      </header>
      {cookie.get({ key: "token" }) && (
        <>
          {Object.values(profile).includes(null) ? (
            <>
              {info?.isShow && (
                <Info
                  color={"info"}
                  setClose={() => dispatch(fiturAction.info(false))}
                  init={"Silakan, lengkapi profile anda terlebih dahulu."}
                />
              )}
            </>
          ) : null}
        </>
      )}
    </>
  );
};

export default Header;
