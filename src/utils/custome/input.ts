import type { CustomFlowbiteTheme } from "flowbite-react";

export const customDatePickerTheme: CustomFlowbiteTheme["datepicker"] = {
  root: {
    base: "relative",
    input: {
      base: "",
      addon: "",
      field: {
        base: "flex items-center",
        icon: {
          base: "hidden",
          svg: "",
        },
        input: {
          base: "!px-3",
          colors: {
            gray: "bg-[#F5F5F5] border-none outline-none text-[#6B7280]",
          },
        },
      },
    },
  },
  popup: {
    root: {
      base: "absolute top-10 z-50 block pt-2",
      inline: "relative top-0 z-auto",
      inner: "inline-block rounded-lg bg-white p-4 shadow-lg dark:bg-gray-700",
    },
    header: {
      base: "",
      title:
        "px-2 py-3 text-center font-semibold text-gray-900 dark:text-white",
      selectors: {
        base: "flex justify-between mb-2",
        button: {
          base: "text-sm rounded-lg text-gray-900 dark:text-white bg-white dark:bg-gray-700 font-semibold py-2.5 px-5 hover:bg-[#FFEBD3] dark:hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-gray-200 view-switch",
          prev: "",
          next: "",
          view: "",
        },
      },
    },
    view: {
      base: "p-1",
    },
    footer: {
      base: "flex mt-2 space-x-2",
      button: {
        base: "w-full rounded-lg px-5 py-2 text-center text-sm font-medium focus:ring-4 focus:ring-[#FFEBD3]",
        today:
          "bg-[#FF5F26] text-white hover:bg-[#FF5F26] dark:bg-cyan-600 dark:hover:bg-cyan-700",
        clear:
          "border border-gray-300 bg-white text-gray-900 hover:bg-gray-100 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:hover:bg-gray-600",
      },
    },
  },
  views: {
    days: {
      header: {
        base: "grid grid-cols-7 mb-1",
        title:
          "dow h-6 text-center text-sm font-medium leading-6 text-gray-500 dark:text-gray-400",
      },
      items: {
        base: "grid w-64 grid-cols-7",
        item: {
          base: "block flex-1 cursor-pointer rounded-lg border-0 text-center text-sm font-semibold leading-9 text-gray-900 hover:bg-[#FF5F26] hover:text-white dark:text-white dark:hover:bg-gray-600 ",
          selected: "bg-[#FF5F26] text-white hover:bg-[#FF5F26]",
          disabled: "text-gray-500",
        },
      },
    },
    months: {
      items: {
        base: "grid w-64 grid-cols-4",
        item: {
          base: "block flex-1 cursor-pointer rounded-lg border-0 text-center text-sm font-semibold leading-9 text-gray-900 hover:bg-[#FF5F26] hover:text-white dark:text-white dark:hover:bg-gray-600",
          selected: "bg-[#FF5F26] text-white hover:bg-[#FF5F26]",
          disabled: "text-gray-500",
        },
      },
    },
    years: {
      items: {
        base: "grid w-64 grid-cols-4",
        item: {
          base: "block flex-1 cursor-pointer rounded-lg border-0 text-center text-sm font-semibold leading-9 hover:bg-[#FF5F26] hover:text-white dark:text-white dark:hover:bg-gray-600 text-gray-900",
          selected: "bg-[#FF5F26] text-white hover:bg-[#FF5F26]",
          disabled: "text-gray-500",
        },
      },
    },
    decades: {
      items: {
        base: "grid w-64 grid-cols-4",
        item: {
          base: "block flex-1 cursor-pointer rounded-lg border-0 text-center text-sm font-semibold leading-9  hover:bg-[#FF5F26] hover:text-white dark:text-white dark:hover:bg-gray-600 text-gray-900",
          selected: "bg-[#FF5F26] text-white hover:bg-[#FF5F26]",
          disabled: "text-gray-500",
        },
      },
    },
  },
};

export const customeCheckboxTheme: CustomFlowbiteTheme["checkbox"] = {
  root: {
    base: "rounded-sm !text-red-orange focus:border-none focus:ring-offset-red-none focus:ring-0 focus:outline-red-orange ",
  },
};

export const customeInputTextTheme: CustomFlowbiteTheme["textInput"] = {
  base: "",
  field: {
    base: "",
    input: {
      base: "focus:border-none focus:ring-0 bg-gray-50 border border-gray-300 focus:outline-red-orange w-full",
    },
  },
};

export const customeRadioTheme: CustomFlowbiteTheme["radio"] = {
  root: {
    base: "h-4 w-4 border border-gray-300 focus:ring-2 focus:ring-red-orange text-red-orange-dark",
  },
};