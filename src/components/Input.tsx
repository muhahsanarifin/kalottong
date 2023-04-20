import Image from "next/image";
import Menu from "../assets/icons/menu.png";
import Calender from "../assets/icons/calendar.png";

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

const InputProfile: React.FC<{
  onType: string;
  onTitle: string;
  setOnChange?: any;
  onSetValue?: any;
  onId?: string;
  onHtmlFor?: string;
  onDisable: boolean
}> = ({ onType, onTitle, onId, onHtmlFor, setOnChange, onSetValue, onDisable }) => {
  return (
    <>
      <input
        type={onType}
        id={onId}
        className={`block px-2.5 pb-2.5 pt-4 w-full text-sm text-gray-900 bg-transparent rounded-lg border-1 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer ${
          onDisable && "cursor-not-allowed"
        }`}
        placeholder=" "
        onChange={setOnChange}
        value={onSetValue}
        disabled={onDisable}
      />
      <label
        htmlFor={onHtmlFor}
        className="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white dark:bg-gray-900 px-2 peer-focus:px-2 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 left-1"
      >
        {onTitle}
      </label>
    </>
  );
};

export { InputTask, InputProfile };
