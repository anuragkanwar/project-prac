import { UserProgressStorage, LOCAL_STORAGE_KEY } from "@/types/storage";
import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const loadUserProgress = (): UserProgressStorage => {
  try {
    const serializedState = localStorage.getItem(LOCAL_STORAGE_KEY);
    if (serializedState === null) {
      return {};
    }
    return JSON.parse(serializedState) as UserProgressStorage;
  } catch (error) {
    console.error("Error loading user progress from local storage:", error);
    return {};
  }
};

export const saveUserProgress = (progress: UserProgressStorage) => {
  try {
    const serializedState = JSON.stringify(progress);
    localStorage.setItem(LOCAL_STORAGE_KEY, serializedState);
  } catch (error) {
    console.error("Error saving user progress to local storage:", error);
  }
};
