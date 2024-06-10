import http from "@/lib/http";
import { LoginTypeof, ResponseLoginType } from "@/type";

const authApiRequest = {
  login: (body: LoginTypeof) => http.post<any>("/login", body),
  requestApiToNextServer: (body: ResponseLoginType) =>
    http.post<any>("/api/auth", body, {
      baseUrl: "",
    }),
};
export default authApiRequest;
