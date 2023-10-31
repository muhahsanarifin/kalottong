import React, { useState, useRef } from "react";
import { useDispatch } from "react-redux";
import { taskAction } from "@/redux/reducers/tasks";
import { fiturAction } from "@/redux/reducers/fitur";
import type { AppDispatch } from "@/redux/store";
import Image from "next/image";
import { Datepicker } from "flowbite-react";
import { Icon } from "@iconify/react";

import { confirmAction } from "@/redux/reducers/confirm";
import { subtasksAction } from "@/redux/reducers/subtasks";
import cookie from "../utils/storage/cookies";
import { customDatePickerTheme } from "../utils/custome/input";
import { formatViewInputTaskDate } from "../utils/date";
import { SaveInputTaskButton } from "./Button";

import { Menu, Calender, AddTaskIcon } from "../utils/assets";

const InputTask: React.FC<{
  onBody?: any;
  isFulfilled?: boolean;
  sort?: any;
  limit?: number;
  page?: number;
}> = ({ onBody, isFulfilled, sort, limit, page }) => {
  const useAppDispatch: () => AppDispatch = useDispatch;
  const dispatch = useAppDispatch();
  const [input, setInput] = useState({
    title: "",
    description: "",
  });
  const [date, setDate] = useState({
    date_and_time: "",
    date_and_time_view: "",
  });
  const [error, setError] = useState("");

  // Section Add Task
  const handleInputAddTask = (e: any) => {
    const { name, value } = e.target;
    setInput({ ...input, [name]: value });
  };

  const handleInputAddTaskForDate = (value: any) => {
    setDate({
      date_and_time: new Date(value).toISOString(),
      date_and_time_view: formatViewInputTaskDate(
        new Date(value).toISOString()
      ),
    });
  };

  const handleEnterAddTask = (e: any) => {
    if (e.key === "Enter") {
      if (input.title === "") {
        return setError("Task name must be filled!");
      }
      if (date.date_and_time === "") {
        return setError("Date must be filled!");
      }

      const body = {
        ...input,
        date_and_time: date.date_and_time,
      };

      const cbFulfilled = () => {
        setInput({
          title: "",
          description: "",
        });

        setDate({ date_and_time: "", date_and_time_view: "" });

        dispatch(
          taskAction.retriveOngoingTasksThunk({
            params: `?status=ongoing&sort=${sort.value}&limit=${limit}&page=${page}`,
            accessToken: cookie.get({ key: "token" }),
          })
        );
      };

      dispatch(
        taskAction.createTasksThunk({
          body,
          cbFulfilled,
          accessToken: cookie.get({ key: "token" }),
        })
      );
    }
  };

  const handleSaveAddTask = async () => {
    const body = {
      ...input,
      date_and_time: date?.date_and_time,
    };

    const cbFulfilled = () => {
      setInput({
        title: "",
        description: "",
      });

      setDate({ date_and_time: "", date_and_time_view: "" });

      dispatch(
        taskAction.retriveOngoingTasksThunk({
          params: `?status=ongoing&sort=${sort.value}&limit=${limit}&page=${page}`,
          accessToken: cookie.get({ key: "token" }),
        })
      );
    };

    dispatch(
      taskAction.createTasksThunk({
        body,
        cbFulfilled,
        accessToken: cookie.get({ key: "token" }),
      })
    );
  };

  // Section Rename Task
  const [inputRenameTask, setInputRenameTask] = useState({
    title: "" || onBody?.title,
    description: "" || onBody?.description,
  });
  const [updateDate, setUpdateDate] = useState<any>({
    date_and_time: "" || onBody?.date_and_time,
    date_and_time_view: "" || formatViewInputTaskDate(onBody?.date_and_time),
  });
  const [status] = useState({
    status_id: onBody?.status === "ongoing" ? 1 : 2,
  });

  const handleInputRenameTask = (e: any) => {
    const { name, value } = e.target;
    setInputRenameTask({ ...inputRenameTask, [name]: value });
  };

  const handleInputRenameTaskForDate = (value: any) => {
    setUpdateDate({
      date_and_time: new Date(value).toISOString(),
      date_and_time_view: formatViewInputTaskDate(
        new Date(value).toISOString()
      ),
    });
  };

  const handleEnterRenameTask = (e: any) => {
    if (e.key === "Enter") {
      if (inputRenameTask.title === "") {
        return setError("Task name must be filled!");
      }

      if (updateDate.date_and_time === "") {
        return setError("Date must be filled!");
      }

      const body = {
        ...inputRenameTask,
        date_and_time: updateDate.date_and_time,
        ...status,
      };

      const cbFulfilled = () => {
        dispatch(
          taskAction.retriveOngoingTasksThunk({
            params: `?status=ongoing&sort=${sort.value}&limit=${limit}&page=${page}`,
            accessToken: cookie.get({ key: "token" }),
          })
        );

        dispatch(confirmAction.resetDataToRename());

        dispatch(
          fiturAction.rodto({
            taskId: null,
            isShow: false,
          })
        );
      };

      dispatch(
        taskAction.editTasksThunk({
          body,
          id: onBody.id,
          cbFulfilled,
          accessToken: cookie.get({ key: "token" }),
        })
      );
    }
  };

  const handleSaveEditTask = async () => {
    const body = {
      ...inputRenameTask,
      date_and_time: updateDate?.date_and_time,
      ...status,
    };

    const cbFulfilled = () => {
      dispatch(
        taskAction.retriveOngoingTasksThunk({
          params: `?status=ongoing&sort=${sort.value}&limit=${limit}&page=${page}`,
          accessToken: cookie.get({ key: "token" }),
        })
      );

      dispatch(confirmAction.resetDataToRename());

      dispatch(
        fiturAction.rodto({
          taskId: null,
          isShow: false,
        })
      );
    };

    dispatch(
      taskAction.editTasksThunk({
        body,
        id: onBody?.id,
        cbFulfilled,
        accessToken: cookie.get({ key: "token" }),
      })
    );
  };

  const handleCancelRenameTask = () => {
    dispatch(confirmAction.resetDataToRename());
    dispatch(
      fiturAction.rodto({
        taskId: null,
        isShow: false,
      })
    );
  };

  return (
    <>
      <div className="flex gap-x-4">
        {isFulfilled ? (
          <>
            <SaveInputTaskButton
              setClick={handleSaveEditTask}
              disabled={!inputRenameTask.title || !updateDate.date_and_time}
            />
            <div className="flex flex-col w-[100%]">
              <span className="flex">
                <input
                  type="text"
                  name="title"
                  id="title"
                  placeholder="Masukan nama tugas"
                  className="border-none focus:ring-0 w-[100%] bg-transparent pl-0"
                  onChange={(e) => handleInputRenameTask(e)}
                  onKeyDown={handleEnterRenameTask}
                  value={inputRenameTask.title}
                />
                <button onClick={handleCancelRenameTask}>
                  <Icon
                    icon="material-symbols:cancel-outline-rounded"
                    width="32"
                    height="32"
                    className="text-[#7A7F83] hover:text-red-orange"
                  />
                </button>
              </span>
              <span className="flex items-center">
                <label htmlFor="description">
                  <Image
                    src={Menu}
                    width={500}
                    height={500}
                    alt="menu"
                    className="w-[20px] h-[20px]"
                  />
                </label>
                <input
                  type="text"
                  name="description"
                  id="description"
                  placeholder="Deskripsi Tugas (Optional)"
                  className="border-none focus:ring-0 text-[14px] w-[100%] bg-transparent"
                  onChange={(e) => {
                    handleInputRenameTask(e);
                  }}
                  onKeyDown={handleEnterRenameTask}
                  value={inputRenameTask.description}
                />
              </span>
              <span className="flex items-center">
                <label htmlFor="updated_at">
                  <Image
                    src={Calender}
                    width={500}
                    height={500}
                    alt="calender"
                    className="w-[20px] h-[20px]"
                  />
                </label>
                <Datepicker
                  placeholder="Tanggal & Waktu"
                  theme={customDatePickerTheme}
                  name="updated_at"
                  id="updated_at"
                  color="gray"
                  language="en-GB"
                  onSelectedDateChanged={handleInputRenameTaskForDate}
                  onKeyDown={handleEnterRenameTask}
                  value={updateDate.date_and_time_view}
                />
              </span>
            </div>
          </>
        ) : (
          <>
            <SaveInputTaskButton
              setClick={handleSaveAddTask}
              disabled={!input.title || !date.date_and_time}
            />
            <div className="flex flex-col w-[100%]">
              <input
                type="text"
                name="title"
                id="title"
                placeholder="Masukan nama tugas"
                className="border-none focus:ring-0 w-[100%] bg-transparent pl-0"
                onChange={handleInputAddTask}
                onKeyDown={handleEnterAddTask}
                value={input.title}
              />
              <span className="flex items-center">
                <label htmlFor="description">
                  <Image
                    src={Menu}
                    width={500}
                    height={500}
                    alt="menu"
                    className="w-[20px] h-[20px]"
                  />
                </label>
                <input
                  type="text"
                  name="description"
                  id="description"
                  placeholder="Deskripsi Tugas (Optional)"
                  className="border-none focus:ring-0 text-[14px] w-[100%] bg-transparent"
                  onChange={handleInputAddTask}
                  onKeyDown={handleEnterAddTask}
                  value={input.description}
                />
              </span>
              <span className="flex items-center">
                <label htmlFor="created_at">
                  <Image
                    src={Calender}
                    width={500}
                    height={500}
                    alt="calender"
                    className="w-[20px] h-[20px]"
                  />
                </label>
                <Datepicker
                  placeholder="Tanggal & Waktu"
                  theme={customDatePickerTheme}
                  name="created_at"
                  id="created_at"
                  color="gray"
                  language="en-GB"
                  onSelectedDateChanged={handleInputAddTaskForDate}
                  onKeyDown={handleEnterAddTask}
                  value={date.date_and_time_view}
                />
              </span>
            </div>
          </>
        )}
      </div>
    </>
  );
};

