import authApiRequest from "@/apiRequest/auth";
import envConfig from "@/config";
import { TypeMethod } from "@/type";
import { redirect } from "next/navigation";
type CustomOptions = RequestInit & {
  baseUrl?: string | undefined;
};

class AccessToken {
  private accessToken = "";
  get value() {
    return this.accessToken;
  }
  set value(accessToken: string) {
    this.accessToken = accessToken;
  }
}
class RefreshToken {
  private refreshToken = "";
  get value() {
    return this.refreshToken;
  }
  set value(refreshToken: string) {
    this.refreshToken = refreshToken;
  }
}
export const clientAccessToken = new AccessToken();
export const clientRefreshToken = new RefreshToken();
export const isClient = () => typeof window !== "undefined";

export const request = async <Response>(
  method: TypeMethod,
  url: string,
  options?: CustomOptions
) => {
  const body = options?.body ? JSON.stringify(options?.body) : undefined;

  const baseUrl =
    options?.baseUrl === undefined
      ? envConfig.NEXT_PUBLIC_API_ENDPOINT
      : options.baseUrl;

  const baseHeaders = {
    "Content-Type": "application/json",
    Authorization: clientAccessToken.value
      ? `Bearer ${clientAccessToken.value}`
      : "",
  };
  const configUrl = url.startsWith("/")
    ? `${baseUrl}${url}`
    : `${baseUrl}/${url}`;

  const res = await fetch(configUrl, {
    ...options,
    headers: {
      ...baseHeaders,
      ...options?.headers,
    },
    body,
    method,
  });
  const result: any = await res.json();

  const data = {
    status: res.status,
    result,
  };
  if (!res.ok) {
    if (res.status === 401) {
      if (isClient()) {
        await fetch("http://localhost:3000/api/auth/logout", {
          method: "POST",
          headers: {
            ...baseHeaders,
          },
          body: JSON.stringify({ force: true }),
        });

        clientAccessToken.value = "";
        clientRefreshToken.value = "";
      } else {
        const accessToken = (options?.headers as any).Authorization.split(
          "Bearer "
        )[1];
        redirect(`/logout?accessToken=${accessToken}`);
      }
    }
    if (res.status === 400) {
      return;
    }
  }

  if (["/login"].includes(url)) {
    clientAccessToken.value = result.accessToken;
    clientRefreshToken.value = result.refreshToken;
  } else if (["/logout"].includes(url)) {
    clientAccessToken.value = "";
    clientRefreshToken.value = "";
  }

  return data;
};

const http = {
  get<Response>(url: string, options?: CustomOptions | undefined) {
    return request<Response>("GET", url, options);
  },
  post<Response>(url: string, body: any, options?: CustomOptions | undefined) {
    return request<Response>("POST", url, { ...options, body });
  },
};
export const { get, post } = http;
export default http;
