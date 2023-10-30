import { createAsyncThunk } from "@reduxjs/toolkit";
import {
  retriveSubtasks,
  createSubtasks,
  editSubtasks,
  editStatusSubtaks,
  deleteSubtasks,
} from "../../utils/api/subtasks";

import { ArgSubTasksThunk } from "../../utils/types/reduxType";

export const retriveSubtasksThunk = createAsyncThunk(
  "subtasks",
  async ({
    cbPending,
    cbFulfilled,
    cbFinally,
    accessToken,
  }: ArgSubTasksThunk) => {
    try {
      typeof cbPending === "function" && cbPending();
      const response = await retriveSubtasks(accessToken);
      typeof cbFulfilled === "function" && cbFulfilled();
      return response.data;
    } catch (error: any) {
      if (error.response) {
        throw error.response.data?.msg;
      } else {
        throw error;
      }
    } finally {
      typeof cbFinally === "function" && cbFinally();
    }
  }
);

export const createSubtasksThunk = createAsyncThunk(
  "subtasks/create",
  async ({
    body,
    cbPending,
    cbFulfilled,
    cbFinally,
    accessToken,
  }: ArgSubTasksThunk) => {
    try {
      typeof cbPending === "function" && cbPending();
      const response = await createSubtasks(accessToken, body);
      typeof cbFulfilled === "function" && cbFulfilled();
      return response.data;
    } catch (error: any) {
      if (error.response) {
        throw error.response.data?.msg;
      } else {
        throw error;
      }
    } finally {
      typeof cbFinally === "function" && cbFinally();
    }
  }
);

export const editSubtasksThunk = createAsyncThunk(
  "subtasks/edit",
  async ({
    body,
    id,
    cbPending,
    cbFulfilled,
    cbFinally,
    accessToken,
  }: ArgSubTasksThunk) => {
    try {
      typeof cbPending === "function" && cbPending();
      const response = await editSubtasks(accessToken, body, id);
      typeof cbFulfilled === "function" && cbFulfilled();
      return response.data;
    } catch (error: any) {
      if (error.response) {
        throw error.response.data?.msg;
      } else {
        throw error;
      }
    } finally {
      typeof cbFinally === "function" && cbFinally();
    }
  }
);

export const editStatusSubtasksThunk = createAsyncThunk(
  "subtasks/status/edit",
  async ({
    body,
    id,
    cbPending,
    cbFulfilled,
    cbFinally,
    accessToken,
  }: ArgSubTasksThunk) => {
    try {
      typeof cbPending === "function" && cbPending();
      const response = await editStatusSubtaks(accessToken, body, id);
      typeof cbFulfilled === "function" && cbFulfilled();
      return response.data;
    } catch (error: any) {
      if (error.response) {
        throw error.response.data?.msg;
      } else {
        throw error;
      }
    } finally {
      typeof cbFulfilled === "function" && cbFinally();
    }
  }
);

export const deleteSubtasksThunk = createAsyncThunk(
  "subtasks/delete",
  async ({
    id,
    cbPending,
    cbFulfilled,
    cbFinally,
    accessToken,
  }: ArgSubTasksThunk) => {
    try {
      typeof cbPending === "function" && cbFulfilled();
      const response = await deleteSubtasks(accessToken, id);
      typeof cbFulfilled === "function" && cbFulfilled();
      return response.data;
    } catch (error: any) {
      
      if (error.response) {
       
        throw error.response.data?.msg;
      } else {
        
        throw error;
      }
    } finally {
      typeof cbFinally === "function" && cbFinally();
    }
  }
);
