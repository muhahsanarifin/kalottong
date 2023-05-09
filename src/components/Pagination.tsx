import React from "react";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";

// import { Pagination } from "flowbite-react";

export const Paginations: React.FC<{ [key: string]: any }> = ({
  onSetPage,
  onPage,
}) => {
  const ongoingTasks = useSelector(
    (state: RootState) => state.tasks.retriveOngoingTasks.data
  );

  return (
    <>
      {/* It is not able to re-edit style the component of flowbite react.*/}
      {/* <div className="flex items-center justify-end text-center">
        <Pagination
          currentPage={page}
          layout="table"
          totalPages={100}
          onPageChange={onPageChange}
        />
      </div> */}
      <div className="flex flex-col items-center w-fit ml-auto md:gap-y-1">
        {/* Help text */}
        <span className="text-[12px] text-gray-700">
          Showing <span className="font-semibold">{onPage}</span> to{" "}
          <span className="font-semibold text-gray-900">
            {ongoingTasks?.totalPages}
          </span>{" "}
          of{" "}
          <span className="font-semibold text-gray-900">
            {ongoingTasks?.totalData}
          </span>{" "}
          Tasks
        </span>
        {/* Buttons */}
        <div className="inline-flex mt-2 xs:mt-0">
          <button
            className={`px-4 py-2 text-xs font-medium text-white bg-red-orange border-0 border-l border-red-orange-dark rounded-l-full hover:bg-red-orange-dark ${
              onPage <= 1 && "cursor-not-allowed"
            }`}
            onClick={() => onSetPage(onPage - 1)}
            disabled={onPage <= 1}
          >
            Prev
          </button>
          <button
            className={`px-4 py-2 text-xs font-medium text-white bg-red-orange border-0 border-l border-red-orange-dark rounded-r-full hover:bg-red-orange-dark ${
              onPage >= ongoingTasks?.totalPages && "cursor-not-allowed"
            }`}
            onClick={() => onSetPage(onPage + 1)}
            disabled={onPage >= ongoingTasks?.totalPages}
          >
            Next
          </button>
        </div>
      </div>
    </>
  );
};
