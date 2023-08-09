import { http } from "@/utils/http";

type HistoryResult = {
  code: number;
  message: string;
  data?: {
    /** 列表数据 */
    history_list: Array<any>;
  };
};

export const getPackageHistory = (data?: object) => {
  return http.request<HistoryResult>("get", "/api/pkg/history", { data });
};
