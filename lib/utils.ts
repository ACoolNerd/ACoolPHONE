import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

/** Merge Tailwind CSS class names, resolving conflicts via tailwind-merge. */
export function cn(...inputs: ClassValue[]): string {
  return twMerge(clsx(inputs));
}

/** Format a UTC timestamp to a human-readable string. */
export function formatDate(date: Date | string): string {
  return new Intl.DateTimeFormat("en-US", {
    year:  "numeric",
    month: "short",
    day:   "numeric",
  }).format(new Date(date));
}

/** Capitalise the first letter of a string. */
export function capitalize(str: string): string {
  if (!str) return "";
  return str.charAt(0).toUpperCase() + str.slice(1);
}
