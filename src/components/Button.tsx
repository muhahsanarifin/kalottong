import React from "react";
import { useDispatch } from "react-redux";
import Image from "next/image";
import { Icon } from "@iconify/react";
import Link from "next/link";
import { Button } from "flowbite-react";

import { subtasksAction } from "@/redux/reducers/subtasks";
import { AppDispatch } from "@/redux/store";

import AddTaskIcon from "../assets/icons/plus.png";
import AddSubTaskIcon from "../assets/icons/plus-red-orange.png";
import ArrowDownOrange from "../assets/icons/arrow-down-2-red-orange.png";
import ArrowDown from "../assets/icons/arrow-down-2.png";
import ArrowUpGray from "../assets/icons/arrow-up-2-gray.png";
import ArrowRight from "../assets/icons/arrow-right-2.png";
import MoreIcon from "../assets/icons/more-vertical.png";
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

const AddTaskButton: React.FC<AddTaskDropDownButtonProps> = ({
  onSetToggle,
  init,
}) => {
  return (
    <>
      <button
        className="flex bg-red-orange py-[12px] px-[15px] gap-x-2 rounded-[60px] hover:bg-red-orange-dark"
        onClick={onSetToggle}
      >
        {init === "Tambah Tugas" && (
          <>
            <Image
              src={AddTaskIcon}
              width={500}
              height={500}
              alt={init}
              className="w-[1.5rem] h-[1.5rem]"
            />
            <p className="text-white border-solid">{init}</p>
          </>
        )}
        {init === "Rename Task" && (
          <>
            <p className="text-white border-solid">{init}</p>
          </>
        )}
      </button>
    </>
  );
};

const SortingButton: React.FC<SortingButtonProps> = ({
  onSetClickInside,
  onHiddenInside,
  onHiddenOutside,
  onTitleSort,
}) => {
  const handleClickInside = () => {
    onSetClickInside(false);
  };

  return (
    <>
      <button
        className={`flex gap-x-2 items-center py-[6px] px-[14px] rounded-[50px]  border-solid border-2 ${
          onHiddenInside || onHiddenOutside
            ? "border-red-orange"
            : "border-[#CCCED2]"
        }`}
        onClick={handleClickInside}
      >
        <p
          className={
            onHiddenInside || onHiddenOutside
              ? "font-[600] text-red-orange"
              : "font-[600] text-[#CCCED2]"
          }
        >
          {onTitleSort ? onTitleSort : "Filter"}
        </p>
        <Image
          src={
            onHiddenInside || onHiddenOutside ? ArrowDownOrange : ArrowUpGray
          }
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
  onSetToggle,
  onHidden,
  onFocus,
}) => {
  // console.log("Other Hidden:", onHidden)
  return (
    <>
      <button onClick={onSetToggle}>
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

const AddSubTaskButton: React.FC<{ onSetToggle?: any }> = ({ onSetToggle }) => {
  return (
    <>
      <button
        className="flex items-center gap-x-2 border-solid border-2 border-[#CCCED2] py-[6px] px-[10px] rounded-[50px] ml-auto"
        onClick={onSetToggle}
      >
        <Image
          src={AddSubTaskIcon}
          alt="Add subtask"
          className="w-[22px] h-[22px]"
          width={500}
          height={500}
        />
        <p>Tambah</p>
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
    const cbPending = () => {
      console.info("Pending");
    };

    const cbFulfilled = () => {
      console.info("Fulfilled");
      dispatch(subtasksAction.resetDeleteSubtasks());
    };

    const cbFinally = () => {
      window.location.reload();
      console.info("Finally");
    };

    const id = onSubtaskId.toString();
    dispatch(
      subtasksAction.deleteSubtasksThunk({
        id,
        cbPending,
        cbFulfilled,
        cbFinally,
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

const MoreButton: React.FC<{ onSetShow: any }> = ({ onSetShow }) => {
  return (
    <>
      <button
        onClick={onSetShow}
        className="hover:bg-[#CCCED2] p-1 rounded-[100%]"
      >
        <Image
          src={MoreIcon}
          alt="more"
          width={500}
          height={500}
          className="w-[24px] h-[24px]"
        />
      </button>
    </>
  );
};

const DoneTaskButton: React.FC<DoneTaskButtonProps> = ({
  onSetToggle,
  onHidden,
}) => {
  return (
    <>
      <button onClick={onSetToggle}>
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

const ResetButton: React.FC<{ title: any; onsetReset: any }> = ({
  title,
  onsetReset,
}) => {
  return (
    <>
      <button
        className="bg-red-orange rounded-[60px] text-white hover:bg-red-orange-dark py-1 px-4 text-sm"
        onClick={onsetReset}
      >
        {title}
      </button>
    </>
  );
};

const RegulerButton: React.FC<RegulerButtonProps> = ({
  onSetAction,
  title,
  onDisable,
}) => {
  return (
    <>
      <Button
        pill={true}
        className={`bg-red-orange hover:bg-red-orange-dark ${
          onDisable && "cursor-not-allowed"
        }`}
        onClick={onSetAction}
        disabled={onDisable}
      >
        {title}
      </Button>
    </>
  );
};

const SaveInputProfileButton: React.FC<SaveInputProfileButtonProps> = ({
  onSetAction,
  onDisable,
  onLoading,
}) => {
  return (
    <>
      <button
        type="button"
        className={`text-white bg-red-orange hover:bg-red-orange-dark focus:ring-4 focus:outline-none focus:ring-red-orange-light font-medium rounded-lg text-xs px-5 py-2.5 text-center inline-flex items-center h-[38.6px] ${
          onDisable && "hidden"
        }`}
        onClick={onSetAction}
        disabled={onDisable}
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

const SaveImageProfileButton: React.FC<SaveImageProfileButtonProps> = ({
  onSetAction,
  onDisable,
  onLoading,
}) => {
  return (
    <>
      <button
        onClick={onSetAction}
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
  ResetButton,
};
