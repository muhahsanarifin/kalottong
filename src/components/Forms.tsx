import React, { useState } from "react";
import { FormProps } from "@/utils/types/form";

const SortingDropDown = ({ onHidden }: FormProps) => {
  return (
    <>
      <ul
        className={
          !onHidden
            ? "hidden"
            : "border-solid border-2 border-[#CCCED2] absolute w-[300px] h-[144px] right-0 p-[1rem] rounded-[8px] flex flex-col gap-[1rem] mt-4"
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

export { SortingDropDown };
