import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { TasksState } from "@/utils/types/reduxType";
import {
  retriveTasks,
  createTasks,
  editTasks,
  deleteTasks,
} from "@/utils/api/tasks";

const initialState: TasksState = {
  retriveTasks: [],
  createTasks: [],
  editTasks: [],
  deleteTasks: [],
  isLoading: false,
  isFulfilled: false,
  isRejected: false,
  err: null,
};

const retriveTasksThunk = createAsyncThunk(
  "tasks",
  async (accessToken: any, params: any) => {
    try {
      const response = await retriveTasks(accessToken, params);
      // console.log("Response retrive data taks:", response);
      return response.data;
    } catch (error) {
      console.error(error);
      return error;
    }
  }
);

const createTasksThunk = createAsyncThunk(
  "tasks/create",
  async (accessToken: any, body: any) => {
    try {
      const response = await createTasks(accessToken, body);
      // console.log("Response create taks:", response);
      return response.data;
    } catch (error) {
      console.error(error);
      return error;
    }
  }
);

const editTasksThunk = createAsyncThunk(
  "tasks/edit",
  async (accessToken: any, body: any, id?: any) => {
    try {
      const response = await editTasks(accessToken, body, id);
      // console.log("Response edit task:", response.data);
      return response.data;
    } catch (error) {
      console.error(error);
      return error;
    }
  }
);

const deleteTasksThunk = createAsyncThunk(
  "tasks/delete",
  async (accessToken: any, id?: any) => {
    try {
      const response = await deleteTasks(accessToken, id);
      // console.log("Response delete task:", response.data);
      return response.data;
    } catch (error) {
      console.error(error);
      return error;
    }
  }
);

const tasksSlice = createSlice({
  name: "tasks",
  initialState,
  reducers: {
    reset: (prevState) => {
      return {
        ...prevState,
        retriveTasks: [],
        createTasks: [],
        editTasks: [],
        deleteTasks: [],
      };
    },
  },
  extraReducers: (builder) => {
    builder.addCase(retriveTasksThunk.pending, (prevState) => {
      return {
        ...prevState,
        isLoading: true,
        isFulfilled: false,
        isRejected: false,
      };
    });
    builder.addCase(
      retriveTasksThunk.fulfilled,
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
      retriveTasksThunk.rejected,
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
    builder.addCase(createTasksThunk.pending, (prevState) => {
      return {
        ...prevState,
        isLoading: true,
        isFulfilled: false,
        isRejected: false,
      };
    });
    builder.addCase(
      createTasksThunk.fulfilled,
      (prevState, action: PayloadAction<any>) => {
        return {
          ...prevState,
          isLoading: true,
          isFulfilled: true,
          isRejected: false,
          createTasks: action.payload,
        };
      }
    );
    builder.addCase(
      createTasksThunk.rejected,
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
    builder.addCase(editTasksThunk.pending, (prevState) => {
      return {
        ...prevState,
        isLoading: true,
        isFulfilled: false,
        isRejected: false,
      };
    });
    builder.addCase(
      editTasksThunk.fulfilled,
      (prevState, action: PayloadAction<any>) => {
        return {
          ...prevState,
          isLoading: true,
          isFulfilled: true,
          isRejected: false,
          editTasks: action.payload,
        };
      }
    );
    builder.addCase(
      editTasksThunk.rejected,
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
    builder.addCase(deleteTasksThunk.pending, (prevState) => {
      return {
        ...prevState,
        isLoading: true,
        isFulfilled: false,
        isRejected: false,
      };
    });
    builder.addCase(
      deleteTasksThunk.fulfilled,
      (prevState, action: PayloadAction<any>) => {
        return {
          ...prevState,
          isLoading: true,
          isFulfilled: true,
          isRejected: false,
          deleteTasks: action.payload,
        };
      }
    );
    builder.addCase(
      deleteTasksThunk.rejected,
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

export const taskAction = {
  ...tasksSlice.actions,
  retriveTasksThunk,
  createAsyncThunk,
  editTasksThunk,
  deleteTasksThunk,
};

export default tasksSlice.reducer;
