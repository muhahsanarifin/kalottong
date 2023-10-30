import { createAsyncThunk } from "@reduxjs/toolkit";
import {
  retriveOngoingTasks,
  retriveDoneTasks,
  createTasks,
  editTasks,
  editStatusTasks,
  deleteTasks,
} from "../../utils/api/tasks";

import { ArgTasksThunk } from "../../utils/types/reduxType";

export const retriveOngoingTasksThunk = createAsyncThunk(
  "tasks/ongoing",
  async ({
    params,
    cbPending,
    cbFulfilled,
    cbFinally,
    accessToken,
  }: ArgTasksThunk) => {
    try {
      typeof cbPending === "function" && cbPending();
      const response = await retriveOngoingTasks(accessToken, params);
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

export const retriveDoneTasksThunk = createAsyncThunk(
  "tasks/done",
  async ({
    params,
    cbPending,
    cbFulfilled,
    cbFinally,
    accessToken,
  }: ArgTasksThunk) => {
    try {
      typeof cbPending === "function" && cbPending();
      const response = await retriveDoneTasks(accessToken, params);
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

export const createTasksThunk = createAsyncThunk(
  "tasks/create",
  async ({
    body,
    cbPending,
    cbFulfilled,
    cbFinally,
    accessToken,
  }: ArgTasksThunk) => {
    try {
      typeof cbPending === "function" && cbPending();
      const response = await createTasks(accessToken, body);
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

export const editTasksThunk = createAsyncThunk(
  "tasks/edit",
  async ({
    body,
    id,
    cbPending,
    cbFulfilled,
    cbFinally,
    accessToken,
  }: ArgTasksThunk) => {
    try {
      typeof cbPending === "function" && cbPending();
      const response = await editTasks(accessToken, body, id);
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

export const editStatusTasksThunk = createAsyncThunk(
  "tasks/status/edit",
  async ({
    body,
    id,
    cbPending,
    cbFulfilled,
    cbFinally,
    accessToken,
  }: ArgTasksThunk) => {
    try {
      typeof cbPending === "function" && cbPending();
      const response = await editStatusTasks(accessToken, body, id);
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

export const deleteTasksThunk = createAsyncThunk(
  "tasks/delete",
  async ({
    id,
    cbPending,
    cbFulfilled,
    cbFinally,
    accessToken,
  }: ArgTasksThunk) => {
    try {
      typeof cbPending === "function" && cbPending();
      const response = await deleteTasks(accessToken, id);
      typeof cbFulfilled === "function" && cbFulfilled();
      return response.data;
    } catch (error: any) {
      if (error.response) {
        throw error.response.data?.msg;
      }

      throw error;
    } finally {
      typeof cbFinally === "function" && cbFinally();
    }
  }
);
