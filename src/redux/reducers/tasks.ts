import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { TasksState } from "@/utils/types/reduxType";
import {
  retriveOngoingTasksThunk,
  retriveDoneTasksThunk,
  createTasksThunk,
  editTasksThunk,
  editStatusTasksThunk,
  deleteTasksThunk,
} from "../actions/tasks";

const initialState: TasksState = {
  retriveOngoingTasks: {
    isLoading: false,
    isFulfilled: false,
    isRejected: false,
    data: {
      totalData: null,
      next: null,
      previous: null,
      totalPages: null,
      data: null,
      msg: null,
    },
    err: null,
  },
  retriveDoneTasks: {
    isLoading: false,
    isFulfilled: false,
    isRejected: false,
    data: {
      totalData: null,
      next: null,
      previous: null,
      totalPages: null,
      data: null,
      msg: null,
    },
    err: null,
  },
  createTasks: {
    isLoading: false,
    isFulfilled: false,
    isRejected: false,
    data: null,
    err: null,
  },
  editTasks: {
    isLoading: false,
    isFulfilled: false,
    isRejected: false,
    data: null,
    err: null,
  },
  editStatusTasks: {
    isLoading: false,
    isFulfilled: false,
    isRejected: false,
    data: null,
    err: null,
  },
  deleteTasks: {
    isLoading: false,
    isFulfilled: false,
    isRejected: false,
    data: null,
    err: null,
  },
};

