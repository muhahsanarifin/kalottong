import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState, AppDispatch } from "@/redux/store";

import { subtasksAction } from "@/redux/reducers/subtasks";
import { SubtasksProps } from "@/utils/types/taskType";

import { AddSubTaskButton, DeleteSubTaskButton } from "./Button";

export const SubTask: React.FC<SubtasksProps> = ({ idTasks, statusTasks }) => {
  const useAppDispatch: () => AppDispatch = useDispatch;
  const dispatch = useAppDispatch();
  const subTasks = useSelector(
    (state: RootState) => state.subtasks.retriveSubtasks.data.data
  );

  useEffect(() => {
    const cbPending = () => {
      console.info("Pending");
    };

    const cbFulfilled = () => {
      console.info("Fulfilled");
    };

    const cbFinally = () => {
      console.info("Finally");
    };

    dispatch(
      subtasksAction.retriveSubtasksThunk({ cbPending, cbFulfilled, cbFinally })
    );
  }, [dispatch]);

  const handleCheckboxSubtasks = (e: any, title: string) => {
    console.info(e.target.checked);
    // console.log(id)

    const body = {
      title: title,
      status_id: e.target.checked ? 2 : 1,
    };

    const id = e.target.id;

    const cbPending = () => {
      console.info("Pending");
    };

    const cbFulfilled = () => {
      console.info("Fulfilled");
    };

    const cbFinally = () => {
      console.info("Finally");
      window.location.reload();
    };

    dispatch(
      subtasksAction.editStatusSubtasksThunk({
        body,
        id,
        cbPending,
        cbFulfilled,
        cbFinally,
      })
    );
  };

  return (
    <>
      <div className="flex items-center">
        <h1 className="font-[500] text-cyan-blue">Subtask</h1>
        {statusTasks === "ongoing" && <AddSubTaskButton />}
      </div>
      <ul className="flex flex-col gap-y-2">
        {subTasks?.map(
          (subtask: any, idx: any) =>
            subtask.tasks_id === idTasks && (
              <>
                <li className="flex items-center" key={subtask.id}>
                  <div className="flex items-center gap-x-2">
                    <input
                      type="checkbox"
                      name="subtask"
                      id={subtask.id}
                      className="rounded-[100%] w-[1.75rem] h-[1.75rem] text-red-orange focus:ring-red-orange"
                      onClick={(e) => {
                        handleCheckboxSubtasks(e, subtask.title);
                      }}
                      checked={subtask.status_id === 1 ? false : true}
                    />
                    <label
                      htmlFor={subtask.id}
                      className={`text-[400] text-cyan-blue ${
                        subtask.status_id === 2 && "line-through"
                      }`}
                    >
                      {subtask.title}
                    </label>
                  </div>
                  <div className=" ml-auto">
                    <DeleteSubTaskButton />
                  </div>
                </li>
              </>
            )
        )}
      </ul>
    </>
  );
};
