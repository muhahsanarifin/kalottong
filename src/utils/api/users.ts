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

export const retriveProfile = (accessToken: TokenProps) =>
  Axios.get(`${BASE_URL}/users/profile`, config(accessToken));

export const editProfile = (accessToken: TokenProps, body: BodyProps) =>
  Axios.patch(`${BASE_URL}/users/profile/edit`, body, config(accessToken));

export const uploadImageProfile = (accessToken: TokenProps, body: BodyProps) =>
  Axios.patch(`${BASE_URL}/users/profile/upload`, body, config(accessToken));
