import React, { useState, useEffect, useRef } from "react";
import { getCookie, deleteCookie } from "cookies-next";
import { setCookie } from "cookies-next";
import Link from "next/link";
import Image from "next/image";
import { Icon } from "@iconify/react";

import { login } from "@/utils/api/auth";
import { AuthModalProps } from "@/utils/types/modalType";
import {
  setItemLocalStorage,
  getItemLocalStorage,
  removeItemLocalStorage,
} from "@/utils/storage/localStorage";
import { logout } from "@/utils/api/auth";

import { Button, Modal, Label, Checkbox } from "flowbite-react";
import { SpinnerLoader, ErrorMessage } from "./Feed";
import EditIcon from "../assets/icons/edit.png";
import DeleteIcon from "../assets/icons/delete.png";

export const AuthModal: React.FC<AuthModalProps> = ({ onShow, onSetClose }) => {
  const [errorResponse, setErrorResponse] = useState<any>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [remember, setRemember] = useState<boolean>(false);
  const [displayEmail, setDisplayEmail] = useState<any>("");
  const email = useRef<any>("");
  const password = useRef<any>("");

  const handleLogin = async () => {
    if (email.current.value === "") {
      return setErrorResponse("Required email");
    }

    if (password.current.value === "") {
      return setErrorResponse("Required password");
    }

    try {
      setLoading(true);
      const response = await login({
        email: email.current.value,
        password: password.current.value,
      });

      if (response.status === 200) {
        // setCookie("data-user", JSON.stringify(response.data.data));
        setCookie("token", response.data.data?.token);
        if (remember === true) {
          setItemLocalStorage("email-user", response.data.data?.email);
        }
      }

      setErrorResponse(false); // If fulfilled element of "Error" response which trigger by the stage is going to set "false".

      window.location.reload();
    } catch (error: any) {
      console.error(error.response.data.msg);
      setErrorResponse(error.response.data.msg);
    } finally {
      setLoading(false);
    }
  };

  const handleRemember = (e: any) => {
    // console.log("Element:", e);
    setRemember(!remember);
  };

  useEffect(() => {
    const data = getItemLocalStorage("email-user");
    setDisplayEmail(data);
  }, []);

  const toClear = () => {
    removeItemLocalStorage("email-user");
    window.location.reload();
  };

  // Add onKeyDown event for utilize keyboard and set it when it's key equal tu "Enter" the handleEnter function is going to be executed.
  const handleEnter = (e: any) => {
    // console.log("Result:", e);
    // console.log("Id:", e.target.id);

    if (e.key === "Enter") {
      if (e.target.id === "remember") setRemember(true);

      return handleLogin();
    }
  };

  return (
    <>
      <Modal
        show={onShow}
        size="md"
        popup={true}
        dismissible={true}
        onClose={onSetClose}
        className="min-h-screen"
      >
        <Modal.Header />
        <Modal.Body>
          <div className="space-y-6 px-6 pb-4 sm:pb-6 lg:px-8 xl:pb-8">
            <h3 className="text-xl font-medium text-gray-900">
              Sign in to <span className="text-red-orange">kalottong</span>
            </h3>
            <div>
              <div className="mb-2 block">
                <Label htmlFor="email" value="Your email" />
              </div>
              <input
                ref={email}
                name="email"
                id="email"
                type="email"
                placeholder="name@kalottong.com"
                className={`bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5 ${
                  errorResponse === "Email is not registered" &&
                  "border-red-500 bg-red-50 text-red-900 placeholder-red-700 focus:ring-red-500 focus:border-red-500"
                } ${
                  errorResponse === "Required email" &&
                  "border-red-500 bg-red-50 text-red-900 placeholder-red-700 focus:ring-red-500 focus:border-red-500"
                }`}
                value={displayEmail}
                onChange={() => setDisplayEmail(displayEmail)}
                onKeyDown={handleEnter}
              />
            </div>
            <div>
              <div className="mb-2 block">
                <Label htmlFor="password" value="Your password" />
              </div>
              <input
                ref={password}
                name="password"
                id="password"
                type="password"
                className={`bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5 ${
                  errorResponse === "Wrong password" &&
                  "border-red-500 bg-red-50 text-red-900 placeholder-red-700 focus:ring-red-500 focus:border-red-500"
                } ${
                  errorResponse === "Required password" &&
                  "border-red-500 bg-red-50 text-red-900 placeholder-red-700 focus:ring-red-500 focus:border-red-500"
                }`}
                onKeyDown={handleEnter}
              />
            </div>
            <div className="flex justify-center">
              {errorResponse ? <ErrorMessage msg={errorResponse} /> : null}
            </div>
            <div className="flex justify-between">
              {displayEmail ? (
                <div className="flex items-center gap-2">
                  <button
                    className="text-[12px] font-bold hover:text-gray-900"
                    onClick={toClear}
                  >
                    Clear email
                  </button>
                </div>
              ) : (
                <div className="flex items-center gap-2">
                  <Checkbox
                    id="remember"
                    onClick={handleRemember}
                    onKeyDown={handleEnter}
                    checked={remember}
                  />
                  <Label htmlFor="remember">Remember me</Label>
                </div>
              )}
              <Link
                href="/password/reset"
                className="text-sm text-red-orange hover:underline"
              >
                Forget Password?
              </Link>
            </div>
            <div className="w-full">
              <Button
                className={`bg-red-orange hover:bg-red-orange-dark focus:ring-4 focus:ring-red-orange-light w-full ${
                  loading && "cursor-not-allowed"
                }`}
                onClick={handleLogin}
                onKeyDown={handleEnter}
              >
                {loading ? (
                  <SpinnerLoader onClassName={"fill-red-orange"} />
                ) : (
                  <span>Log in to your account</span>
                )}
              </Button>
            </div>
            <div className="text-sm font-medium text-gray-500">
              Not registered?
              <Link
                href="/auth/register"
                className="text-red-orange hover:underline"
              >
                Create account
              </Link>
            </div>
          </div>
        </Modal.Body>
      </Modal>
    </>
  );
};

