import { combineReducers } from "@reduxjs/toolkit";
import userSlice from "./users";
import tasksSlice from "./tasks";
import subtasksSlice from "./subtasks";
import confirmSlice from "./confirm";
import fiturSlice from "./fitur";

export default combineReducers({
  user: userSlice,
  tasks: tasksSlice,
  subtasks: subtasksSlice,
  confirm: confirmSlice,
  fitur: fiturSlice,
});
