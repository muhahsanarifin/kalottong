import React from "react";
import { useDispatch, useSelector } from "react-redux";
import Image from "next/image";
import { Icon } from "@iconify/react";
import Link from "next/link";
import { Button } from "flowbite-react";

import { subtasksAction } from "@/redux/reducers/subtasks";
import { AppDispatch, RootState } from "@/redux/store";

import {
  AddTaskIcon,
  AddSubTaskIcon,
  ArrowDownOrange,
  ArrowDown,
  ArrowUpGray,
  ArrowRight,
  MoreIcon,
} from "../utils/assest";

import {
  SortingButtonProps,
  TaskDropDownButtonProps,
  AddTaskDropDownButtonProps,
  DoneTaskButtonProps,
  BackButtonProps,
  RegulerButtonProps,
  SaveInputProfileButtonProps,
  SaveImageProfileButtonProps,
} from "@/utils/types/buttonType";
import { SpinnerLoader } from "@/components/Feed";
import cookie from "@/utils/storage/cookies";

const AddTaskButton: React.FC<AddTaskDropDownButtonProps> = ({
  setToggle,
  init,
  disabled,
}) => {
  return (
    <>
      <button
        className={`flex bg-red-orange py-[12px] px-[15px] gap-x-2 rounded-[60px] hover:bg-red-orange-dark md:text-xs md:py-4 md:items-center md:w-[10rem] md:justify-center sm:w-fit ${
          disabled && "cursor-not-allowed opacity-75"
        }`}
        onClick={setToggle}
        disabled={disabled}
      >
        {init === "Tambah Tugas" && (
          <>
            <Image
              src={AddTaskIcon}
              width={500}
              height={500}
              alt={init}
              className="w-[1.5rem] h-[1.5rem] md:w-[1.2rem] md:h-[1.2rem]"
            />
            <p className="text-white border-solid sm:hidden">{init}</p>
          </>
        )}
        {init === "Rename Task" && (
          <>
            <p className="text-white border-solid sm:hidden">{init}</p>
          </>
        )}
      </button>
    </>
  );
};

const SortingButton: React.FC<SortingButtonProps> = ({
  setClickInside,
  hiddenInside,
  hiddenOutside,
  onTitleSort,
}) => {
  const handleClickInside = () => {
    setClickInside(false);
  };
  const retriveOngoingTasks = useSelector(
    (state: RootState) => state.tasks.retriveOngoingTasks
  );

  return (
    <>
      <button
        className={`flex gap-x-2 items-center py-[6px] px-[14px] rounded-[50px] border-solid border-2 ${
          hiddenInside || hiddenOutside
            ? "border-red-orange"
            : "border-[#CCCED2]"
        } ${
          !retriveOngoingTasks.data.data?.length &&
          "cursor-not-allowed opacity-75"
        }`}
        onClick={handleClickInside}
        disabled={!retriveOngoingTasks.data.data?.length}
      >
        <p
          className={
            hiddenInside || hiddenOutside
              ? "font-[600] text-red-orange"
              : "font-[600] text-[#CCCED2]"
          }
        >
          {onTitleSort}
        </p>
        <Image
          src={hiddenInside || hiddenOutside ? ArrowDownOrange : ArrowUpGray}
          alt="Sort"
          width={500}
          height={500}
          className="w-[12px] h-[10px]"
        />
      </button>
    </>
  );
};

const TaskDropDownButton: React.FC<TaskDropDownButtonProps> = ({
  setToggle,
  onHidden,
  onFocus,
}) => {
  return (
    <>
      <button onClick={setToggle}>
        <Image
          src={onFocus || onHidden ? ArrowDown : ArrowUpGray}
          alt="Task dropdown button"
          width={500}
          height={500}
          className="w-[12px] h-[10px]"
        />
      </button>
    </>
  );
};

const AddSubTaskButton: React.FC<{ setToggle?: any }> = ({ setToggle }) => {
  return (
    <>
      <button
        className="flex items-center gap-x-2 border-solid border-2 border-[#CCCED2] py-[6px] px-[10px] rounded-[50px] ml-auto md:px-[6px]"
        onClick={setToggle}
      >
        <Image
          src={AddSubTaskIcon}
          alt="Add subtask"
          className="w-[22px] h-[22px]"
          width={500}
          height={500}
        />
        <p className="md:hidden">Tambah</p>
      </button>
    </>
  );
};

