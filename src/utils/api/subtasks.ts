import Axios from "axios";

import {
  TokenProps,
  BodyProps,
  ParamsProps,
  IdTasksProps,
  IdSubtasksProps,
} from "../types/apiType";

const BASE_URL = process.env.NEXT_PUBLIC_KALOTTONG_BACK_END;

const config = (accessToken: TokenProps) => {
  return {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  };
};

export const retriveSubtasks = (
  accessToken: TokenProps,
  params: ParamsProps,
  id: IdTasksProps
) => Axios.get(`${BASE_URL}/subtasks/${id}?${params}`, config(accessToken));

export const createSubtasks = (accessToken: TokenProps, body: BodyProps) =>
  Axios.post(`${BASE_URL}/subtasks/create`, body, config(accessToken));

export const editSubtasks = (
  accessToken: TokenProps,
  body: BodyProps,
  id: IdSubtasksProps
) => Axios.patch(`${BASE_URL}/subtasks/edit/${id}`, body, config(accessToken));

export const deleteSubtasks = (accessToken: TokenProps, id: IdSubtasksProps) =>
  Axios.delete(`${BASE_URL}/subtasks/delete/${id}`, config(accessToken));
