import { cn } from "@/lib/utils";
import type { InputHTMLAttributes } from "react";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?:   string;
  error?:   string;
  hint?:    string;
}

export function Input({ label, error, hint, className, id, ...props }: InputProps) {
  const inputId = id ?? label?.toLowerCase().replace(/\s+/g, "-");
  return (
    <div className="space-y-1">
      {label && (
        <label htmlFor={inputId} className="block text-sm font-medium text-slate-700 dark:text-slate-300">
          {label}
        </label>
      )}
      <input
        id={inputId}
        className={cn(
          "block w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm text-slate-900",
          "placeholder:text-slate-400 focus:border-brand-500 focus:outline-none focus:ring-2 focus:ring-brand-500/30",
          "disabled:cursor-not-allowed disabled:opacity-50",
          "dark:border-slate-600 dark:bg-slate-800 dark:text-slate-100",
          error && "border-red-500 focus:border-red-500 focus:ring-red-500/30",
          className,
        )}
        {...props}
      />
      {hint && !error && (
        <p className="text-xs text-slate-500 dark:text-slate-400">{hint}</p>
      )}
      {error && (
        <p className="text-xs text-red-600 dark:text-red-400">{error}</p>
      )}
    </div>
  );
}
