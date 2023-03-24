import Image from "next/image";
import AddTaskIcon from "../assets/icons/plus.png";
import ArrowDownOrange from "../assets/icons/arrow-down-2-red-orange.png";
import { ButtonProps } from "@/utils/types/button";

const AddTaskButton = () => {
  return (
    <>
      <button className="flex bg-red-orange py-[12px] px-[15px] gap-x-2 rounded-[60px]">
        <Image
          src={AddTaskIcon}
          width={1000}
          height={1000}
          alt="Tambah tugas"
          className="w-[1.5rem] h-[1.5rem]"
        />
        <p className="text-white border-solid">Tambah Tugas</p>
      </button>
    </>
  );
};

const SortingButton = ({onSetToggle} : ButtonProps) => {
  return (
    <>
      <button
        className="flex gap-x-2 items-center py-[10px] px-[14px] rounded-[50px] border-red-orange border-solid border-2"
        onClick={onSetToggle}
      >
        <p className="font-[600] text-red-orange">By Tanggal</p>
        <Image
          src={ArrowDownOrange}
          alt="By Tanggal"
          width={1000}
          height={1000}
          className="w-[12px] h-[10px]"
        />
      </button>
    </>
  );
};

export { AddTaskButton, SortingButton };
