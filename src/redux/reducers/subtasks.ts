import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { SubtasksState } from "@/utils/types/reduxType";
import {
  retriveSubtasks,
  createSubtasks,
  editSubtasks,
  deleteSubtasks,
} from "@/utils/api/subtasks";

const initialState: SubtasksState = {
  retriveSubtasks: [],
  createSubtasks: [],
  editSubtasks: [],
  deleteSubtasks: [],
  isLoading: false,
  isFulfilled: false,
  isRejected: false,
  err: null,
};

const retriveSubtasksThunk = createAsyncThunk(
  "subtasks",
  async (accessToken: any, params: any, id?: any) => {
    try {
      const response = await retriveSubtasks(accessToken, params, id);
      // console.log("Response retrive data subtasks:", response);
      return response.data;
    } catch (error) {
      console.error(error);
      return error;
    }
  }
);

const createSubtasksThunk = createAsyncThunk(
  "subtasks/create",
  async (accessToken: any, body: any) => {
    try {
      const response = await createSubtasks(accessToken, body);
      // console.log("Response create subtasks:", response);
      return response.data;
    } catch (error) {
      console.error(error);
      return error;
    }
  }
);

const editSubtasksThunk = createAsyncThunk(
  "subtasks/edit",
  async (accessToken: any, body: any, id?: any) => {
    try {
      const response = await editSubtasks(accessToken, body, id);
      // console.log("Response edit subtasks:", response);
      return response.data;
    } catch (error) {
      console.error(error);
      return error;
    }
  }
);

const deleteSubtasksThunk = createAsyncThunk(
  "subtasks/delete",
  async (accessToken: any, id?: any) => {
    try {
      const response = await deleteSubtasks(accessToken, id);
      // console.log("Response delete subtasks:", response);
      return response.data;
    } catch (error) {
      console.error(error);
      return error;
    }
  }
);

const subtasksSlice = createSlice({
  name: "subtasks",
  initialState,
  reducers: {
    reset: (prevState) => {
      return {
        ...prevState,
        retriveSubtasks: [],
        createSubtasks: [],
        editSubtasks: [],
        deleteSubtasks: [],
      };
    },
  },
  extraReducers: (builder) => {
    builder.addCase(retriveSubtasksThunk.pending, (prevState) => {
      return {
        ...prevState,
        isLoading: true,
        isFufilled: false,
        isRejected: false,
      };
    });
    builder.addCase(
      retriveSubtasksThunk.fulfilled,
      (prevState, action: PayloadAction<any>) => {
        return {
          ...prevState,
          isLoading: true,
          isFulfilled: true,
          isRejected: false,
          retriveTasks: action.payload,
        };
      }
    );
    builder.addCase(
      retriveSubtasksThunk.rejected,
      (prevState, action: PayloadAction<any>) => {
        return {
          ...prevState,
          isLoading: false,
          isFulfilled: false,
          isRejected: true,
          err: action.payload,
        };
      }
    );
    builder.addCase(createSubtasksThunk.pending, (prevState) => {
      return {
        ...prevState,
        isLoading: true,
        isFufilled: false,
        isRejected: false,
      };
    });
    builder.addCase(
      createSubtasksThunk.fulfilled,
      (prevState, action: PayloadAction<any>) => {
        return {
          ...prevState,
          isLoading: true,
          isFulfilled: true,
          isRejected: false,
          createSubtasks: action.payload,
        };
      }
    );
    builder.addCase(
      createSubtasksThunk.rejected,
      (prevState, action: PayloadAction<any>) => {
        return {
          ...prevState,
          isLoading: false,
          isFulfilled: false,
          isRejected: true,
          err: action.payload,
        };
      }
    );
    builder.addCase(editSubtasksThunk.pending, (prevState) => {
      return {
        ...prevState,
        isLoading: true,
        isFufilled: false,
        isRejected: false,
      };
    });
    builder.addCase(
      editSubtasksThunk.fulfilled,
      (prevState, action: PayloadAction<any>) => {
        return {
          ...prevState,
          isLoading: true,
          isFulfilled: true,
          isRejected: false,
          editSubtasks: action.payload,
        };
      }
    );
    builder.addCase(
      editSubtasksThunk.rejected,
      (prevState, action: PayloadAction<any>) => {
        return {
          ...prevState,
          isLoading: false,
          isFulfilled: false,
          isRejected: true,
          err: action.payload,
        };
      }
    );
    builder.addCase(deleteSubtasksThunk.pending, (prevState) => {
      return {
        ...prevState,
        isLoading: true,
        isFufilled: false,
        isRejected: false,
      };
    });
    builder.addCase(
      deleteSubtasksThunk.fulfilled,
      (prevState, action: PayloadAction<any>) => {
        return {
          ...prevState,
          isLoading: true,
          isFulfilled: true,
          isRejected: false,
          deleteSubtasks: action.payload,
        };
      }
    );
    builder.addCase(
      deleteSubtasksThunk.rejected,
      (prevState, action: PayloadAction<any>) => {
        return {
          ...prevState,
          isLoading: false,
          isFulfilled: false,
          isRejected: true,
          err: action.payload,
        };
      }
    );
  },
});

export const subtasksAction = {
  ...subtasksSlice.actions,
  retriveSubtasksThunk,
  createSubtasksThunk,
  editSubtasksThunk,
  deleteSubtasksThunk,
};

export default subtasksSlice.reducer;
