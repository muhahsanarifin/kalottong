import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { SubtasksState, ArgSubTasksThunk } from "@/utils/types/reduxType";
import { getCookie } from "cookies-next";
import {
  retriveSubtasks,
  createSubtasks,
  editSubtasks,
  editStatusSubtaks,
  deleteSubtasks,
} from "@/utils/api/subtasks";

const initialState: SubtasksState = {
  retriveSubtasks: {
    isLoading: false,
    isFulfilled: false,
    isRejected: false,
    data: {
      data: null,
      msg: null,
    },
    err: null,
  },
  createSubtasks: {
    isLoading: false,
    isFulfilled: false,
    isRejected: false,
    data: null,
    err: null,
  },
  editSubtasks: {
    isLoading: false,
    isFulfilled: false,
    isRejected: false,
    data: null,
    err: null,
  },
  editStatusSubtasks: {
    isLoading: false,
    isFulfilled: false,
    isRejected: false,
    data: null,
    err: null,
  },
  deleteSubtasks: {
    isLoading: false,
    isFulfilled: false,
    isRejected: false,
    data: null,
    err: null,
  },
};

const retriveSubtasksThunk = createAsyncThunk(
  "subtasks",
  async ({ cbPending, cbFulfilled, cbFinally }: ArgSubTasksThunk) => {
    try {
      typeof cbPending === "function" && cbPending();
      const response = await retriveSubtasks(getCookie("token"));
      // console.log("Response retrive data subtasks:", response);
      typeof cbFulfilled === "function" && cbFulfilled();
      return response.data;
    } catch (error: any) {
      console.error(error);
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

const createSubtasksThunk = createAsyncThunk(
  "subtasks/create",
  async ({ body, cbPending, cbFulfilled, cbFinally }: ArgSubTasksThunk) => {
    try {
      typeof cbPending === "function" && cbPending();
      const response = await createSubtasks(getCookie("token"), body);
      // console.log("Response create subtasks:", response);
      typeof cbFulfilled === "function" && cbFulfilled();
      return response.data;
    } catch (error: any) {
      console.error(error);
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

const editSubtasksThunk = createAsyncThunk(
  "subtasks/edit",
  async ({ body, id, cbPending, cbFulfilled, cbFinally }: ArgSubTasksThunk) => {
    try {
      typeof cbPending === "function" && cbPending();
      const response = await editSubtasks(getCookie("token"), body, id);
      // console.log("Response edit subtasks:", response);
      typeof cbFulfilled === "function" && cbFulfilled();
      return response.data;
    } catch (error: any) {
      console.error(error);
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

const editStatusSubtasksThunk = createAsyncThunk(
  "subtasks/status/edit",
  async ({ body, id, cbPending, cbFulfilled, cbFinally }: ArgSubTasksThunk) => {
    try {
      typeof cbPending === "function" && cbPending();
      const response = await editStatusSubtaks(getCookie("token"), body, id);
      // console.log("Response edit status subtasks:", response);
      typeof cbFulfilled === "function" && cbFulfilled();
      return response.data;
    } catch (error: any) {
      console.error(error);
      if (error.response) {
        console.error(error.response.data?.msg);
        throw error.response.data?.msg;
      } else {
        console.log(error);
        throw error;
      }
    } finally {
      typeof cbFulfilled === "function" && cbFinally();
    }
  }
);

const deleteSubtasksThunk = createAsyncThunk(
  "subtasks/delete",
  async ({ id, cbPending, cbFulfilled, cbFinally }: ArgSubTasksThunk) => {
    try {
      typeof cbPending === "function" && cbFulfilled();
      const response = await deleteSubtasks(getCookie("token"), id);
      // console.log("Response delete subtasks:", response);
      typeof cbFulfilled === "function" && cbFulfilled();
      return response.data;
    } catch (error: any) {
      console.error(error);
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

const subtasksSlice = createSlice({
  name: "subtasks",
  initialState,
  reducers: {
    // reset: (prevState) => {
    //   return {
    //     ...prevState,
    //     retriveSubtasks: null,
    //     createSubtasks: null,
    //     editSubtasks: null,
    //     editStatusSubtasks: null,
    //     deleteSubtasks: null,
    //   };
    // },
  },
  extraReducers: (builder) => {
    builder.addCase(retriveSubtasksThunk.pending, (prevState) => {
      return {
        ...prevState,
        retriveSubtasks: {
          isLoading: true,
          isFulfilled: false,
          isRejected: false,
          data: {
            data: null,
            msg: null,
          },
          err: null,
        },
      };
    });
    builder.addCase(
      retriveSubtasksThunk.fulfilled,
      (prevState, action: PayloadAction<any>) => {
        return {
          ...prevState,
          retriveSubtasks: {
            isLoading: false,
            isFulfilled: true,
            isRejected: false,
            data: action.payload,
            err: null,
          },
        };
      }
    );
    builder.addCase(retriveSubtasksThunk.rejected, (prevState, action) => {
      return {
        ...prevState,
        retriveSubtasks: {
          isLoading: false,
          isFulfilled: false,
          isRejected: true,
          data: { msg: action.error.message },
          err: action.error.message,
        },
      };
    });
    builder.addCase(createSubtasksThunk.pending, (prevState) => {
      return {
        ...prevState,
        createSubtasks: {
          isLoading: true,
          isFulfilled: false,
          isRejected: false,
          data: null,
          err: null,
        },
      };
    });
    builder.addCase(
      createSubtasksThunk.fulfilled,
      (prevState, action: PayloadAction<any>) => {
        return {
          ...prevState,
          createSubtasks: {
            isLoading: false,
            isFulfilled: true,
            isRejected: false,
            data: action.payload,
            err: null,
          },
        };
      }
    );
    builder.addCase(createSubtasksThunk.rejected, (prevState, action) => {
      return {
        ...prevState,
        createSubtasks: {
          isLoading: false,
          isFulfilled: false,
          isRejected: true,
          data: { msg: action.error.message },
          err: action.error.message,
        },
      };
    });
    builder.addCase(editSubtasksThunk.pending, (prevState) => {
      return {
        ...prevState,
        editSubtasks: {
          isLoading: true,
          isFulfilled: false,
          isRejected: false,
          data: null,
          err: null,
        },
      };
    });
    builder.addCase(
      editSubtasksThunk.fulfilled,
      (prevState, action: PayloadAction<any>) => {
        return {
          ...prevState,
          editSubtasks: {
            isLoading: false,
            isFulfilled: true,
            isRejected: false,
            data: action.payload,
            err: null,
          },
        };
      }
    );
    builder.addCase(editSubtasksThunk.rejected, (prevState, action) => {
      return {
        ...prevState,
        editSubtasks: {
          isLoading: false,
          isFulfilled: false,
          isRejected: true,
          data: { msg: action.error.message },
          err: action.error.message,
        },
      };
    });
    builder.addCase(editStatusSubtasksThunk.pending, (prevState) => {
      return {
        ...prevState,
        editStatusSubtasks: {
          isLoading: true,
          isFulfilled: false,
          isRejected: false,
          data: null,
          err: null,
        },
      };
    });
    builder.addCase(
      editStatusSubtasksThunk.fulfilled,
      (prevState, action: PayloadAction<any>) => {
        return {
          ...prevState,
          editStatusSubtasks: {
            isLoading: false,
            isFulfilled: true,
            isRejected: false,
            data: action.payload,
            err: null,
          },
        };
      }
    );
    builder.addCase(editStatusSubtasksThunk.rejected, (prevState, action) => {
      return {
        ...prevState,
        editStatusSubtasks: {
          isLoading: false,
          isFulfilled: false,
          isRejected: true,
          data: { msg: action.error.message },
          err: action.error.message,
        },
      };
    });
    builder.addCase(deleteSubtasksThunk.pending, (prevState) => {
      return {
        ...prevState,
        deleteSubtasks: {
          isLoading: true,
          isFulfilled: false,
          isRejected: false,
          data: null,
          err: null,
        },
      };
    });
    builder.addCase(
      deleteSubtasksThunk.fulfilled,
      (prevState, action: PayloadAction<any>) => {
        return {
          ...prevState,
          deleteSubtasks: {
            isLoading: false,
            isFulfilled: true,
            isRejected: false,
            data: action.payload,
            err: null,
          },
        };
      }
    );
    builder.addCase(deleteSubtasksThunk.rejected, (prevState, action) => {
      return {
        ...prevState,
        deleteSubtasks: {
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

export const subtasksAction = {
  ...subtasksSlice.actions,
  retriveSubtasksThunk,
  createSubtasksThunk,
  editSubtasksThunk,
  editStatusSubtasksThunk,
  deleteSubtasksThunk,
};

export default subtasksSlice.reducer;