const DeleteSubTaskButton: React.FC<{ onSubtaskId: number }> = ({
  onSubtaskId,
}) => {
  const useAppDispatch: () => AppDispatch = useDispatch;
  const dispatch = useAppDispatch();
  const handleDeleteSubtask = () => {
    const cbFulfilled = () => {
      dispatch(subtasksAction.resetDeleteSubtasks());
    };

    const cbFinally = () => {
      dispatch(
        subtasksAction.retriveSubtasksThunk({
          accessToken: cookie.get({ key: "token" }),
        })
      );
    };

    const id = onSubtaskId.toString();
    dispatch(
      subtasksAction.deleteSubtasksThunk({
        id,
        cbFulfilled,
        cbFinally,
        accessToken: cookie.get({ key: "token" }),
      })
    );
  };

  return (
    <>
      <button onClick={handleDeleteSubtask}>
        <Icon
          icon="ic:outline-delete"
          className="w-[18px] h-[18px] text-[#CCCED2] hover:text-red-orange"
        />
      </button>
    </>
  );
};

const MoreButton: React.FC<{ setShow: any }> = ({ setShow }) => {
  return (
    <>
      <button
        onClick={setShow}
        className="hover:bg-[#CCCED2] p-1 rounded-[100%]"
      >
        <Image
          src={MoreIcon}
          alt="more"
          width={500}
          height={500}
          className="w-[24px] h-[24px] md:w-[14px] md:h-[14px]"
        />
      </button>
    </>
  );
};

const DoneTaskButton: React.FC<DoneTaskButtonProps> = ({
  setToggle,
  onHidden,
}) => {
  return (
    <>
      <button onClick={setToggle}>
        <Image
          src={!onHidden ? ArrowRight : ArrowUpGray}
          alt="Right arrow"
          width={500}
          height={500}
          className={"w-[12px] h-[10px]"}
        />
      </button>
    </>
  );
};

const BackButton: React.FC<BackButtonProps> = ({ onRoute, title }) => {
  return (
    <>
      <Link
        href={onRoute}
        className="bg-white hover:bg-gray-100 border border-gray-200 focus:ring-4 focus:outline-none focus:ring-gray-100 font-medium px-3 py-2 text-xs rounded-lg"
      >
        Back to {title}
      </Link>
    </>
  );
};

const RegulerButton: React.FC<RegulerButtonProps> = ({
  setAction,
  title,
  onDisable,
}) => {
  return (
    <>
      <Button
        pill={true}
        className={`bg-red-orange hover:bg-red-orange-dark ${
          onDisable && "cursor-not-allowed disabled:hover:bg-red-orange-dark"
        }`}
        onClick={setAction}
        disabled={onDisable}
      >
        {title}
      </Button>
    </>
  );
};

const SaveInputProfileButton: React.FC<SaveInputProfileButtonProps> = ({
  setAction,
  onDisable,
  onLoading,
}) => {
  return (
    <>
      <button
        type="button"
        className={`mx-auto text-white bg-red-orange hover:bg-red-orange-dark focus:ring-4 focus:outline-none focus:ring-red-orange-light font-medium rounded-lg text-xs py-2.5 px-5 inline-flex items-center justify-center min-h-[47.6px] w-full ${
          onDisable && "hidden"
        }`}
        onClick={setAction}
        disabled={onDisable}
      >
        {onLoading ? (
          <SpinnerLoader onClassName={"fill-red-orange"} />
        ) : (
          <>
            <span className="flex">
              <Icon icon="ri:save-line" className="w-4 h-4 mr-2 -ml-1" />
              Save
            </span>
          </>
        )}
      </button>
    </>
  );
};

const SaveImageProfileButton: React.FC<SaveImageProfileButtonProps> = ({
  setAction,
  onDisable,
  onLoading,
}) => {
  return (
    <>
      <button
        onClick={setAction}
        className={`text-white bg-red-orange hover:bg-red-orange-dark focus:ring-4 focus:outline-none focus:ring-red-orange-light font-medium rounded-lg w-[100%] py-3 flex justify-center items-center ${
          onDisable && "hidden"
        }`}
      >
        {onLoading ? (
          <SpinnerLoader onClassName={"fill-red-orange"} />
        ) : (
          <>
            <Icon icon="ri:save-line" className="w-4 h-4 mr-2 -ml-1" />
            Save
          </>
        )}
      </button>
    </>
  );
};

const SaveInputTaskButton: React.FC<{
  setClick: () => void;
  disabled: boolean;
}> = ({ setClick, disabled }) => {
  return (
    <button
      className={`rounded-[100%] flex items-center justify-center h-fit w-fit p-[6px] text-red-orange bg-red-orange focus:ring-red-orange-dark ${
        disabled && "cursor-not-allowed opacity-75"
      }`}
      onClick={setClick}
      disabled={disabled}
    >
      <Icon icon="lucide:pen" color="white" width="16" height="16" />
    </button>
  );
};

export {
  AddTaskButton,
  SortingButton,
  TaskDropDownButton,
  AddSubTaskButton,
  DeleteSubTaskButton,
  MoreButton,
  DoneTaskButton,
  BackButton,
  RegulerButton,
  SaveInputProfileButton,
  SaveImageProfileButton,
  AddTaskButton as RenameButton,
  SaveInputTaskButton,
};
