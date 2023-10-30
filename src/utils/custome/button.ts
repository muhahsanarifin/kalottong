import type { CustomFlowbiteTheme } from "flowbite-react";

export const customeRegisterButtonTheme: CustomFlowbiteTheme["button"] = {
  base: "group flex items-stretch items-center justify-center text-center font-medium relative focus:z-10 focus:outline-none h-[41.6px]",
  fullSized: "w-full",
  color: {
    redOrange:
      "bg-red-orange hover:bg-red-orange-dark focus:ring-4 focus:ring-red-orange-light text-white text-[14px]",
    redOrangeDark:
      "bg-red-orange hover:bg-red-orange-dark focus:ring-4 focus:ring-red-orange-light text-white text-[14px] disabled:hover:bg-red-orange-dark",
  },
};
