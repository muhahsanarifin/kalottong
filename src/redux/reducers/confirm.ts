import {
  // createAction,
  // createReducer,
  createSlice,
} from "@reduxjs/toolkit";
import { ConfirmState } from "@/utils/types/reduxType";

const initialState: ConfirmState = {
  taskDataToRename: { data: null, isFulfilled: false },
};

// Create Action with createAction() function
// const addDataToRename = createAction(
//   "confirm/task/rename",
//   function prepare(body: any) {
//     return {
//       payload: body,
//     };
//   }
// );

// Create reducer with createReducer() function, It can use with createAction() if developer does not use createSlice().
// export const confirmReducer = createReducer(
//   initialState.taskDataToRename,
//   (builder) => {
//     builder.addCase(
//       addDataToRename,
//       (state, action: PayloadAction<any>) => {
//         return {
//           taskDateToRename: state = action.payload,
//         };
//       }
//     );
//   }
// );

// export const confirmAction = { addDataToRename, }
// export default confirmReducer

export const confirmSlice = createSlice({
  name: "confirm",
  initialState,
  reducers: {
    addDataToRename: (prevState, action) => {
      return {
        ...prevState,
        taskDataToRename: { data: action.payload, isFulfilled: true },
      };
    },
    resetDateToRename: (prevState) => {
      return {
        ...prevState,
        taskDataToRename: { data: null, isFulfilled: false },
      };
    }
  },
});

export const confirmAction = {
  ...confirmSlice.actions,
};
export default confirmSlice.reducer;
