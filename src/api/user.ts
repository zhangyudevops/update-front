import { http } from "@/utils/http";

export type UserResult = {
  code: number;
  msg: string;
  data: {
    /** 用户名 */
    userKey: string;
    /** 当前登陆用户的角色 */
    roles: Array<string>;
    /** `token` */
    token: string;
  };
};

/** 登录 */
export const getLogin = (data?: object) => {
  return http.request<UserResult>("post", "/api/login", { data });
};
