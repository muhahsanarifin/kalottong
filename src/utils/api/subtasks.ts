import Axios from "axios";
import {
  BodyArg,
  // ParamsArg,
  // IdTasksArg,
  IdSubtasksArg,
} from "../types/apiType";

const BASE_URL = process.env.NEXT_PUBLIC_KALOTTONG_BACK_END;

const config = (accessToken: any) => {
  return {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  };
};

// export const retriveSubtasks = (
//   accessToken: any,
//   params: ParamsArg,
//   taskId: IdTasksArg
// ) => Axios.get(`${BASE_URL}/subtasks/${taskId}?${params}`, config(accessToken));

export const retriveSubtasks = (
  accessToken: any,
) => Axios.get(`${BASE_URL}/subtasks`, config(accessToken));

export const createSubtasks = (accessToken: any, body: BodyArg) =>
  Axios.post(`${BASE_URL}/subtasks/create`, body, config(accessToken));

export const editSubtasks = (
  accessToken: any,
  body: BodyArg,
  id: IdSubtasksArg
) => Axios.patch(`${BASE_URL}/subtasks/edit/${id}`, body, config(accessToken));

export const editStatusSubtaks = (
  accessToken: any,
  body: BodyArg,
  id: IdSubtasksArg
) => Axios.patch(`${BASE_URL}/subtasks/edit/${id}`, body, config(accessToken));

export const deleteSubtasks = (accessToken: any, id: IdSubtasksArg) =>
  Axios.delete(`${BASE_URL}/subtasks/delete/${id}`, config(accessToken));