const tasksSlice = createSlice({
  name: "tasks",
  initialState,
  reducers: {
    resetCreateTask: (prevState) => {
      return {
        ...prevState,
        createTasks: {
          isLoading: false,
          isFulfilled: false,
          isRejected: false,
          data: null,
          err: null,
        },
      };
    },
    resetEditTasks: (prevState) => {
      return {
        ...prevState,
        editTasks: {
          isLoading: false,
          isFulfilled: false,
          isRejected: false,
          data: null,
          err: null,
        },
      };
    },
    resetEditStatusTasks: (prevState) => {
      return {
        ...prevState,
        editStatusTasks: {
          isLoading: false,
          isFulfilled: false,
          isRejected: false,
          data: null,
          err: null,
        },
      };
    },
    deleteTasks: (prevState) => {
      return {
        ...prevState,
        deleteTasks: {
          isLoading: false,
          isFulfilled: false,
          isRejected: false,
          data: null,
          err: null,
        },
      };
    },
  },
  extraReducers: (builder) => {
    builder.addCase(retriveOngoingTasksThunk.pending, (prevState) => {
      return {
        ...prevState,
        retriveOngoingTasks: {
          isLoading: true,
          isFulfilled: false,
          isRejected: false,
          data: {
            totalData: null,
            next: null,
            previous: null,
            totalPages: null,
            data: null,
            msg: null,
          },
          err: null,
        },
      };
    });
    builder.addCase(
      retriveOngoingTasksThunk.fulfilled,
      (prevState, action: PayloadAction<any>) => {
        return {
          ...prevState,
          retriveOngoingTasks: {
            isLoading: false,
            isFulfilled: true,
            isRejected: false,
            data: action.payload,
            err: null,
          },
        };
      }
    );
    builder.addCase(retriveOngoingTasksThunk.rejected, (prevState, action) => {
      return {
        ...prevState,
        retriveOngoingTasks: {
          isLoading: false,
          isFulfilled: false,
          isRejected: true,
          data: {
            totalData: null,
            next: null,
            previous: null,
            totalPages: null,
            data: [],
            msg: action.error.message,
          },
          err: action.error.message,
        },
      };
    });
    builder.addCase(retriveDoneTasksThunk.pending, (prevState) => {
      return {
        ...prevState,
        retriveDoneTasks: {
          isLoading: true,
          isFulfilled: false,
          isRejected: false,
          data: {
            totalData: null,
            next: null,
            previous: null,
            totalPages: null,
            data: null,
            msg: null,
          },
          err: null,
        },
      };
    });
    builder.addCase(
      retriveDoneTasksThunk.fulfilled,
      (prevState, action: PayloadAction<any>) => {
        return {
          ...prevState,
          retriveDoneTasks: {
            isLoading: false,
            isFulfilled: true,
            isRejected: false,
            data: action.payload,
            err: null,
          },
        };
      }
    );
    builder.addCase(retriveDoneTasksThunk.rejected, (prevState, action) => {
      return {
        ...prevState,
        retriveDoneTasks: {
          isLoading: false,
          isFulfilled: false,
          isRejected: true,
          data: {
            totalData: null,
            next: null,
            previous: null,
            totalPages: null,
            data: [],
            msg: action.error.message,
          },
          err: action.error.message,
        },
      };
    });
    builder.addCase(createTasksThunk.pending, (prevState) => {
      return {
        ...prevState,
        createTasks: {
          isLoading: true,
          isFulfilled: false,
          isRejected: false,
          data: null,
          err: null,
        },
      };
    });
    builder.addCase(
      createTasksThunk.fulfilled,
      (prevState, action: PayloadAction<any>) => {
        return {
          ...prevState,
          createTasks: {
            isLoading: false,
            isFulfilled: true,
            isRejected: false,
            data: action.payload,
            err: null,
          },
        };
      }
    );
    builder.addCase(createTasksThunk.rejected, (prevState, action) => {
      return {
        ...prevState,
        createTasks: {
          isLoading: false,
          isFulfilled: false,
          isRejected: true,
          data: { msg: action.error.message },
          err: action.error.message,
        },
      };
    });
    builder.addCase(editTasksThunk.pending, (prevState) => {
      return {
        ...prevState,
        editTasks: {
          isLoading: true,
          isFulfilled: false,
          isRejected: false,
          data: null,
          err: null,
        },
      };
    });
    builder.addCase(
      editTasksThunk.fulfilled,
      (prevState, action: PayloadAction<any>) => {
        return {
          ...prevState,
          isLoading: false,
          isFulfilled: true,
          isRejected: false,
          editTasks: action.payload,
        };
      }
    );
    builder.addCase(editTasksThunk.rejected, (prevState, action) => {
      return {
        ...prevState,
        isLoading: false,
        isFulfilled: false,
        isRejected: true,
        editTasks: { msg: action.error.message },
        err: action.error.message,
      };
    });
    builder.addCase(editStatusTasksThunk.pending, (prevState) => {
      return {
        ...prevState,
        editStatusTasks: {
          isLoading: true,
          isFulfilled: false,
          isRejected: false,
          data: null,
          err: null,
        },
      };
    });
    builder.addCase(
      editStatusTasksThunk.fulfilled,
      (prevState, action: PayloadAction<any>) => {
        return {
          ...prevState,
          isLoading: false,
          isFulfilled: true,
          isRejected: false,
          editStatusTasks: action.payload,
        };
      }
    );
    builder.addCase(editStatusTasksThunk.rejected, (prevState, action) => {
      return {
        ...prevState,
        isLoading: false,
        isFulfilled: false,
        isRejected: true,
        editStatusTasks: { msg: action.error.message },
        err: action.error.message,
      };
    });
    builder.addCase(deleteTasksThunk.pending, (prevState) => {
      return {
        ...prevState,
        deleteTasks: {
          isLoading: true,
          isFulfilled: false,
          isRejected: false,
          data: null,
          err: null,
        },
      };
    });
    builder.addCase(
      deleteTasksThunk.fulfilled,
      (prevState, action: PayloadAction<any>) => {
        return {
          ...prevState,
          deleteTasks: {
            isLoading: false,
            isFulfilled: true,
            isRejected: false,
            data: action.payload,
            err: null,
          },
        };
      }
    );
    builder.addCase(deleteTasksThunk.rejected, (prevState, action) => {
      return {
        ...prevState,
        deleteTasks: {
          isLoading: false,
          isFulfilled: false,
          isRejected: true,
          data: { msg: action.error.message },
          err: action.error.message,
        },
      };
    });
  },
});

export const taskAction = {
  ...tasksSlice.actions,
  retriveOngoingTasksThunk,
  retriveDoneTasksThunk,
  createTasksThunk,
  editTasksThunk,
  editStatusTasksThunk,
  deleteTasksThunk,
};

export default tasksSlice.reducer;
