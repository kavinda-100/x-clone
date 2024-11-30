import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { formatDistanceToNow } from "date-fns";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// formatDateToRelativeTime function
export function formatDateToRelativeTime(dateString: string): string {
  const date = new Date(dateString);
  return formatDistanceToNow(date, { addSuffix: true });
} // Output: "x minutes ago", "x hours ago", "x days ago", etc.

// capitalizeFirstLetter function
export const capitalizeFirstLetter = (string: string) => {
  if (!string) return string;
  return string.charAt(0).toUpperCase() + string.slice(1);
};

// formatJoinDate function
export function formatJoinDate(dateString: string): string {
  const date = new Date(dateString);
  const options: Intl.DateTimeFormatOptions = {
    year: "numeric",
    month: "long",
  };
  const formattedDate = date.toLocaleDateString("en-US", options);
  return `Joined ${formattedDate}`;
}

// generate random numbers
export function generateRandomNumber(
  min: number = 10,
  max: number = 10000,
): number {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

// convert number to K or M
export function formatNumber(num: number): string {
  if (num >= 1000000) {
    return (num / 1000000).toFixed(1).replace(/\.0$/, "") + "M";
  }
  if (num >= 1000) {
    return (num / 1000).toFixed(1).replace(/\.0$/, "") + "K";
  }
  return num.toString();
}
