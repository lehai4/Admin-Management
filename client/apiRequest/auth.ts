import http from "@/lib/http";
import { LoginTypeof, ResponseLoginType, RegisterTypeof } from "@/type";

const authApiRequest = {
  login: (body: LoginTypeof) => http.post<any>("/login", body),

  register: (body: RegisterTypeof) => http.post<any>("/register", body),

  logout: () => http.post<any>("/logout", null),

  requestApiToNextServer: (body: ResponseLoginType) =>
    http.post<any>("/api/auth", body, {
      baseUrl: "",
    }),
};
export default authApiRequest;
