export const set = (key: string, value: any) => {
  localStorage.setItem(key, value);
};

export const get = (key: string) => {
  return localStorage.getItem(key);
};

export const remove = (key: string) => {
  return localStorage.removeItem(key);
};
