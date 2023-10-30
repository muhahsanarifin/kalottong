import React, { useState } from "react";
import { RootState } from "@/redux/store";
import { useDispatch, useSelector } from "react-redux";
import { Tooltip } from "flowbite-react";

import cookie from "@/utils/storage/cookies";
import { fiturAction } from "@/redux/reducers/fitur";
import type { AppDispatch } from "@/redux/store";
import { usersAction } from "@/redux/reducers/users";

import { InputTask, InputEditTask } from "./Input";
import { OngoingTasks, DoneTasks } from "./Task";
import { SortingDropDown } from "./Forms";
import {
  AddTaskButton,
  DoneTaskButton,
  SortingButton,
  RenameButton,
} from "./Button";
import { WelcomeMessage } from "./Feed";
import { Paginations } from "./Pagination";

const Main = () => {
  const [hiddenClickInside, setHiddenClickInside] = useState<boolean>(true);
  const [hiddenClickOutside, setHiddenClickOutside] = useState<boolean>(true);
  const [hiddenDoneTask, setHiddenDoneTask] = useState(false);
  const [sort, setSort] = useState({
    id: null,
    name: "",
    value: "",
  });
  const [page, setPage] = useState<number>(1);
  const [status] = useState<string>("ongoing");
  const [limit] = useState<number>(5);
  const useAppDispatch: () => AppDispatch = useDispatch;
  const dispatch = useAppDispatch();
  const doneTasks = useSelector(
    (state: RootState) => state.tasks.retriveDoneTasks.data.data
  );
  const dataToRename = useSelector(
    (state: RootState) => state.confirm.taskDataToRename
  );
  const retriveOngoingTasks = useSelector(
    (state: RootState) => state.tasks.retriveOngoingTasks
  );
  const ati = useSelector((state: RootState) => state.fitur.ati);
  const retriveProfile = useSelector(
    (state: RootState) => state.user.retriveProfile
  );
  const profile = {
    image: retriveProfile.data?.image,
    firstname: retriveProfile.data?.firstname,
    lastname: retriveProfile.data?.lastname,
    notelp: retriveProfile.data?.notelp,
  };

  return (
    <>
      <main className="flex flex-col lg:py-5">
        <div
          className={`${
            cookie.get({ key: "token" }) &&
            "shadow-[0_16px_90px_rgba(19,7,52,0.08)] rounded-[12px] w-[80%] p-[2.5rem] mx-auto"
          } flex flex-col min-h-[100vh] lg:w-full md:p-0`}
        >
          {cookie.get({ key: "token" }) ? (
            <>
              <section className="flex items-center md:pt-3 md:px-3">
                <div className="flex flex-col">
                  <p className="text-red-orange font-medium text-[16px]">
                    MY TASK
                  </p>
                  <h1 className="text-[24px] font-medium text-cyan-blue">
                    To Do List
                  </h1>
                  <p className="text-[#7A7F83] font-normal text-[16px] md:text-[14px]">
                    Buat list tugas harian saya
                  </p>
                </div>
                <div className="ml-auto">
                  {Object.values(profile).includes(null) ? (
                    <Tooltip
                      animation="duration-1000"
                      content="Silakan, lengkapi profile anda terlebih dahulu."
                      style="light"
                    >
                      <AddTaskButton
                        init="Tambah Tugas"
                        disabled={Object.values(profile).includes(null)}
                      />
                    </Tooltip>
                  ) : dataToRename?.isFulfilled ? (
                    <RenameButton init="Rename Task" />
                  ) : (
                    <AddTaskButton
                      setToggle={() =>
                        ati?.isOpen
                          ? dispatch(fiturAction.ati(false))
                          : dispatch(fiturAction.ati(true))
                      }
                      init="Tambah Tugas"
                    />
                  )}
                </div>
              </section>
              <section className="md:p-3">
                <div className="flex items-center">
                  <p className="text-[#7A7F83] font-medium text-[16px]">
                    Sort By
                  </p>
                  <div className="ml-auto relative">
                    <SortingButton
                      setClickInside={setHiddenClickInside}
                      hiddenInside={hiddenClickInside}
                      hiddenOutside={hiddenClickOutside}
                      onTitleSort={sort?.name ? sort?.name : "Filter"}
                    />
                    <SortingDropDown
                      hiddenInside={hiddenClickInside}
                      hiddenOutside={hiddenClickOutside}
                      setSort={setSort}
                      setClickOutside={setHiddenClickOutside}
                      setClickInside={setHiddenClickInside}
                      limit={limit}
                      sort={sort}
                      page={page}
                      status={status}
                    />
                  </div>
                </div>
              </section>
              {ati?.isOpen && (
                <section className="p-2 my-2 bg-[#F5F5F5]">
                  <InputTask sort={sort} limit={limit} page={page} />
                </section>
              )}
              {dataToRename?.isFulfilled && (
                <section className="p-2 my-2 bg-[#F5F5F5]">
                  <InputEditTask
                    onBody={dataToRename?.data}
                    isFulfilled={dataToRename?.isFulfilled}
                    sort={sort}
                    limit={limit}
                    page={page}
                  />
                </section>
              )}
              <section>
                <div className="p-2 flex flex-col gap-y-2 md:p-3">
                  <OngoingTasks
                    sort={sort}
                    setPage={setPage}
                    page={page}
                    status={status}
                    limit={limit}
                  />
                  {retriveOngoingTasks.data.data?.length ? (
                    <Paginations setPage={setPage} page={page} />
                  ) : null}
                </div>
                <div className="border-t-2 border-t-solid border-t-[#CCCED2] pt-2 md:p-3">
                  <div className="flex items-center gap-x-2">
                    <DoneTaskButton
                      setToggle={() => setHiddenDoneTask(!hiddenDoneTask)}
                      onHidden={hiddenDoneTask}
                    />
                    <span className="flex items-center gap-x-2">
                      <p className="text-[#7A7F83] font-[500]">Terselesaikan</p>
                      <p className="text-[#7A7F83] font-[500]">
                        {doneTasks?.length
                          ? `${doneTasks?.length} Tugas`
                          : "0 Tugas"}
                      </p>
                    </span>
                  </div>
                </div>
                <div className={!hiddenDoneTask ? "hidden" : "p-2 md:p-3"}>
                  <DoneTasks
                    sort={sort}
                    page={page}
                    status={status}
                    limit={limit}
                  />
                </div>
              </section>
            </>
          ) : (
            <WelcomeMessage />
          )}
        </div>
      </main>
    </>
  );
};

export default Main;
