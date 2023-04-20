import { combineReducers } from "@reduxjs/toolkit";
import userSlice from "./users";
import tasksSlice from "./tasks";
import subtasksSlice from "./subtasks";

export default combineReducers({
  user: userSlice,
  tasks: tasksSlice,
  subtasks: subtasksSlice,
});
