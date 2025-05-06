import { Problem } from "./problem";

export interface UserProblemData {
  starred: boolean;
  done: boolean;
}

export interface CombinedProblem extends Problem {
  starred: boolean;
  done: boolean;
}

export type UserProgressStorage = Record<string, UserProblemData>;

export const LOCAL_STORAGE_KEY = 'userProblemProgress';
