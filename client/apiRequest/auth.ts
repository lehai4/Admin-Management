import http from "@/lib/http";
import { LoginTypeof, ResponseLoginType, RegisterTypeof } from "@/type";

const authApiRequest = {
  login: (body: LoginTypeof) => http.post<any>("/login", body),

  register: (body: RegisterTypeof) => http.post<any>("/register", body),

  logout: () => http.post<any>("/logout", null),

  logoutFromNextClientToNextServer: (
    force?: boolean | undefined,
    signal?: AbortSignal | undefined
  ) =>
    http.post<any>(
      "/api/auth/logout",
      {
        force,
      },
      {
        baseUrl: "",
        signal,
      }
    ),
  logoutFromNextServerToServerBackend: (accessToken: string) =>
    http.post<any>(
      "/logout",
      {},
      {
        headers: {
          Authorization: "Bearer " + accessToken,
        },
      }
    ),

  requestApiToNextServer: (body: ResponseLoginType) =>
    http.post<any>("/api/auth", body, {
      baseUrl: "",
    }),
};
export default authApiRequest;
