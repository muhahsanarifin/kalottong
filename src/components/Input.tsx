import Image from "next/image";
import Menu from "../assets/icons/menu.png"
import Calender from "../assets/icons/calendar.png"

const InputTask: React.FC = () => {
  return (
    <>
      <div className="flex gap-x-4">
        <div>
          <input
            type="checkbox"
            name=""
            id=""
            className="rounded-[100%] w-[1.75rem] h-[1.75rem] text-red-orange focus:ring-red-orange"
            disabled
          />
        </div>
        <div className="flex flex-col w-[100%]">
          <input
            type="text"
            name="task"
            id="task"
            placeholder="Masukan nama tugas"
            className="border-none focus:ring-0 w-[100%] bg-transparent pl-0"
          />
          <span className="flex items-center">
            <Image
              src={Menu}
              width={1000}
              height={1000}
              alt="menu"
              className="w-[20px] h-[20px]"
            />
            <input
              type="text"
              name="description"
              id="description"
              placeholder="Deskripsi Tugas (Optional)"
              className="border-none focus:ring-0 text-[14px] w-[100%] bg-transparent"
            />
          </span>
          <span className="flex items-center">
            <Image
              src={Calender}
              width={1000}
              height={1000}
              alt="calender"
              className="w-[20px] h-[20px]"
            />
            <input
              type="text"
              name="date"
              id="date"
              placeholder="Tanggal & Waktu"
              className="border-none focus:ring-0 text-[14px] w-[100%] bg-transparent"
            />
          </span>
        </div>
      </div>
    </>
  );
};

export { InputTask };
