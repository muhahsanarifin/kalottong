import Axios from "axios";

import { BodyArg } from "../types/apiType";

const BASE_URL = process.env.NEXT_PUBLIC_KALOTTONG_BACK_END;

const config = (accessToken: any) => {
  return {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  };
};

export const login = (body: BodyArg) => Axios.post(`${BASE_URL}/auth/login`, body);

export const logout = (accessToken: any) =>
  Axios.delete(`${BASE_URL}/auth/logout`, config(accessToken));

export const register = (body: BodyArg) =>
  Axios.post(`${BASE_URL}/auth/register`, body);
