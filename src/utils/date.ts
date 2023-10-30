import { DateTime } from "luxon";

export const formatTaskDate = (date: any) => {
  return date.day === DateTime.now().day
    ? "Hari ini"
    : date.setLocale("en-GB").toFormat("d LLLL yyyy");
};

export const formatViewInputTaskDate = (date: any) => {
  return DateTime.fromISO(date).toFormat("d LLLL yyyy");
};
