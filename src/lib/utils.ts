import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
export const convertToUTC = (date: Date): string => {
  return new Date(
    date.getTime() - date.getTimezoneOffset() * 60000
  ).toISOString();
};
