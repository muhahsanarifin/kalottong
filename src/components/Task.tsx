import React, { useState, useEffect } from "react";
import { DateTime } from "luxon";
import { useDispatch, useSelector } from "react-redux";
// import { useToggle } from "usehooks-ts";

import type { RootState, AppDispatch } from "@/redux/store";
import { taskAction } from "@/redux/reducers/tasks";
import { subtasksAction } from "@/redux/reducers/subtasks";
import { SubtasksProps } from "@/utils/types/taskType";
import { formatDate } from "@/utils/date";

import {
  TaskDropDownButton,
  AddSubTaskButton,
  DeleteSubTaskButton,
  MoreButton,
} from "./Button";
import { TaskSkeletonLoader } from "./Feed";
import { OptionTaskModal } from "./Modal";

const OngoingTasks: React.FC = () => {
  const useAppDispatch: () => AppDispatch = useDispatch;
  const dispatch = useAppDispatch();
  const ongoingTasks = useSelector(
    (state: RootState) => state.tasks.retriveOngoingTasks.data.data
  );
  const [focus, setFocus] = useState<number>();
  const [hidden, setHidden] = useState(true);
  const [pendingOngoingTasks, setPendingOngoingTasks] =
    useState<boolean>(false);
  const [showOptionTaskModal, setshowOptionTaskModal] = useState(false);

  useEffect(() => {
    const params = `status=ongoing`;

    const cbPending = () => {
      setPendingOngoingTasks(true);
    };
    const cbFulfilled = () => {
      console.info("Fulfilled");
    };

    const cbFinally = () => {
      setPendingOngoingTasks(false);
    };

    dispatch(
      taskAction.retriveOngoingTasksThunk({
        params,
        cbPending,
        cbFulfilled,
        cbFinally,
      })
    );
  }, [dispatch]);

  const handleCheckbox = (e: any, title: string, description: string) => {
    const body = {
      title: title,
      description: description,
      status_id: e.target.checked ? 2 : 1,
      updated_at: new Date().toISOString(),
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
      taskAction.editStatusTasksThunk({
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
      <ul className="flex flex-col gap-y-4">
        {pendingOngoingTasks && <TaskSkeletonLoader onTasks={new Array(5)} />}
        {!pendingOngoingTasks &&
          ongoingTasks?.map((task: any, idx: any) => (
            <>
              <li className="flex flex-col gap-y-4" key={idx}>
                <div className="flex">
                  <div>
                    <input
                      type="checkbox"
                      name="task"
                      id={task.id}
                      className="rounded-[100%] w-[1.75rem] h-[1.75rem] text-red-orange focus:ring-red-orange"
                      onClick={(e) => {
                        handleCheckbox(e, task.title, task.description);
                      }}
                    />
                  </div>
                  <div className="mx-4 relative">
                    <OptionTaskModal
                      onShow={showOptionTaskModal}
                      onFocus={focus !== task.id}
                      onSetClose={() =>
                        setshowOptionTaskModal(!showOptionTaskModal)
                      }
                    />
                    <span className="flex gap-x-2 items-center ">
                      <label htmlFor={task.id}>
                        <h1>{task.title}</h1>
                      </label>
                      <p className="text-[12px] text-red-orange font-[500] py-[8px] px-[12px] rounded-[50px] bg-[#FFEBD3]">
                        {formatDate(DateTime.fromISO(task.created_at))}
                      </p>
                      <MoreButton
                        onSetShow={() => {
                          setFocus(task.id);
                          setshowOptionTaskModal(!showOptionTaskModal);
                        }}
                      />
                    </span>
                    <p className="text-[14px] text-[#7A7F83]">
                      {task.description}
                    </p>
                  </div>
                  <div className="ml-auto">
                    <TaskDropDownButton
                      onSetToggle={() => {
                        setFocus(idx);
                        setHidden(!hidden);
                      }}
                      onHidden={hidden}
                      onFocus={focus !== idx}
                    />
                  </div>
                </div>
                <div
                  className={
                    focus !== idx || hidden
                      ? "hidden"
                      : "p-2 bg-[#F5F5F5] flex flex-col gap-y-2"
                  }
                >
                  <SubTask idTasks={task.id} />
                </div>
              </li>
            </>
          ))}
      </ul>
    </>
  );
};

const DoneTasks: React.FC = () => {
  const useAppDispatch: () => AppDispatch = useDispatch;
  const dispatch = useAppDispatch();
  const doneTasks = useSelector(
    (state: RootState) => state.tasks.retriveDoneTasks.data.data
  );
  const [focus, setFocus] = useState<number>();
  const [hidden, setHidden] = useState(true);
  const [pendingDoneTasks, setPendingDoneTasks] = useState(false);

  useEffect(() => {
    const params = `status=done`;

    const cbPending = () => {
      setPendingDoneTasks(true);
    };
    const cbFulfilled = () => {
      console.info("Fulfilled");
    };

    const cbFinally = () => {
      setPendingDoneTasks(false);
    };

    dispatch(
      taskAction.retriveDoneTasksThunk({
        params,
        cbPending,
        cbFulfilled,
        cbFinally,
      })
    );
  }, [dispatch]);

  const handleCheckbox = (e: any, title: string, description: string) => {
    const body = {
      title: title,
      description: description,
      status_id: !e.target.checked ? 1 : 2,
      updated_at: new Date().toISOString(),
    };

    const id = e.target.id;

    const cbPending = () => {
      console.info("Pending");
    };
    const cbFulfilled = () => {
      console.info("Fulfilled");
    };
    const cbFinally = () => {
      window.location.reload();
    };
    dispatch(
      taskAction.editStatusTasksThunk({
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
      <ul className="flex flex-col gap-y-4">
        {pendingDoneTasks && <TaskSkeletonLoader onTasks={new Array(5)} />}
        {!pendingDoneTasks &&
          doneTasks?.map((task: any, idx: any) => (
            <>
              <li className="flex flex-col gap-y-4" key={idx}>
                <div className="flex">
                  <div>
                    <input
                      type="checkbox"
                      name="task"
                      id={task.id}
                      className="rounded-[100%] w-[1.75rem] h-[1.75rem] text-red-orange focus:ring-red-orange"
                      onClick={(e) => {
                        handleCheckbox(e, task.title, task.description);
                      }}
                      checked
                    />
                  </div>
                  <div className="mx-4">
                    <label
                      htmlFor={task.id}
                      className="flex gap-x-2 items-center"
                    >
                      <h1 className="line-through text-[#293038]">
                        {task.title}
                      </h1>
                    </label>
                    <p className="text-[14px] text-[#7A7F83]">
                      {task.description}
                    </p>
                  </div>
                  <div className="ml-auto">
                    <TaskDropDownButton
                      onSetToggle={() => {
                        setFocus(idx);
                        setHidden(!hidden);
                      }}
                      onHidden={hidden}
                      onFocus={focus !== idx}
                    />
                  </div>
                </div>
                <div
                  className={
                    focus !== idx || hidden
                      ? "hidden"
                      : "p-2 bg-[#F5F5F5] flex flex-col gap-y-2"
                  }
                >
                  <SubTask idTasks={task.id} />
                </div>
              </li>
            </>
          ))}
      </ul>
    </>
  );
};

const SubTask: React.FC<SubtasksProps> = ({ idTasks }) => {
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
        <AddSubTaskButton />
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

export { OngoingTasks, DoneTasks, SubTask };
