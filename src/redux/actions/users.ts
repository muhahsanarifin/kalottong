import { createAsyncThunk } from "@reduxjs/toolkit";
import {
  retriveProfile,
  editProfile,
  uploadImageProfile,
  editNoTelp,
} from "@/utils/api/users";

import { ArgProfileThunk } from "@/utils/types/reduxType";

export const retriveProfileThunk = createAsyncThunk(
  "users/profile",
  async ({
    cbRPPending,
    cbRPFulfilled,
    cbRPFinally,
    accessToken,
  }: ArgProfileThunk) => {
    try {
      typeof cbRPPending === "function" && cbRPPending();
      const response = await retriveProfile(accessToken);
      typeof cbRPFulfilled === "function" && cbRPFulfilled();
      return response.data?.data[0];
    } catch (error: any) {
      if (error.response) {
        throw error.response.data?.msg;
      } else {
        throw error;
      }
    } finally {
      typeof cbRPFinally === "function" && cbRPFinally();
    }
  }
);

export const editProfileThunk = createAsyncThunk(
  "users/profile/edit",
  async ({
    body,
    cbEPPending,
    cbEPFulfilled,
    cbEPFinally,
    accessToken,
  }: ArgProfileThunk) => {
    try {
      typeof cbEPPending === "function" && cbEPPending();
      const response = await editProfile(accessToken, body);
      typeof cbEPFulfilled === "function" && cbEPFulfilled();
      return response.data;
    } catch (error: any) {
      if (error.response) {
        throw error.response.data?.msg;
      } else {
        throw error;
      }
    } finally {
      typeof cbEPFinally === "function" && cbEPFinally();
    }
  }
);

export const uploadImageProfileThunk = createAsyncThunk(
  "users/profile/upload",
  async ({
    body,
    cbUIPPending,
    cbUIPFulfilled,
    cbUIPFinally,
    accessToken,
  }: ArgProfileThunk) => {
    try {
      typeof cbUIPPending === "function" && cbUIPPending();
      const response = await uploadImageProfile(accessToken, body);
      typeof cbUIPFulfilled === "function" && cbUIPFulfilled();
      return response.data;
    } catch (error: any) {
      if (error.response) {
        throw error.response.data?.msg;
      } else {
        throw error;
      }
    } finally {
      typeof cbUIPFinally === "function" && cbUIPFinally();
    }
  }
);

export const editNoTelpThunk = createAsyncThunk(
  "users/notelp/edit",
  async ({
    body,
    cbENPPending,
    cbENPFulfilled,
    cbENPFinally,
    accessToken,
  }: ArgProfileThunk) => {
    try {
      typeof cbENPPending === "function" && cbENPPending();
      const response = await editNoTelp(accessToken, body);
      typeof cbENPFulfilled === "function" && cbENPFulfilled();
      return response.data;
    } catch (error: any) {
      if (error.response) {
        throw error.response.data?.msg;
      } else {
        throw error;
      }
    } finally {
      typeof cbENPFinally === "function" && cbENPFinally();
    }
  }
);
