import Axios from "axios";

import { BodyArg, ParamsArg, IdTasksArg } from "../types/apiType";

const BASE_URL = process.env.NEXT_PUBLIC_KALOTTONG_BACK_END;

const config = (accessToken: any) => {
  return {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  };
};

export const retriveTasks = (accessToken: any, params: ParamsArg) =>
  Axios.get(`${BASE_URL}/tasks?${params}`, config(accessToken));

export const createTasks = (accessToken: any, body: any) =>
  Axios.post(`${BASE_URL}/tasks/create`, body, config(accessToken));

export const editTasks = (accessToken: any, body: BodyArg, id: IdTasksArg) =>
  Axios.patch(`${BASE_URL}/tasks/edit/${id}`, body, config(accessToken));

export const deleteTasks = (accessToken: any, id: IdTasksArg) =>
  Axios.delete(`${BASE_URL}/tasks/delete/${id}`, config(accessToken));
