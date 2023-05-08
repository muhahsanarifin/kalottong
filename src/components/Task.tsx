import React, { useState, useEffect } from "react";
import { DateTime } from "luxon";
import { useDispatch, useSelector } from "react-redux";

import type { RootState, AppDispatch } from "@/redux/store";
import { taskAction } from "@/redux/reducers/tasks";

import { formatDate } from "@/utils/date";

import { TaskDropDownButton, MoreButton } from "./Button";
import { TaskSkeletonLoader } from "./Feed";
import { OptionTaskModal } from "./Modal";
import { SubTask } from "./Subtask";

export const OngoingTasks: React.FC<{ [key: string]: any }> = ({
  onPage,
  onSort,
}) => {
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
  const [status, setStatus] = useState("ongoing");
  const [limit, setLimit] = useState<number>(5);

  useEffect(() => {
    const params = `?status=${status}&sort=${onSort}&limit=${limit}&page=${onPage}`;

    const cbPending = () => {
      dispatch(taskAction.resetCreateTask());
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
  }, [dispatch, onSort, status, limit, onPage]);

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
                      onIdTask={task.id}
                      onGoingTaskData={task}
                    />
                    <span className="flex gap-x-2 items-center ">
                      <label htmlFor={task.id}>
                        <h1>{task.title}</h1>
                      </label>
                      <p className="text-[12px] text-red-orange font-[500] py-[8px] px-[12px] rounded-[50px] bg-[#FFEBD3]">
                        {task.updated_at
                          ? formatDate(DateTime.fromISO(task.updated_at))
                          : formatDate(DateTime.fromISO(task.created_at))}
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
                  <SubTask idTasks={task.id} statusTasks={task.status}/>
                </div>
              </li>
            </>
          ))}
      </ul>
    </>
  );
};

export const DoneTasks: React.FC = () => {
  const useAppDispatch: () => AppDispatch = useDispatch;
  const dispatch = useAppDispatch();
  const doneTasks = useSelector(
    (state: RootState) => state.tasks.retriveDoneTasks.data.data
  );
  const [focus, setFocus] = useState<number>();
  const [hidden, setHidden] = useState(true);
  const [pendingDoneTasks, setPendingDoneTasks] = useState(false);

  useEffect(() => {
    const params = `?status=done`;

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
                  <SubTask idTasks={task.id} statusTasks={task.status} />
                </div>
              </li>
            </>
          ))}
      </ul>
    </>
  );
};
