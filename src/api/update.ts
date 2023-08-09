import { http } from "@/utils/http";

type UpdateResult = {
  code: number;
  message: string;
  data?: {
    /** 列表数据 */
  };
};

export const updateSelectedPackage = (data?: object) => {
  return http.request<UpdateResult>("post", "/api/update/app", { data });
};
