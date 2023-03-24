import React, { useState } from "react";
import { AddTaskButton, SortingButton } from "./Button";
import { SortingDropDown } from "./Forms";
import { useToggle } from "usehooks-ts";

const Main = () => {
  const [hidden, toggle] = useToggle();
  // console.log("Result: ", hidden);

  return (
    <>
      <main className="border-solid border-2 h-screen flex flex-col">
        <div className="border-green-900 border-solid border-2 w-[80%] h-[100%] mx-auto p-[2.5rem]">
          <div className="border-2 border-solid border-yellow-800 h-[100%]">
            {/* Intro & Add Task Button  section */}
            <section className="border-2 border-solid border-blue-600 flex items-center">
              {/* Introduction */}
              <div className="flex flex-col">
                <p className="text-red-orange font-medium text-[16px]">
                  MY TASK
                </p>
                <h1 className="text-[24px] font-medium text-cyan-blue">
                  TO DO List
                </h1>
                <p className="text-[#7A7F83] font-normal text-[16px]">
                  Buat list tugas harian saya
                </p>
              </div>
              {/* Button */}
              <div className="ml-auto">
                <AddTaskButton />
              </div>
            </section>

            {/* Sort  & Button section */}
            <section className="border-2 border-solid border-red-600 flex items-center">
              <p className="text-[#7A7F83] font-medium text-[16px]">Sort By</p>
              {/* Button */}
              <div className="ml-auto border-red-800 relative">
                <SortingButton onSetToggle={toggle} />
                <SortingDropDown onHidden={hidden} />
              </div>
            </section>

            {/* Task list section*/}
            <section></section>
          </div>
        </div>
      </main>
    </>
  );
};

export default Main;
