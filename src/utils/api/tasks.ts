import Axios from "axios";

import {
  TokenProps,
  BodyProps,
  ParamsProps,
  IdTasksProps,
} from "../types/apiType";

const BASE_URL = process.env.NEXT_PUBLIC_KALOTTONG_BACK_END;

const config = (accessToken: TokenProps) => {
  return {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  };
};

export const retriveTasks = (accessToken: TokenProps, params: ParamsProps) =>
  Axios.get(`${BASE_URL}/tasks?${params}`, config(accessToken));

export const createTasks = (accessToken: TokenProps, body: BodyProps) =>
  Axios.post(`${BASE_URL}/tasks/create`, body, config(accessToken));

export const editTasks = (
  accessToken: TokenProps,
  body: BodyProps,
  id: IdTasksProps
) => Axios.patch(`${BASE_URL}/tasks/edit/${id}`, body, config(accessToken));

export const deleteTasks = (accessToken: TokenProps, id: IdTasksProps) =>
  Axios.delete(`${BASE_URL}/tasks/delete/${id}`, config(accessToken));
