export interface IResult {
  status: number;
  message?: string;
}
export enum enumStatus {
  "ready" = "ready",
  "progress" = "progress",
  "complete" = "complete",
}

export enum enumRole {
  "guest" = "guest",
}

export interface IUser {
  uid: string;
  email: string;
  nickname?: string;
  createdAt?: string;
  updatedAt?: string;
  status?: enumStatus;
  role?: enumRole;
}
