import http from "@/lib/http";
import { ResponseProfile } from "@/type";

export const profileApiRequest = {
  profileClient: () => http.get<ResponseProfile>("/user"),
};
