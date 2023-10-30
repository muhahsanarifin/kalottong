import React, { useState, useEffect } from "react";
import { DateTime } from "luxon";
import { useDispatch, useSelector } from "react-redux";

import type { RootState, AppDispatch } from "@/redux/store";
import { taskAction } from "@/redux/reducers/tasks";
import { fiturAction } from "@/redux/reducers/fitur";
import { subtasksAction } from "@/redux/reducers/subtasks";
import cookie from "@/utils/storage/cookies";
import { formatTaskDate } from "@/utils/date";

import { TaskDropDownButton, MoreButton } from "./Button";
import { TaskSkeletonLoader, NotFound } from "./Feed";
import { OptionTaskModal } from "./Modal";
import { SubTask } from "./Subtask";

export const OngoingTasks: React.FC<{ [key: string]: any }> = ({
  page,
  sort,
  status,
  limit,
  setPage
}) => {
  const useAppDispatch: () => AppDispatch = useDispatch;
  const dispatch = useAppDispatch();
  const retriveOngoingTasks = useSelector(
    (state: RootState) => state.tasks.retriveOngoingTasks
  );
  const rodto = useSelector((state: RootState) => state.fitur.rodto);
  const [focus, setFocus] = useState<number>();
  const [hidden, setHidden] = useState(true);

  useEffect(() => {
    dispatch(
      taskAction.retriveOngoingTasksThunk({
        params: `?status=${status}&sort=${sort.value}&limit=${limit}&page=${page}`,
        accessToken: cookie.get({ key: "token" }),
      })
    );

    dispatch(
      subtasksAction.retriveSubtasksThunk({
        accessToken: cookie.get({ key: "token" }),
      })
    );
  }, [dispatch, sort, status, limit, page]);

  const handleCheckbox = async (e: any, task: any) => {
    const id = e.target.id;

    const cbFulfilled = () => {
      dispatch(
        taskAction.retriveOngoingTasksThunk({
          params: `?status=${status}&sort=${sort.value}&limit=${limit}&page=${page}`,
          accessToken: cookie.get({ key: "token" }),
        })
      );

      dispatch(
        taskAction.retriveDoneTasksThunk({
          params: `?status=done`,
          accessToken: cookie.get({ key: "token" }),
        })
      );
    };

    dispatch(
      taskAction.editStatusTasksThunk({
        body: {
          title: task.title,
          description: task.description,
          status_id: e.target.checked ? 2 : 1,
          date_and_time: task.date_and_time,
        },
        id,
        cbFulfilled,
        accessToken: cookie.get({ key: "token" }),
      })
    );
  };

  return (
    <>
      <ul className="flex flex-col gap-y-4">
        {retriveOngoingTasks?.isLoading ? (
          <TaskSkeletonLoader onTasks={new Array(5)} />
        ) : (
          <>
            {retriveOngoingTasks.data.data?.length ? (
              retriveOngoingTasks.data.data?.map((task: any) => (
                <>
                  <li className="flex flex-col gap-y-4" key={task.id}>
                    <div className="flex">
                      <div>
                        <input
                          type="checkbox"
                          name="task"
                          id={task.id}
                          className="rounded-[100%] w-[1.75rem] h-[1.75rem] text-red-orange focus:ring-red-orange"
                          onChange={(e) => {
                            handleCheckbox(e, task);
                          }}
                        />
                      </div>
                      <div className="mx-4 relative">
                        <OptionTaskModal
                          onShow={rodto?.isShow}
                          onFocus={rodto?.taskId !== task.id}
                          setClose={() =>
                            dispatch(
                              fiturAction.rodto({
                                taskId: null,
                                isShow: false,
                              })
                            )
                          }
                          onIdTask={task.id}
                          onGoingTaskData={task}
                          setPage={setPage}
                          page={page}
                          sort={sort}
                          status={status}
                          limit={limit}
                        />
                        <span className="flex gap-x-2 items-center ">
                          <h1 className="text-[14px] md:text-[12px] md:w-fit">
                            {task.title}
                          </h1>
                          <p className="text-[12px] text-red-orange font-[500] py-[8px] px-[12px] rounded-[50px] bg-[#FFEBD3] md:text-[8px]">
                            {formatTaskDate(
                              DateTime.fromISO(task.date_and_time)
                            )}
                          </p>
                          <MoreButton
                            setShow={() => {
                              dispatch(
                                fiturAction.rodto({
                                  taskId: task.id,
                                  isShow: true,
                                })
                              ),
                                dispatch(fiturAction.ati(false));
                            }}
                          />
                        </span>
                        <p className="text-[14px] text-[#7A7F83] md:text-[12px]">
                          {task.description}
                        </p>
                      </div>
                      <div className="ml-auto">
                        <TaskDropDownButton
                          setToggle={() => {
                            setFocus(task.id);
                            setHidden(!hidden);
                          }}
                          onHidden={hidden}
                          onFocus={focus !== task.id}
                        />
                      </div>
                    </div>
                    <div
                      className={
                        focus !== task.id || hidden
                          ? "hidden"
                          : "p-2 bg-[#F5F5F5] flex flex-col gap-y-2"
                      }
                    >
                      <SubTask idTasks={task.id} statusTasks={task.status} />
                    </div>
                  </li>
                </>
              ))
            ) : (
              <NotFound msg={retriveOngoingTasks?.err} />
            )}
          </>
        )}
      </ul>
    </>
  );
};