export const LogoutModal: React.FC<{ onSetShow: any }> = ({ onSetShow }) => {
  const [loading, setLoading] = useState(false);
  const handleLogout = async () => {
    try {
      setLoading(true);
      const response = await logout(getCookie("token"));
      // console.log(response);
      if (response.status === 200) {
        deleteCookie("token");
        window.location.reload();
      }
      // console.log("Repsonse:", response);
    } catch (error: any) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };
  return (
    <>
      <div className=" flex fixed top-0 left-0 right-0 h-[100vh] flex-col items-center justify-center bg-transparant pt-4 z-50">
        <div className="fixed overflow-y-auto">
          <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
            <div className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg">
              <div className="p-4 sm:p-10 text-center overflow-y-auto">
                {/* Icon */}
                <span className="mb-4 inline-flex justify-center items-center w-[62px] h-[62px] rounded-full border-4 border-yellow-50 bg-yellow-100 text-yellow-500">
                  <svg
                    className="w-5 h-5"
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    fill="currentColor"
                    viewBox="0 0 16 16"
                  >
                    <path d="M8.982 1.566a1.13 1.13 0 0 0-1.96 0L.165 13.233c-.457.778.091 1.767.98 1.767h13.713c.889 0 1.438-.99.98-1.767L8.982 1.566zM8 5c.535 0 .954.462.9.995l-.35 3.507a.552.552 0 0 1-1.1 0L7.1 5.995A.905.905 0 0 1 8 5zm.002 6a1 1 0 1 1 0 2 1 1 0 0 1 0-2z"></path>
                  </svg>
                </span>
                {/* End Icon */}

                <h3 className="mb-2 text-2xl font-bold text-gray-800">
                  Sign out
                </h3>
                <p className="text-gray-500">
                  Are you sure you would like to sign out of your account?
                </p>

                <div className="mt-6 flex justify-center gap-x-4">
                  <button
                    className={`py-2.5 px-4 inline-flex justify-center items-center gap-2 rounded-md border font-medium bg-white text-gray-700 shadow-sm align-middle hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-white focus:ring-blue-600 transition-all text-sm w-[91.6094px] ${
                      loading && "cursor-not-allowed"
                    }`}
                    onClick={handleLogout}
                    disabled={loading && true}
                  >
                    {loading ? (
                      <SpinnerLoader onClassName={"ring-blue-400"} />
                    ) : (
                      "Sign out"
                    )}
                  </button>
                  <button
                    type="button"
                    className="py-2.5 px-4 inline-flex justify-center items-center gap-2 rounded-md border border-transparent font-semibold bg-blue-500 text-white hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-all text-sm w-[91.6094px]"
                    onClick={onSetShow}
                  >
                    Cancel
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export const OptionTaskModal: React.FC<{
  onShow: boolean;
  onSetClose?: any;
  onFocus: any;
}> = ({ onShow, onSetClose, onFocus }) => {
  const HandleDeleteTask = () => {
    console.log("Delete task test");
  };

  const HandleRenameTask = () => {
    console.log("Rename task test");
  };

  return (
    <>
      <div
        className={
          onFocus || !onShow
            ? "hidden"
            : "flex flex-col gap-y-2 absolute right-2 top-8 bg-[#FFFFFF] z-40 p-[18px] border-[1px] border-solid border-[#CCCED2] rounded-[8px]"
        }
      >
        <button
          className="absolute top-1 right-1 z-40"
          onClick={onSetClose}
        >
          <Icon icon="material-symbols:close" />
        </button>
        <span className="text-[12px] flex items-center gap-x-1 cursor-pointer">
          <label htmlFor="edit">
            <Image
              src={EditIcon}
              alt="Edit icon"
              width={500}
              height={500}
              className="w-[12px] h-[12px]"
            />
          </label>
          <button id="edit" onClick={HandleRenameTask}>
            Rename task
          </button>
        </span>
        <span className="text-[12px] flex items-center gap-x-1 cursor-pointer">
          <label htmlFor="delete">
            <Image
              src={DeleteIcon}
              alt="Delete icon"
              width={500}
              height={500}
              className="w-[12px] h-[12px]"
            />
          </label>
          <button id="delete" onClick={HandleDeleteTask}>
            Delete task
          </button>
        </span>
      </div>
    </>
  );
};
