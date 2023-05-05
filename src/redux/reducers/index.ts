import { combineReducers } from "@reduxjs/toolkit";
import userSlice from "./users";
import tasksSlice from "./tasks";
import subtasksSlice from "./subtasks";
import confirmSlice from "./confirm";

export default combineReducers({
  user: userSlice,
  tasks: tasksSlice,
  subtasks: subtasksSlice,
  confirm: confirmSlice,
});
