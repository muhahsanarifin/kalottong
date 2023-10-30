import { createSlice } from "@reduxjs/toolkit";
import { FitursState } from "@/utils/types/reduxType";

const initialState: FitursState = {
  // Add task input
  ati: {
    isOpen: false,
  },
  // Rename or Delete task option
  rodto: {
    taskId: null,
    isShow: false,
  },
  // Info
  info: {
    isShow: true,
  },
};

export const fiturSlice = createSlice({
  name: "fitur",
  initialState,
  reducers: {
    ati: (prevState, action) => {
      return {
        ...prevState,
        ati: {
          isOpen: action.payload,
        },
      };
    },
    rodto: (prevState, action) => {
      return {
        ...prevState,
        rodto: action.payload,
      };
    },
    info: (prevState, action) => {
      return {
        ...prevState,
        info: {
          isShow: action.payload,
        },
      };
    },
  },
});

export const fiturAction = {
  ...fiturSlice.actions,
};

export default fiturSlice.reducer;
