import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState, AppDispatch } from "@/redux/store";

import { subtasksAction } from "@/redux/reducers/subtasks";
import { SubtasksProps } from "@/utils/types/taskType";

import { AddSubTaskButton, DeleteSubTaskButton } from "./Button";
import { InputSubTasks } from "../components/Input";
import cookie from "../utils/storage/cookies";

export const SubTask: React.FC<SubtasksProps> = ({ idTasks, statusTasks }) => {
  const useAppDispatch: () => AppDispatch = useDispatch;
  const dispatch = useAppDispatch();
  const subTasks = useSelector(
    (state: RootState) => state.subtasks.retriveSubtasks.data.data
  );
  const [toggleAddSubTask, setToggleAddSubTask] = useState(false);

  const handleCheckboxSubtasks = (e: any, subtask: any) => {
    const body = {
      title: subtask.title,
      status_id: e.target.checked ? 2 : 1,
    };
    const id = e.target.id;

    const cbFulfilled = () => {
      dispatch(
        subtasksAction.retriveSubtasksThunk({
          accessToken: cookie.get({ key: "token" }),
        })
      );
    };

    dispatch(
      subtasksAction.editStatusSubtasksThunk({
        body,
        id,
        cbFulfilled,
        accessToken: cookie.get({ key: "token" }),
      })
    );
  };

  return (
    <>
      <div className="flex flex-col">
        <div className="flex items-center">
          <h1 className="font-[500] text-cyan-blue">Subtask</h1>
          {statusTasks === "ongoing" && (
            <AddSubTaskButton
              setToggle={() => setToggleAddSubTask(!toggleAddSubTask)}
            />
          )}
        </div>
        {toggleAddSubTask && <InputSubTasks onIdTask={idTasks} />}
      </div>
      <ul className="flex flex-col gap-y-2">
        {subTasks?.map(
          (subtask: any) =>
            subtask.tasks_id === idTasks && (
              <>
                <li className="flex items-center" key={subtask.id}>
                  <div className="flex items-center gap-x-2">
                    <input
                      type="checkbox"
                      name="subtask"
                      id={subtask.id}
                      className="rounded-[100%] w-[1.75rem] h-[1.75rem] text-red-orange focus:ring-red-orange"
                      onChange={(e) => {
                        handleCheckboxSubtasks(e, subtask);
                      }}
                      defaultChecked={subtask.status_id === 1 ? false : true}
                    />
                    <label
                      htmlFor={subtask.id}
                      className={`text-[400] text-cyan-blue text-[14px] md:text-[12px] ${
                        subtask.status_id === 2 && "line-through"
                      }`}
                    >
                      {subtask.title}
                    </label>
                  </div>
                  <div className=" ml-auto">
                    <DeleteSubTaskButton onSubtaskId={subtask.id} />
                  </div>
                </li>
              </>
            )
        )}
      </ul>
    </>
  );
};
