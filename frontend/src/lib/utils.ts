import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { formatDistanceToNow } from "date-fns";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatDateToRelativeTime(dateString: string): string {
  const date = new Date(dateString);
  return formatDistanceToNow(date, { addSuffix: true });
}

// Example usage
const formattedDate = formatDateToRelativeTime("2024-11-06T14:13:13.295+00:00");
console.log(formattedDate); // Output: "x minutes ago", "x hours ago", "x days ago", etc.
