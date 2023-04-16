export const setItemLocalStorage = (key: string, value: any) => {
  localStorage.setItem(key, value);
};

export const getItemLocalStorage = (key: string) => {
  return localStorage.getItem(key);
};

export const removeItemLocalStorage = (key: string) => {
  localStorage.removeItem(key);
};
