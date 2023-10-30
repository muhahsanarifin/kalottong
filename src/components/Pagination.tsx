import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";

export const Paginations: React.FC<{ [key: string]: any }> = ({
  setPage,
  page,
}) => {
  const ongoingTasks = useSelector(
    (state: RootState) => state.tasks.retriveOngoingTasks.data
  );

  return (
    <div className="flex flex-col items-center w-fit ml-auto md:gap-y-1">
      {/* Help text */}
      <span className="text-[12px] text-gray-700">
        Showing <span className="font-semibold">{page}</span> to{" "}
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
            page <= 1 && "cursor-not-allowed"
          }`}
          onClick={() => setPage(page - 1)}
          disabled={page <= 1}
        >
          Prev
        </button>
        <button
          className={`px-4 py-2 text-xs font-medium text-white bg-red-orange border-0 border-l border-red-orange-dark rounded-r-full hover:bg-red-orange-dark ${
            page >= ongoingTasks?.totalPages && "cursor-not-allowed"
          }`}
          onClick={() => setPage(page + 1)}
          disabled={page >= ongoingTasks?.totalPages}
        >
          Next
        </button>
      </div>
    </div>
  );
};
