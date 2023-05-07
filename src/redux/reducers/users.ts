import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { UserState, ArgProfileThunk } from "@/utils/types/reduxType";
import { getCookie } from "cookies-next";
import {
  retriveProfile,
  editProfile,
  uploadImageProfile,
  editNoTelp,
} from "@/utils/api/users";

const initialState: UserState = {
  retriveProfile: {
    isLoading: false,
    isFulfilled: false,
    isRejected: false,
    data: null,
    err: null,
  },
  editProfile: {
    isLoading: false,
    isFulfilled: false,
    isRejected: false,
    data: null,
    err: null,
  },
  uploadImageProfile: {
    isLoading: false,
    isFulfilled: false,
    isRejected: false,
    data: null,
    err: null,
  },
  editNoTelp: {
    isLoading: false,
    isFulfilled: false,
    isRejected: false,
    data: null,
    err: null,
  },
};

const retriveProfileThunk = createAsyncThunk(
  "users/profile",
  async ({ cbPending, cbFulfilled, cbFinally }: ArgProfileThunk) => {
    try {
      typeof cbPending === "function" && cbPending();
      const response = await retriveProfile(getCookie("token"));
      typeof cbFulfilled === "function" && cbFulfilled(response.data);
      return response.data?.data[0];
    } catch (error: any) {
      if (error.response) {
        console.error(error.response.data?.msg);
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

const editProfileThunk = createAsyncThunk(
  "users/profile/edit",
  async ({ body, cbPending, cbFulfilled, cbFinally }: ArgProfileThunk) => {
    try {
      typeof cbPending === "function" && cbPending();
      const response = await editProfile(getCookie("token"), body);
      typeof cbFulfilled === "function" && cbFulfilled(response.data);
      return response.data;
    } catch (error: any) {
      if (error.response) {
        console.error(error.response.data?.msg);
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

const uploadImageProfileThunk = createAsyncThunk(
  "users/profile/upload",
  async ({ body, cbPending, cbFulfilled, cbFinally }: ArgProfileThunk) => {
    try {
      typeof cbPending === "function" && cbPending();
      const response = await uploadImageProfile(getCookie("token"), body);
      typeof cbFulfilled === "function" && cbFulfilled(response.data);
      return response.data;
    } catch (error: any) {
      if (error.response) {
        console.error(error.response.data?.msg);
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

const editNoTelpThunk = createAsyncThunk(
  "users/notelp/edit",
  async ({ body, cbPending, cbFulfilled, cbFinally }: ArgProfileThunk) => {
    try {
      typeof cbPending === "function" && cbPending();
      const response = await editNoTelp(getCookie("token"), body);
      typeof cbFulfilled === "function" && cbFulfilled(response.data);
      return response.data;
    } catch (error: any) {
      if (error.response) {
        console.error(error.response.data?.msg);
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

const userSlice = createSlice({
  name: "users",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(retriveProfileThunk.pending, (prevState) => {
      return {
        ...prevState,
        retriveProfile: {
          isLoading: true,
          isFulfilled: false,
          isRejected: false,
          data: null,
          err: null,
        },
      };
    });
    builder.addCase(
      retriveProfileThunk.fulfilled,
      (prevState, action: PayloadAction<any>) => {
        return {
          ...prevState,
          retriveProfile: {
            isLoading: false,
            isFulfilled: true,
            isRejected: false,
            data: action.payload,
            err: null,
          },
        };
      }
    );
    builder.addCase(retriveProfileThunk.rejected, (prevState, action) => {
      return {
        ...prevState,
        retriveProfile: {
          isLoading: false,
          isFulfilled: false,
          isRejected: true,
          data: { msg: action.error.message },
          err: action.error.message,
        },
      };
    });
    builder.addCase(editProfileThunk.pending, (prevState) => {
      return {
        ...prevState,
        editProfile: {
          isLoading: true,
          isFulfilled: false,
          isRejected: false,
          data: null,
          err: null,
        },
      };
    });
    builder.addCase(
      editProfileThunk.fulfilled,
      (prevState, action: PayloadAction<any>) => {
        return {
          ...prevState,
          editProfile: {
            isLoading: false,
            isFulfilled: true,
            isRejected: false,
            data: action.payload,
            err: null,
          },
        };
      }
    );
    builder.addCase(editProfileThunk.rejected, (prevState, action) => {
      return {
        ...prevState,
        editProfile: {
          isLoading: false,
          isFulfilled: false,
          isRejected: true,
          data: { msg: action.error.message },
          err: action.error.message,
        },
      };
    });
    builder.addCase(uploadImageProfileThunk.pending, (prevState) => {
      return {
        ...prevState,
        uploadImageProfile: {
          isLoading: true,
          isFulfilled: false,
          isRejected: false,
          data: null,
          err: null,
        },
      };
    });
    builder.addCase(
      uploadImageProfileThunk.fulfilled,
      (prevState, action: PayloadAction<any>) => {
        return {
          ...prevState,
          uploadImageProfile: {
            isLoading: false,
            isFulfilled: true,
            isRejected: false,
            data: action.payload,
            err: null,
          },
        };
      }
    );
    builder.addCase(uploadImageProfileThunk.rejected, (prevState, action) => {
      return {
        ...prevState,
        uploadImageProfile: {
          isLoading: false,
          isFulfilled: false,
          isRejected: true,
          data: { msg: action.error.message },
          err: action.error.message,
        },
      };
    });
    builder.addCase(editNoTelpThunk.pending, (prevState) => {
      return {
        ...prevState,
        editNoTelp: {
          isLoading: true,
          isFulfilled: false,
          isRejected: false,
          data: null,
          err: null,
        },
      };
    });
    builder.addCase(
      editNoTelpThunk.fulfilled,
      (prevState, action: PayloadAction<any>) => {
        return {
          ...prevState,
          editNoTelp: {
            isLoading: false,
            isFulfilled: true,
            isRejected: false,
            data: action.payload,
            err: null,
          },
        };
      }
    );
    builder.addCase(editNoTelpThunk.rejected, (prevState, action) => {
      return {
        ...prevState,
        editProfile: {
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

export const usersAction = {
  ...userSlice.actions,
  retriveProfileThunk,
  editProfileThunk,
  uploadImageProfileThunk,
  editNoTelpThunk,
};

export default userSlice.reducer;
