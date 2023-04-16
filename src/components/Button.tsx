import Image from "next/image";
import AddTaskIcon from "../assets/icons/plus.png";
import AddSubTaskIcon from "../assets/icons/plus-red-orange.png";
import ArrowDownOrange from "../assets/icons/arrow-down-2-red-orange.png";
import ArrowDown from "../assets/icons/arrow-down-2.png";
import ArrowUpGray from "../assets/icons/arrow-up-2-gray.png";
import ArrowRight from "../assets/icons/arrow-right-2.png";
import TrashIcon from "../assets/icons/trash.png";
import MoreIcon from "../assets/icons/more-vertical.png";
import {
  ButtonProps,
  TaskDropDownButtonProps,
  AddTaskDropDownButtonProps,
  DoneTaskButtonProps,
  BackButtonProps,
  RegulerButtonProps,
} from "@/utils/types/buttonType";
import Link from "next/link";
import { Button } from "flowbite-react";

const AddTaskButton: React.FC<AddTaskDropDownButtonProps> = ({
  onSetToggle,
}) => {
  return (
    <>
      <button
        className="flex bg-red-orange py-[12px] px-[15px] gap-x-2 rounded-[60px]"
        onClick={onSetToggle}
      >
        <Image
          src={AddTaskIcon}
          width={1000}
          height={1000}
          alt="Add task"
          className="w-[1.5rem] h-[1.5rem]"
        />
        <p className="text-white border-solid">Tambah Tugas</p>
      </button>
    </>
  );
};

const SortingButton: React.FC<ButtonProps> = ({ onSetToggle, onHidden }) => {
  return (
    <>
      <button
        className={
          onHidden
            ? "flex gap-x-2 items-center py-[10px] px-[14px] rounded-[50px] border-[#CCCED2] border-solid border-2"
            : "flex gap-x-2 items-center py-[10px] px-[14px] rounded-[50px] border-red-orange border-solid border-2"
        }
        onClick={onSetToggle}
      >
        <p
          className={
            onHidden
              ? "font-[600] text-[#CCCED2]"
              : "font-[600] text-red-orange"
          }
        >
          By Tanggal
        </p>
        <Image
          src={onHidden ? ArrowUpGray : ArrowDownOrange}
          alt="Sort"
          width={1000}
          height={1000}
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
          width={1000}
          height={1000}
          className="w-[12px] h-[10px]"
        />
      </button>
    </>
  );
};

const AddSubTaskButton: React.FC = () => {
  return (
    <>
      <button className="flex items-center gap-x-2 border-solid border-2 border-[#CCCED2] py-[6px] px-[10px] rounded-[50px] ml-auto">
        <Image
          src={AddSubTaskIcon}
          alt="Add subtask"
          className="w-[22px] h-[22px]"
          width={1000}
          height={1000}
        />
        <p>Tambah</p>
      </button>
    </>
  );
};

const DeleteSubTaskButton: React.FC = () => {
  return (
    <>
      <button>
        <Image
          src={TrashIcon}
          alt="Delete subtask"
          width={1000}
          height={1000}
          className="w-[18px] h-[18px]"
        />
      </button>
    </>
  );
};

const MoreButton: React.FC = () => {
  return (
    <>
      <button>
        <Image
          src={MoreIcon}
          alt="more"
          width={1000}
          height={1000}
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
          width={1000}
          height={1000}
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
  onAction,
  onsSetAction,
  title,
}) => {
  return (
    <>
      <Button
        pill={true}
        className="bg-red-orange hover:bg-red-orange-dark"
        onClick={onsSetAction}
      >
        {title}
      </Button>
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
};
