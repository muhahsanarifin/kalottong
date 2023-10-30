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

export const retriveOngoingTasks = (accessToken: string, params: string) =>
  Axios.get(`${BASE_URL}/tasks${params}`, config(accessToken));

export const retriveDoneTasks = (accessToken: string, params: string) =>
  Axios.get(`${BASE_URL}/tasks${params}`, config(accessToken));

export const createTasks = (accessToken: string, body: any) =>
  Axios.post(`${BASE_URL}/tasks/create`, body, config(accessToken));

export const editTasks = (accessToken: string, body: BodyArg, id: string | number) =>
  Axios.patch(`${BASE_URL}/tasks/edit/${id}`, body, config(accessToken));

export const editStatusTasks = (
  accesstoken: string,
  body: BodyArg,
  id: string | number
) => Axios.patch(`${BASE_URL}/tasks/edit/${id}`, body, config(accesstoken));

export const deleteTasks = (accessToken: string, id: string | number) =>
  Axios.delete(`${BASE_URL}/tasks/delete/${id}`, config(accessToken));
