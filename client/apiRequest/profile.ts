import http from "@/lib/http";
import { ResponseProfile } from "@/type";

export const profileApiRequest = {
  profile: (accessToken: string) =>
    http.get<ResponseProfile>("/user", {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    }),
  profileClient: () => http.get<ResponseProfile>("/user"),
};
