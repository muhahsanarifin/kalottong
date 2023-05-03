import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { TasksState, ArgTasksThunk } from "@/utils/types/reduxType";
import {
  retriveOngoingTasks,
  retriveDoneTasks,
  createTasks,
  editTasks,
  editStatusTasks,
  deleteTasks,
} from "@/utils/api/tasks";
import { getCookie } from "cookies-next";

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

const retriveOngoingTasksThunk = createAsyncThunk(
  "tasks/ongoing",
  async ({ params, cbPending, cbFulfilled, cbFinally }: ArgTasksThunk) => {
    try {
      typeof cbPending === "function" && cbPending();
      const response = await retriveOngoingTasks(getCookie("token"), params);
      typeof cbFulfilled === "function" && cbFulfilled();
      return response.data;
    } catch (error: any) {
      if (error.response) {
        console.error(error.response.data?.msg);
        throw error.response.data?.msg;
      } else {
        console.log(error);
        throw error;
      }
    } finally {
      typeof cbFinally === "function" && cbFinally();
    }
  }
);

const retriveDoneTasksThunk = createAsyncThunk(
  "tasks/done",
  async ({ params, cbPending, cbFulfilled, cbFinally }: ArgTasksThunk) => {
    try {
      typeof cbPending === "function" && cbPending();
      const response = await retriveDoneTasks(getCookie("token"), params);
      // console.log("Response retrive data donetaks:", response);
      typeof cbFulfilled === "function" && cbFulfilled();
      return response.data;
    } catch (error: any) {
      if (error.response) {
        console.error(error.response.data?.msg);
        throw error.response.data?.msg;
      } else {
        console.log(error);
        throw error;
      }
    } finally {
      typeof cbFinally === "function" && cbFinally();
    }
  }
);

const createTasksThunk = createAsyncThunk(
  "tasks/create",
  async ({ body, cbPending, cbFulfilled, cbFinally }: ArgTasksThunk) => {
    try {
      typeof cbPending === "function" && cbPending();
      const response = await createTasks(getCookie("token"), body);
      // console.log("Response create taks:", response);
      typeof cbFulfilled === "function" && cbFulfilled();
      return response.data;
    } catch (error: any) {
      if (error.response) {
        console.log(error.response.data?.msg);
        throw error.response.data?.msg;
      } else {
        console.error(error);
        throw error;
      }
    } finally {
      typeof cbFinally === "function" && cbFinally();
    }
  }
);

const editTasksThunk = createAsyncThunk(
  "tasks/edit",
  async ({ body, id, cbPending, cbFulfilled, cbFinally }: ArgTasksThunk) => {
    try {
      typeof cbPending === "function" && cbPending();
      const response = await editTasks(getCookie("token"), body, id);
      // console.log("Response edit task:", response.data);
      typeof cbFulfilled === "function" && cbFulfilled();
      return response.data;
    } catch (error: any) {
      if (error.response) {
        console.log(error.response.data?.msg);
        throw error.response.data?.msg;
      } else {
        console.error(error);
        throw error;
      }
    } finally {
      typeof cbFinally === "function" && cbFinally();
    }
  }
);

const editStatusTasksThunk = createAsyncThunk(
  "tasks/status/edit",
  async ({ body, id, cbPending, cbFulfilled, cbFinally }: ArgTasksThunk) => {
    try {
      typeof cbPending === "function" && cbPending();
      const response = await editStatusTasks(getCookie("token"), body, id);
      // console.log("Response edit task:", response.data);
      typeof cbFulfilled === "function" && cbFulfilled();
      return response.data;
    } catch (error: any) {
      if (error.response) {
        console.log(error.response.data?.msg);
        throw error.response.data?.msg;
      } else {
        console.error(error);
        throw error;
      }
    } finally {
      typeof cbFinally === "function" && cbFinally();
    }
  }
);

const deleteTasksThunk = createAsyncThunk(
  "tasks/delete",
  async ({ id, cbPending, cbFulfilled, cbFinally }: ArgTasksThunk) => {
    try {
      typeof cbPending === "function" && cbPending();
      const response = await deleteTasks(getCookie("token"), id);
      // console.log("Response delete task:", response.data);
      typeof cbFulfilled === "function" && cbFulfilled();
      return response.data;
    } catch (error: any) {
      if (error.response) {
        console.error(error.response.data?.msg);
        throw error.response.data?.msg;
      }
      console.error(error);
      throw error;
    } finally {
      typeof cbFinally === "function" && cbFinally();
    }
  }
);

const tasksSlice = createSlice({
  name: "tasks",
  initialState,
  reducers: {
    // reset: (prevState) => {
    //   return {
    //     ...prevState,
    //     retriveOngoingTasks: null,
    //     retriveDoneTasks: null,
    //     createTasks: null,
    //     editTasks: null,
    //     editStatusTask: null,
    //     deleteTasks: null,
    //   };
    // },
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
          isRejected: false,
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
