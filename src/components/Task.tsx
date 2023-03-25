import React from "react";
import { useToggle } from "usehooks-ts";
import {
  TaskDropDownButton,
  AddSubTaskButton,
  DeleteSubTaskButton,
  MoreButton,
} from "./Button";

const Task = () => {
  const [hidden, toggle] = useToggle();

  return (
    <>
      <ul>
        {/* Task */}
        <li className="flex flex-col gap-y-4">
          <div className="flex">
            <div>
              <input
                type="checkbox"
                name=""
                id=""
                className="rounded-[100%] w-[1.75rem] h-[1.75rem] text-red-orange focus:ring-red-orange"
              />
            </div>
            <div className="mx-4">
              <span className="flex gap-x-2 items-center">
                <h1>Product Desain</h1>
                <p className="text-[12px] text-red-orange font-[500] py-[8px] px-[12px] rounded-[50px] bg-[#FFEBD3]">
                  Hari ini
                </p>
                <MoreButton />
              </span>
              <p className="text-[14px] text-[#7A7F83]">
                Tugas untuk desain team
              </p>
            </div>
            <div className="ml-auto">
              <TaskDropDownButton onSetToggle={toggle} onHidden={hidden} />
            </div>
          </div>
          <div
            className={
              hidden ? "hidden" : "p-2 bg-[#F5F5F5] flex flex-col gap-y-2"
            }
          >
            <SubTask />
          </div>
        </li>
      </ul>
    </>
  );
};

const SubTask = () => {
  return (
    <>
      <div className="flex items-center">
        <h1 className="font-[500] text-cyan-blue">Subtask</h1>
        <AddSubTaskButton />
      </div>
      <ul className="flex flex-col gap-y-2">
        {/* Subtask */}
        <li className="flex items-center">
          <div className="flex items-center gap-x-2">
            <input
              type="checkbox"
              name=""
              id=""
              className="rounded-[100%] w-[1.75rem] h-[1.75rem] text-red-orange focus:ring-red-orange"
            />
            <label htmlFor="" className="text-[400] text-cyan-blue">
              Design Review
            </label>
          </div>
          <div className=" ml-auto">
            <DeleteSubTaskButton />
          </div>
        </li>
      </ul>
    </>
  );
};

export { Task, SubTask };