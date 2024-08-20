import {TDoc} from "./utils/utils.types";

export type TUser = {
  fullName: string;
  password: string;
  email: string;
  avatar: string;
}

export interface IUserDocument extends TUser, TDoc {}