export const DoneTasks: React.FC<{ [key: string]: any }> = ({
  page,
  sort,
  status,
  limit,
}) => {
  const useAppDispatch: () => AppDispatch = useDispatch;
  const dispatch = useAppDispatch();
  const retriveDoneTasks = useSelector(
    (state: RootState) => state.tasks.retriveDoneTasks
  );
  const [focus, setFocus] = useState<number>();
  const [hidden, setHidden] = useState(true);

  useEffect(() => {
    dispatch(
      taskAction.retriveDoneTasksThunk({
        params: `?status=done`,
        accessToken: cookie.get({ key: "token" }),
      })
    );
  }, [dispatch]);

  const handleCheckbox = async (e: any, task: any) => {
    const id = e.target.id;
    const body = {
      title: task.title,
      description: task.description,
      status_id: !e.target.checked ? 1 : 2,
      date_and_time: task.date_and_time,
    };
    const cbFulfilled = () => {
      dispatch(
        taskAction.retriveDoneTasksThunk({
          params: `?status=done`,
          accessToken: cookie.get({ key: "token" }),
        })
      );
      dispatch(
        taskAction.retriveOngoingTasksThunk({
          params: `?status=${status}&sort=${sort.value}&limit=${limit}&page=${page}`,
          accessToken: cookie.get({ key: "token" }),
        })
      );
    };
    dispatch(
      taskAction.editStatusTasksThunk({
        body,
        id,
        cbFulfilled,
        accessToken: cookie.get({ key: "token" }),
      })
    );
  };

  return (
    <>
      <ul className="flex flex-col gap-y-4">
        {retriveDoneTasks?.isLoading ? (
          <TaskSkeletonLoader onTasks={new Array(5)} />
        ) : (
          <>
            {retriveDoneTasks.data.data?.length ? (
              retriveDoneTasks?.data?.data?.map((task: any) => (
                <>
                  <li className="flex flex-col gap-y-4" key={task.id}>
                    <div className="flex">
                      <div>
                        <input
                          type="checkbox"
                          name="task"
                          id={task.id}
                          className="rounded-[100%] w-[1.75rem] h-[1.75rem] text-red-orange focus:ring-red-orange"
                          onChange={(e) => {
                            handleCheckbox(e, task);
                          }}
                          defaultChecked
                        />
                      </div>
                      <div className="mx-4">
                        <label
                          htmlFor={task.id}
                          className="flex gap-x-2 items-center"
                        >
                          <h1 className="line-through text-[#293038] text-[14px]  md:text-[12px]">
                            {task.title}
                          </h1>
                        </label>
                        <p className="text-[14px] text-[#7A7F83] md:text-[12px]">
                          {task.description}
                        </p>
                      </div>
                      <div className="ml-auto">
                        <TaskDropDownButton
                          setToggle={() => {
                            setFocus(task.id);
                            setHidden(!hidden);
                          }}
                          onHidden={hidden}
                          onFocus={focus !== task.id}
                        />
                      </div>
                    </div>
                    <div
                      className={
                        focus !== task.id || hidden
                          ? "hidden"
                          : "p-2 bg-[#F5F5F5] flex flex-col gap-y-2"
                      }
                    >
                      <SubTask idTasks={task.id} statusTasks={task.status} />
                    </div>
                  </li>
                </>
              ))
            ) : (
              <NotFound msg={retriveDoneTasks?.err} />
            )}
          </>
        )}
      </ul>
    </>
  );
};
