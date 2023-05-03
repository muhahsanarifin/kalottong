import React, { useState } from "react";
import { Button, Label, TextInput, Checkbox, Radio } from "flowbite-react";
import { SortingDropDownsProps } from "@/utils/types/formType";
import Link from "next/link";
import { RegulerButton } from "./Button";
import { register, login } from "@/utils/api/auth";
import { SpinnerLoader, ErrorMessage } from "./Feed";
import { setCookie } from "cookies-next";

const SortingDropDown: React.FC<SortingDropDownsProps> = ({ onHidden }) => {
  return (
    <>
      <ul
        className={
          !onHidden
            ? "hidden"
            : "border-solid border-2 border-[#CCCED2] bg-white absolute w-[300px] h-[144px] right-0 p-[1rem] rounded-[8px] flex flex-col gap-[1rem] mt-2"
        }
      >
        <li className="w-full border-solid">
          <div className="flex items-center">
            <label htmlFor="by-tanggal" className="text-cyan-blue font-[400]">
              By Tanggal
            </label>
            <input
              name="sort"
              id="by-tanggal"
              type="radio"
              value="by-tanggal"
              className="w-[24px] h-[24px] text-red-orange bg-transparent border-gray-300 rounded-[100%] focus:ring-red-orange ml-auto"
            />
          </div>
        </li>
        <li className="w-full">
          <div className="flex items-center">
            <label htmlFor="by-time" className="text-cyan-blue font-[400]">
              By Time
            </label>
            <input
              name="sort"
              id="by-time"
              type="radio"
              value="by-time"
              className="w-[24px] h-[24px] text-red-orange bg-transparent border-gray-300 rounded-[100%] focus:ring-red-orange ml-auto"
            />
          </div>
        </li>
        <li className="w-full">
          <div className="flex items-center">
            <label htmlFor="terbaru" className="text-cyan-blue font-[400]">
              Terbaru
            </label>
            <input
              name="sort"
              id="terbaru"
              type="radio"
              value="terbaru"
              className="w-[24px] h-[24px] text-red-orange bg-transparent border-gray-300 rounded-[100%] focus:ring-red-orange ml-auto"
            />
          </div>
        </li>
      </ul>
    </>
  );
};

const RegisterForm: React.FC = () => {
  const [agree, setAgree] = useState<boolean>(false);
  const [loader, setLoader] = useState<boolean>(false);
  const [errorResponse, setErrorResponse] = useState<any>("");

  const [body, setBody] = useState({
    email: "",
    password: "",
    confirmPassword: "",
    gender_id: "",
  });

  const handleRegister = async (e: any) => {
    e.preventDefault();

    try {
      setLoader(true);
      const registerResponse = await register({
        email: body.email,
        password: body.password,
        confirmPassword: body.confirmPassword,
        gender_id: body.gender_id,
      });

      setErrorResponse(false);

      if (registerResponse.status === 201) {
        const loginResponse = await login({
          email: registerResponse.data.data[0].email,
          password: body.password,
        });

        // setCookie("data-user", JSON.stringify(loginResponse.data.data));
        setCookie("token", loginResponse.data.data?.token);

        window.location.replace("/home");
      }
    } catch (error: any) {
      console.error(error.response.data.msg);
      setErrorResponse(error.response.data.msg);
    } finally {
      setLoader(false);
    }
  };

  const handleInput = (e: any) => {
    setBody({ ...body, [e.target.name]: e.target.value });
  };

  const toClear = () => {
    setBody({
      email: "",
      password: "",
      confirmPassword: "",
      gender_id: "",
    });

    setAgree(false);

    (document.querySelector("#form") as HTMLFormElement).reset();
  };

  return (
    <>
      <form
        className="flex flex-col gap-4 w-1/2"
        id="form"
        onSubmit={handleRegister}
      >
        <div>
          <div className="mb-2 block">
            <Label htmlFor="email" value="Your email" />
          </div>
          <TextInput
            name="email"
            id="email"
            type="email"
            placeholder="name@kalottong.com"
            shadow={true}
            onChange={handleInput}
            color={
              errorResponse === "Email has been registered" ? "failure" : "gray"
            }
          />
        </div>
        <div>
          <div className="mb-2 block">
            <Label htmlFor="password" value="Your password" />
          </div>
          <TextInput
            name="password"
            id="password"
            type="password"
            shadow={true}
            onChange={handleInput}
            color={
              errorResponse === "Password does not match" ? "failure" : "gray"
            }
          />
        </div>
        <div>
          <div className="mb-2 block">
            <Label htmlFor="repeat-password" value="Repeat password" />
          </div>
          <TextInput
            name="confirmPassword"
            id="confirmPassword"
            type="password"
            shadow={true}
            onChange={handleInput}
            color={
              errorResponse === "Password does not match" ? "failure" : "gray"
            }
          />
        </div>
        <div className="flex justify-center">
          {errorResponse ? <ErrorMessage msg={errorResponse} /> : null}
        </div>
        <div>
          <fieldset className="flex gap-4" id="radio">
            <legend className="text-[14px] font-medium my-1">
              Choose gender
            </legend>
            <div className="flex items-center gap-2">
              <Radio
                id="man"
                name="gender_id"
                value={1}
                onChange={handleInput}
              />
              <Label htmlFor="man">Man</Label>
            </div>
            <div className="flex items-center gap-2">
              <Radio
                id="women"
                name="gender_id"
                value={2}
                onChange={handleInput}
              />
              <Label htmlFor="women">Women</Label>
            </div>
          </fieldset>
        </div>
        <div className="flex items-center gap-2">
          <Checkbox id="agree" onChange={(e) => setAgree(e.target.checked)} />
          <Label htmlFor="agree">
            I agree with the {""}
            <Link href="#" className="text-red-orange hover:underline">
              terms and conditions
            </Link>
          </Label>
        </div>
        <Button
          className={`${
            !body.email &&
            !body.password &&
            !body.confirmPassword &&
            !body.gender_id &&
            !agree
              ? "hidden"
              : "bg-red-orange hover:bg-red-orange-dark focus:ring-4 focus:ring-red-orange-light h-[41.6px] rounded-[8px] text-white text-[14px]"
          }`}
          onClick={toClear}
        >
          Clear
        </Button>
        <Button
          type="submit"
          className="bg-red-orange hover:bg-red-orange-dark focus:ring-4 focus:ring-red-orange-light"
          disabled={Object.values(body).includes("") || !agree || loader}
        >
          {loader ? (
            <SpinnerLoader onClassName={"fill-red-orange"} />
          ) : (
            <span>Register new account</span>
          )}
        </Button>
      </form>
    </>
  );
};

const ResetPasswordForm: React.FC = () => {
  const [email, setEmail] = useState<string>("");
  return (
    <>
      <label
        htmlFor="input-group-1"
        className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
      >
        Your Email
      </label>
      <div className="relative mb-6 flex gap-x-2">
        <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
          <svg
            aria-hidden="true"
            className="w-5 h-5 text-gray-500 dark:text-gray-400"
            fill="currentColor"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z"></path>
            <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z"></path>
          </svg>
        </div>
        <input
          type="text"
          id="input-group-1"
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          placeholder="name@kalottong.com"
          onChange={(e) => setEmail(e.target.value)}
        />
        <RegulerButton
          title="Submit"
          onSetAction={() => console.log("Test")}
          onDisable={!email}
        />
      </div>
    </>
  );
};

export { SortingDropDown, RegisterForm, ResetPasswordForm };
