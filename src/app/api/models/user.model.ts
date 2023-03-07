import { CommonResponse } from "./common.model";

export interface RqUserLoginParams {
    userName: string,
    passWord: string,
}

export interface RsUserLogin extends CommonResponse {
    data?: UserLoginResult | null;
  }
  export interface UserLoginResult {
    user: string,
    email: string,
    expires: number,
    token?: null | string
  }