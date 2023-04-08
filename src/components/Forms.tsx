import React, { useState } from "react";
import { Button, Label, TextInput, Checkbox, Radio } from "flowbite-react";
import { FormProps } from "@/utils/types/formType";
import Link from "next/link";

const SortingDropDown = ({ onHidden }: FormProps) => {
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

const RegisterForm = () => {
  return (
    <>
      <form className="flex flex-col gap-4 w-1/2">
        <div>
          <div className="mb-2 block">
            <Label htmlFor="email" value="Your email" />
          </div>
          <TextInput
            id="email"
            type="email"
            placeholder="name@kalottong.com"
            required={true}
            shadow={true}
          />
        </div>
        <div>
          <div className="mb-2 block">
            <Label htmlFor="password2" value="Your password" />
          </div>
          <TextInput
            id="password2"
            type="password"
            required={true}
            shadow={true}
          />
        </div>
        <div>
          <div className="mb-2 block">
            <Label htmlFor="repeat-password" value="Repeat password" />
          </div>
          <TextInput
            id="repeat-password"
            type="password"
            required={true}
            shadow={true}
          />
        </div>
        <div>
          <fieldset className="flex gap-4" id="radio">
            <legend className="text-[14px] font-medium my-1">Choose gender</legend>
            <div className="flex items-center gap-2">
              <Radio id="man" name="gender" value="man" />
              <Label htmlFor="man">Man</Label>
            </div>
            <div className="flex items-center gap-2">
              <Radio id="women" name="gender" value="women" />
              <Label htmlFor="women">Women</Label>
            </div>
          </fieldset>
        </div>
        <div className="flex items-center gap-2">
          <Checkbox id="agree" />
          <Label htmlFor="agree">
            I agree with the {""}
            <Link href="#" className="text-red-orange hover:underline">
              terms and conditions
            </Link>
          </Label>
        </div>
        <Button
          type="submit"
          className="bg-red-orange hover:bg-red-orange-dark focus:ring-4 focus:ring-red-orange-light"
        >
          Register new account
        </Button>
      </form>
    </>
  );
};

export { SortingDropDown, RegisterForm };
