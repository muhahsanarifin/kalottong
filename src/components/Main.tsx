import React, { useState, useEffect } from "react";
import { useToggle } from "usehooks-ts";
import { AddTaskButton, DoneTaskButton, SortingButton } from "./Button";
import { SortingDropDown } from "./Forms";
import { Task } from "./Task";
import { InputTask } from "./Input";
import { WelcomeMessage } from "./Feed";
import { getCookie } from "cookies-next";

const Main = () => {
  const [hidden, toggle] = useToggle();
  const [hiddenAddTask, setHiddenAddTask] = useState(false);
  const [hiddenDoneTask, setHiddenDoneTask] = useState(false);
  const [accessToken, setAccessToken] = useState<any>("");

  useEffect(() => {
    const token = getCookie("token");
    setAccessToken(token);
  }, []);

  return (
    <>
      <main className="min-h-screen flex flex-col">
        <div className="shadow-[0_16px_90px_rgba(19,7,52,0.08)] rounded-[12px] w-[80%] min-h-[100%] mx-auto p-[2.5rem]">
          <div className="h-[100%] flex flex-col gap-y-2">
            {!accessToken ? (
              <WelcomeMessage />
            ) : (
              <>
                <section className="flex items-center">
                  <div className="flex flex-col">
                    <p className="text-red-orange font-medium text-[16px]">
                      MY TASK
                    </p>
                    <h1 className="text-[24px] font-medium text-cyan-blue">
                      To Do List
                    </h1>
                    <p className="text-[#7A7F83] font-normal text-[16px]">
                      Buat list tugas harian saya
                    </p>
                  </div>
                  <div className="ml-auto">
                    <AddTaskButton
                      onSetToggle={() => setHiddenAddTask(!hiddenAddTask)}
                    />
                  </div>
                </section>

                <section className="flex items-center">
                  <p className="text-[#7A7F83] font-medium text-[16px]">
                    Sort By
                  </p>
                  <div className="ml-auto relative">
                    <SortingButton onSetToggle={toggle} onHidden={hidden} />
                    <SortingDropDown onHidden={hidden} />
                  </div>
                </section>

                <section
                  className={!hiddenAddTask ? "hidden" : "p-2 bg-[#F5F5F5]"}
                >
                  <InputTask />
                </section>

                <section>
                  <div className="p-2">
                    <Task tasks={new Array(5)} />
                  </div>
                  <div className="border-t-2 border-t-solid border-t-[#CCCED2] pt-2">
                    <div className="flex items-center gap-x-2">
                      <DoneTaskButton
                        onSetToggle={() => setHiddenDoneTask(!hiddenDoneTask)}
                        onHidden={hiddenDoneTask}
                      />
                      <span className="flex items-center gap-x-2">
                        <p className="text-[#7A7F83] font-[500]">
                          Terselesaikan
                        </p>
                        <p className="text-[#7A7F83] font-[500]">(3 Tugas)</p>
                      </span>
                    </div>
                  </div>
                  <div className={!hiddenDoneTask ? "hidden" : "p-2"}>
                    <Task tasks={new Array(3)} />
                  </div>
                </section>
              </>
            )}
          </div>
        </div>
      </main>
    </>
  );
};

export default Main;
