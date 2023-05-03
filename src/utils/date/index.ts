import { DateTime } from "luxon";

export const formatDate = (date: any) => {
  return date.day === DateTime.now().day
    ? "Hari ini"
    : date.setLocale("en-GB").toFormat("DDD");
};
