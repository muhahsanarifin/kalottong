import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { UserState } from "@/utils/types/reduxType";
import {
  retriveProfileThunk,
  editProfileThunk,
  uploadImageProfileThunk,
  editNoTelpThunk,
} from "../actions/users";

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

const userSlice = createSlice({
  name: "users",
  initialState,
  reducers: {
    clearEditProfileData: (prevState) => {
      return {
        ...prevState,
        editProfile: {
          isLoading: false,
          isFulfilled: false,
          isRejected: false,
          data: null,
          err: null,
        },
      };
    },
    clearEditNoTelpData: (prevState) => {
      return {
        ...prevState,
        editNoTelp: {
          isLoading: false,
          isFulfilled: false,
          isRejected: false,
          data: null,
          err: null,
        },
      };
    }
  },
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
        editNoTelp: {
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
