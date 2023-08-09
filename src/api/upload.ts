import { http } from "@/utils/http";

type Result = {
  code: number;
  message: string;
  data?: {
    /** 列表数据 */
  };
};

export const uploadUpdateFile = (data: object) => {
  const transformRequest = (data: any) => {
    const formData = new FormData();
    Object.keys(data).forEach(key => {
      if (!(typeof data[key] === "undefined" || data[key] === null)) {
        formData.append(key, data[key]);
      }
    });
    return formData;
  };
  return http.request<Result>("post", "/api/file/upload", { data }, { transformRequest });
};
