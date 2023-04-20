import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { UserState } from "@/utils/types/reduxType";
import {
  retriveProfile,
  editProfile,
  uploadImageProfile,
  editNoTelp,
} from "@/utils/api/users";

const initialState: UserState = {
  retriveProfile: [],
  editProfile: [],
  uploadImageProfile: [],
  editNoTelp: [],
  isLoading: false,
  isFulfilled: false,
  isRejected: false,
  err: null,
};

const retriveProfileThunk = createAsyncThunk(
  "users/profile",
  async (accessToken?: any) => {
    try {
      const response = await retriveProfile(accessToken);
      // console.log("Response retrive data profile:", response.data.data[0]);
      return response.data?.data[0];
    } catch (error) {
      console.error(error);
      return error;
    }
  }
);

const editProfileThunk = createAsyncThunk(
  "users/profile/edit",
  async (accessToken: any, body: any) => {
    try {
      const response = await editProfile(accessToken, body);
      // console.log("Response edit profile:", response);
      return response.data;
    } catch (error) {
      console.error(error);
      return error;
    }
  }
);

const uploadImageProfileThunk = createAsyncThunk(
  "users/profile/upload",
  async (accessToken: any, body: any) => {
    try {
      const response = await uploadImageProfile(accessToken, body);
      // console.log("Response upload image profile:", response);
      return response.data;
    } catch (error) {
      console.error(error);
      return error;
    }
  }
);

const editNoTelpThunk = createAsyncThunk(
  "users/notelp/edit",
  async (accessToken: any, body: any) => {
    try {
      const response = await editNoTelp(accessToken, body);
      // console.log("Response edit no telp:", response);
      return response.data;
    } catch (error) {
      console.error(error);
      return error;
    }
  }
);

const userSlice = createSlice({
  name: "users",
  initialState,
  reducers: {
    reset: (prevState) => {
      return {
        ...prevState,
        retriveProfile: [],
        editProfile: [],
        uploadImageProfile: [],
        editNoTelp: [],
      };
    },
  },
  extraReducers: (builder) => {
    builder.addCase(retriveProfileThunk.pending, (prevState) => {
      return {
        ...prevState,
        isLoading: true,
        isFulfilled: false,
        isRejected: false,
      };
    });
    builder.addCase(
      retriveProfileThunk.fulfilled,
      (prevState, action: PayloadAction<any>) => {
        return {
          ...prevState,
          isLoading: false,
          isFulfilled: true,
          isRejected: false,
          retriveProfile: action.payload,
        };
      }
    );
    builder.addCase(
      retriveProfileThunk.rejected,
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
    builder.addCase(editProfileThunk.pending, (prevState) => {
      return {
        ...prevState,
        isLoading: true,
        isFulfilled: false,
        isRejected: false,
      };
    });
    builder.addCase(
      editProfileThunk.fulfilled,
      (prevState, action: PayloadAction<any>) => {
        return {
          ...prevState,
          isLoading: false,
          isFulfilled: true,
          isRejected: false,
          editProfile: action.payload,
        };
      }
    );
    builder.addCase(
      editProfileThunk.rejected,
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
    builder.addCase(uploadImageProfileThunk.pending, (prevState) => {
      return {
        ...prevState,
        isLoading: true,
        isFulfilled: false,
        isRejected: false,
      };
    });
    builder.addCase(
      uploadImageProfileThunk.fulfilled,
      (prevState, action: PayloadAction<any>) => {
        return {
          ...prevState,
          isLoading: false,
          isFulfilled: true,
          isRejected: false,
          uploadImageProfile: action.payload,
        };
      }
    );
    builder.addCase(
      uploadImageProfileThunk.rejected,
      (prevState, action: PayloadAction<any>) => {
        return {
          ...prevState,
          isLoading: false,
          isFulfilled: false,
          isRejected: false,
          err: action.payload,
        };
      }
    );
    builder.addCase(editNoTelpThunk.pending, (prevState) => {
      return {
        ...prevState,
        isLoading: true,
        isFulfilled: false,
        isRejected: false,
      };
    });
    builder.addCase(
      editNoTelpThunk.fulfilled,
      (prevState, action: PayloadAction<any>) => {
        return {
          ...prevState,
          isLoading: false,
          isFulfilled: true,
          isRejected: false,
          editNoTelp: action.payload,
        };
      }
    );
    builder.addCase(
      editNoTelpThunk.rejected,
      (prevState, action: PayloadAction<any>) => {
        return {
          ...prevState,
          isLoading: false,
          isFulfilled: false,
          isRejected: false,
          err: action.payload,
        };
      }
    );
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