const InputProfile: React.FC<{
  onType: string;
  onTitle: string;
  onName: string;
  onId?: string;
  setOnChange?: any;
  value?: any;
  onHtmlFor?: string;
  onDisable: boolean;
}> = ({
  onType,
  onTitle,
  onId,
  onName,
  onHtmlFor,
  setOnChange,
  value,
  onDisable,
}) => {
  return (
    <>
      <input
        type={onType}
        name={onName}
        id={onId}
        className={`block px-2.5 pb-2.5 pt-4 w-full text-sm text-gray-900 bg-transparent rounded-lg border-1 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-red-orange peer ${
          onDisable && "cursor-not-allowed"
        }`}
        placeholder=" "
        onChange={setOnChange}
        value={value}
        disabled={onDisable}
      />
      <label
        htmlFor={onHtmlFor}
        className="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white dark:bg-gray-900 px-2 peer-focus:px-2 peer-focus:text-red-orange peer-focus:dark:text-red-orange-dark peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 left-1"
      >
        {onTitle}
      </label>
    </>
  );
};

const InputSubTasks: React.FC<{ onIdTask: any }> = ({ onIdTask }) => {
  const useAppDispatch: () => AppDispatch = useDispatch;
  const dispatch = useAppDispatch();

  const [input, setInput] = useState({
    tasks_id: onIdTask,
    status_id: 1,
    title: "",
  });

  const HandleInput = (e: any) => {
    const { value, name } = e.target;
    setInput({ ...input, [name]: value });
  };

  const HandleEnter = (e: any) => {
    if (e.key === "Enter") {
      if (input.title) {
        const body = input;

        const cbFulfilled = () => {
          dispatch(
            subtasksAction.retriveSubtasksThunk({
              accessToken: cookie.get({ key: "token" }),
            })
          );
        };

        return dispatch(
          subtasksAction.createSubtasksThunk({
            body,
            cbFulfilled,
            accessToken: cookie.get({ key: "token" }),
          })
        );
      } else {
        console.info("Empty input!");
      }
    }
  };

  return (
    <>
      <div className="flex items-center">
        <div className="flex">
          <input
            type="checkbox"
            className="rounded-[100%] w-[1.75rem] h-[1.75rem] text-red-orange focus:ring-red-orange"
            disabled
          />
        </div>
        <input
          type="text"
          name="title"
          id="title"
          placeholder="Masukan nama sub-tugas."
          className="bg-transparent focus:ring-0 w-full border-none text-[14px]"
          onChange={HandleInput}
          onKeyDown={HandleEnter}
        />
      </div>
    </>
  );
};

export { InputTask, InputProfile, InputTask as InputEditTask, InputSubTasks };
