import { BaseListApiResponse } from "../../../shared/api/types";
import { UserModel } from "../model/types";

export type UserGetQueryParams = {
  limit?: string;
  select?: string;
};

export type UserListApiResponse = BaseListApiResponse & {
  users: UserModel[];
};
