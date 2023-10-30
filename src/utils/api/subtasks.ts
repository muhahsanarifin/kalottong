import Axios from "axios";
import { BodyArg } from "../types/apiType";

const BASE_URL = process.env.NEXT_PUBLIC_KALOTTONG_BACK_END;

const config = (accessToken: string) => {
  return {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  };
};

export const retriveSubtasks = (accessToken: string) =>
  Axios.get(`${BASE_URL}/subtasks`, config(accessToken));

export const createSubtasks = (accessToken: string, body: BodyArg) =>
  Axios.post(`${BASE_URL}/subtasks/create`, body, config(accessToken));

export const editSubtasks = (
  accessToken: string,
  body: BodyArg,
  id: string | number
) => Axios.patch(`${BASE_URL}/subtasks/edit/${id}`, body, config(accessToken));

export const editStatusSubtaks = (
  accessToken: string,
  body: BodyArg,
  id: string | number
) => Axios.patch(`${BASE_URL}/subtasks/edit/${id}`, body, config(accessToken));

export const deleteSubtasks = (accessToken: string, id: string | number) =>
  Axios.delete(`${BASE_URL}/subtasks/delete/${id}`, config(accessToken));
