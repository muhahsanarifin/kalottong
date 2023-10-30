import { setCookie, deleteCookie, getCookie } from "cookies-next";

interface CookieParams {
  key: string;
  value?: string;
};

const cookie = {
  get: ({ key }: CookieParams) => {
    return getCookie(key);
  },
  del: ({ key }: CookieParams) => {
    return deleteCookie(key);
  },
  set: ({ key, value }: CookieParams) => {
    return setCookie(key, value);
  },
};

export default cookie;
