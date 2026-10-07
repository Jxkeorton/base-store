import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'

/** Merge conditional class names, resolving Tailwind conflicts (used by the shadcn/ui components). */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}
