import { createSlice } from "@reduxjs/toolkit";
import { NotificationState } from "@/utils/types/reduxType";

const initialState: NotificationState = {
  createTaskNotification: {
    data: null,
    isFulfilled: false,
  },
  failureCreateTaskNotification: {
    data: null,
    isFulfilled: false,
  },
};

export const notificationSlice = createSlice({
  name: "notification",
  initialState,
  reducers: {
    addHistoryCreateTaskToNotification: (prevState, action) => {
      return {
        ...prevState,
        createTaskNotification: { data: action.payload, isFulfilled: true },
      };
    },
    addHistoryFailureCreateTaskToNotification: (prevState, action) => {
      return {
        ...prevState,
        failureCreateTaskNotification: {
          data: action.payload,
          isFulfilled: true,
        },
      };
    },
    resetHistoryFromCreateTaskNotification: (prevState) => {
      return {
        ...prevState,
        createTaskNotification: {
          data: null,
          isFulfilled: false,
        },
      };
    },
  },
});

export const notificationAction = {
  ...notificationSlice.actions,
};

export default notificationSlice.reducer;
