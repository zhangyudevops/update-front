import { http } from "@/utils/http";

type ConfigResult = {
  code: number;
  message: string;
  data?: {
    /** 列表数据 */
    config: string;
  };
};

export const getVarConfig = (data?: object) => {
  return http.request<ConfigResult>("get", "/api/config/list", { data });
};

export const updateVarConfig = (data?: object) => {
  return http.request<ConfigResult>("post", "/api/config/update", { data });
};
