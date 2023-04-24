import Axios from "axios";

import { TokenProps, BodyProps } from "../types/apiType";

const BASE_URL = process.env.NEXT_PUBLIC_KALOTTONG_BACK_END;

const config = (accessToken: TokenProps) => {
  return {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  };
};

export const login = ({ ...body }: BodyProps) =>
  Axios.post(`${BASE_URL}/auth/login`, body);

export const logout = (accessToken: any) =>
  Axios.delete(`${BASE_URL}/auth/logout`, config(accessToken));

export const register = ({ ...body }: BodyProps) =>
  Axios.post(`${BASE_URL}/auth/register`, body);
