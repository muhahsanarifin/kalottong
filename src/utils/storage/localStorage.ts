export const setItemLocalStorage = (key: string, value: any) => {
  localStorage.setItem(key, value);
};

export const getItemLocalStorage = (key: string) => {
  return localStorage.getItem(key);
};
