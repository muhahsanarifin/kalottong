import React, { useState, useEffect, useRef } from "react";
import { Button, Modal, Label, Checkbox } from "flowbite-react";
import { AuthModalProps } from "@/utils/types/modalType";
import Link from "next/link";
import { login } from "@/utils/api/auth";
import { SpinnerLoader, ErrorMessage } from "./Feed";
import { setCookie } from "cookies-next";
import {
  setItemLocalStorage,
  getItemLocalStorage,
} from "@/utils/storage/localStorage";

export const AuthModal = ({ onShow, onSetClose }: AuthModalProps) => {
  const [errorResponse, setErrorResponse] = useState<any>("");
  const [loader, setLoader] = useState<boolean>(false);
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
      setLoader(true);
      const response = await login({
        email: email.current.value,
        password: password.current.value,
      });

      console.log("Another response:", response);
      if (response.status === 200) {
        setCookie("data-user", JSON.stringify(response.data.data));
        if (remember === true) {
          setItemLocalStorage("email-user", response.data.data?.email);
        }
      }
    } catch (error: any) {
      setErrorResponse(error.response.data.msg);
    } finally {
      setLoader(false);
    }
  };

  const sample = () => {
    setRemember(!remember);
  };

  useEffect(() => {
    const coba = getItemLocalStorage("email-user");
    setDisplayEmail(coba);
  }, []);

  const toClear = () => {
    localStorage.clear();
    window.location.reload();
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
                placeholder="name@company.com"
                className={`bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5 ${
                  errorResponse === "Email is not registered" &&
                  "border-red-500 bg-red-50 text-red-900 placeholder-red-700 focus:ring-red-500 focus:border-red-500"
                }`}
                value={displayEmail ? displayEmail : null}
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
                }`}
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
                  <Checkbox id="remember" onClick={sample} />
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
                  loader && "cursor-not-allowed"
                }`}
                onClick={handleLogin}
              >
                {loader ? (
                  <SpinnerLoader />
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
