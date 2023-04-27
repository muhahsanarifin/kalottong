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

const anotherConfig = (accessToken: any) => {
  return {
    headers: {
      Authorization: `Bearer ${accessToken}`,
      "Content-Type": "multipart/form-data",
    },
  };
};

export const retriveProfile = (accessToken: any) =>
  Axios.get(`${BASE_URL}/users/profile`, config(accessToken));

export const editProfile = (accessToken: any, body: BodyArg) =>
  Axios.patch(`${BASE_URL}/users/profile/edit`, body, config(accessToken));

export const uploadImageProfile = (accessToken: any, body: BodyArg) =>
  Axios.patch(
    `${BASE_URL}/users/profile/upload`,
    body,
    anotherConfig(accessToken)
  );

export const editNoTelp = (accessToken: any, body: BodyArg) =>
  Axios.patch(`${BASE_URL}/users/notelp/edit`, body, config(accessToken));
