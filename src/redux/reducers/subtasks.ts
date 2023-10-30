import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { SubtasksState } from "../../utils/types/reduxType";

import {
  retriveSubtasksThunk,
  createSubtasksThunk,
  editSubtasksThunk,
  editStatusSubtasksThunk,
  deleteSubtasksThunk,
} from "../actions/subtasks";

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

const subtasksSlice = createSlice({
  name: "subtasks",
  initialState,
  reducers: {
    resetCreateSubtask: (prevState) => {
      return {
        ...prevState,
        createSubtasks: {
          isLoading: false,
          isFulfilled: false,
          isRejected: false,
          data: null,
          err: null,
        },
      };
    },
    resetEditSubtasks: (prevState) => {
      return {
        ...prevState,
        editSubtasks: {
          isLoading: false,
          isFulfilled: false,
          isRejected: false,
          data: null,
          err: null,
        },
      };
    },
    resetEditStatusSubtasks: (prevState) => {
      return {
        ...prevState,
        editStatusSubtasks: {
          isLoading: false,
          isFulfilled: false,
          isRejected: false,
          data: null,
          err: null,
        },
      };
    },
    resetDeleteSubtasks: (prevState) => {
      return {
        ...prevState,
        deleteSubtasks: {
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
