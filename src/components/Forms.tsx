import React, { useState, useRef, useEffect } from "react";
import { useOnClickOutside } from "usehooks-ts";
import Link from "next/link";
import { useRouter } from "next/router";
import { useDispatch } from "react-redux";
import cookie from "@/utils/storage/cookies";

import { AppDispatch } from "../redux/store";
import { taskAction } from "../redux/reducers/tasks";
import { register, login } from "../utils/api/auth";
import { SortingDropDownsProps } from "../utils/types/formType";
import {
  customeCheckboxTheme,
  customeInputTextTheme,
  customeRadioTheme,
} from "../utils/custome/input";
import { customeRegisterButtonTheme } from "@/utils/custome/button";

import { Button, Label, TextInput, Checkbox, Radio } from "flowbite-react";
import { RegulerButton } from "./Button";
import { SpinnerLoader, ErrorMessage } from "./Feed";

export const SortingDropDown: React.FC<SortingDropDownsProps> = ({
  setSort,
  hiddenOutside,
  setClickOutside,
  hiddenInside,
  setClickInside,
  limit,
  sort,
  page,
  status,
}) => {
  const useAppDispatch: () => AppDispatch = useDispatch;
  const dispatch = useAppDispatch();
  const sortList = useRef(null);
  const handleClickOutside = () => {
    setClickInside(true);
    setClickOutside(!hiddenOutside);
  };

  useOnClickOutside(sortList, handleClickOutside);

  const sorts = [
    {
      id: 1,
      name: "Terbaru",
      value: "new",
    },
    {
      id: 2,
      name: "Terlama",
      value: "old",
    },
    {
      id: 3,
      name: "By Update",
      value: "updated",
    },
    {
      id: 4,
      name: "By a-z",
      value: "a-z",
    },
    {
      id: 5,
      name: "By z-a",
      value: "z-a",
    },
  ];

  const handleSort = (sort: any, el: any) => {
    setSort(sort);
    el.target.value = sort.value;
  };

  const handleResetTask = async () => {
    dispatch(
      taskAction.retriveOngoingTasksThunk({
        params: `?status=${status}&sort=&limit=${limit}&page=${page}`,
        accessToken: cookie.get({ key: "token" }),
      })
    );

    setSort({
      id: null,
      name: "",
      value: "",
    });
  };

  return (
    <>
      <ul
        ref={sortList}
        className={
          hiddenInside || hiddenOutside
            ? "hidden"
            : "border-solid border-2 border-[#CCCED2] bg-white absolute w-[300px] m-h-[144px] right-0 p-[1rem] rounded-[8px] flex flex-col gap-[1rem] mt-2 z-50 md:w-[200px]"
        }
      >
        {sort.value && (
          <li className="w-full">
            <div className="flex justify-end">
              <label
                htmlFor="reset"
                className="bg-red-orange rounded-[60px] text-white hover:bg-red-orange-dark py-1 px-4 text-sm"
              >
                Reset
              </label>
              <input
                name="sort"
                type="radio"
                id="reset"
                className="hidden"
                onClick={handleResetTask}
              />
            </div>
          </li>
        )}
        {sorts.map((sort: any) => (
          <>
            <li className="w-full" key={sort.id}>
              <div className="flex items-center">
                <label
                  htmlFor={sort.name}
                  className="text-cyan-blue font-[400]"
                >
                  {sort?.name}
                </label>
                <input
                  name="sort"
                  id={sort.name}
                  type="radio"
                  className="w-[24px] h-[24px] text-red-orange bg-transparent border-gray-300 rounded-[100%] focus:ring-red-orange ml-auto"
                  onClick={(el) => handleSort({ ...sort }, el)}
                />
              </div>
            </li>
          </>
        ))}
      </ul>
    </>
  );
};

export const RegisterForm: React.FC = () => {
  interface statusInitState {
    login: number | null;
  }

  const router = useRouter();
  const [agree, setAgree] = useState<boolean>(false);
  const [loader, setLoader] = useState<boolean>(false);
  const [errorResponse, setErrorResponse] = useState<any>("");
  const [status, setStatus] = useState<statusInitState>({
    login: null,
  });

  const [body, setBody] = useState({
    email: "",
    password: "",
    confirmPassword: "",
    gender_id: "",
  });

  const handleInput = (e: any) => {
    setBody({ ...body, [e.target.name]: e.target.value });
  };

  const handleRegister = async (e: any) => {
    e.preventDefault();

    try {
      setLoader(true);
      const registerResponse = await register(body);

      setErrorResponse(false);

      if (registerResponse.status === 201) {
        const loginResponse = await login({
          email: body?.email,
          password: body?.password,
        });

        cookie.set({ key: "token", value: loginResponse.data.data?.token });

        setStatus({
          login: loginResponse?.status,
        });
      }
    } catch (error: any) {
      setErrorResponse(error.response.data);
    } finally {
      setLoader(false);
    }
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

  useEffect(() => {
    if (status.login) router.replace("/home");
  }, [status.login, router]);

  return (
    <>
      <form
        className="flex flex-col gap-4 w-1/2 md:w-full"
        id="form"
        onSubmit={handleRegister}
      >
        <div>
          <div className="mb-2 block">
            <Label htmlFor="email" value="Your email" />
          </div>
          <TextInput
            theme={customeInputTextTheme}
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
            theme={customeInputTextTheme}
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
            theme={customeInputTextTheme}
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
                theme={customeRadioTheme}
                id="man"
                name="gender_id"
                value={1}
                onChange={handleInput}
              />
              <Label htmlFor="man">Man</Label>
            </div>
            <div className="flex items-center gap-2">
              <Radio
                theme={customeRadioTheme}
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
          <Checkbox
            theme={customeCheckboxTheme}
            id="agree"
            onChange={(e) => setAgree(e.target.checked)}
          />
          <Label htmlFor="agree">
            I agree with the {""}
            <Link href="#" className="text-red-orange hover:underline">
              terms and conditions
            </Link>
          </Label>
        </div>
        <Button
          theme={customeRegisterButtonTheme}
          className={`${
            !body.email &&
            !body.password &&
            !body.confirmPassword &&
            !body.gender_id &&
            !agree &&
            "hidden"
          }`}
          onClick={toClear}
          color="redOrange"
        >
          Clear
        </Button>
        <Button
          theme={customeRegisterButtonTheme}
          type="submit"
          disabled={Object.values(body).includes("") || !agree || loader}
          color={
            Object.values(body).includes("") ? "redOrange" : "redOrangeDark"
          }
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

export const ResetPasswordForm: React.FC = () => {
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
          setAction={() => console.log("Reset password test.!")}
          onDisable={!email}
        />
      </div>
    </>
  );
};
