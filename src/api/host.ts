import { http } from "@/utils/http";

type HostResult = {
  code: number;
  message: string;
  data?: {
    /** 列表数据 */
    hosts: Array<{
      /** 主机ip */
      ip: string;
      /** 主机端口 */
      port: string;
      /** 主机用户名 */
      user: string;
      /** 主机用途 */
      type: string;
    }>;
  };
};

export const getHosts = (data?: object) => {
  return http.request<HostResult>("get", "/api/host/list", { data });
};

export const updateHost = (data?: object) => {
  return http.request<HostResult>("post", "/api/host/update", { data });
};

export const deleteHost = (data?: object) => {
  return http.request<HostResult>("delete", "/api/host/delete", { data });
};

export const addHost = (data?: object) => {
  return http.request<HostResult>("post", "/api/host/create", { data });
};
