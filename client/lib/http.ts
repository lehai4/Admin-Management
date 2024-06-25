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
  // res.ok = false
  if (!res.ok) {
    if (res.status === 401) {
      if (isClient()) {
        // if authorized => process refreshtoken
        const newToken = await fetch(
          `${envConfig.NEXT_PUBLIC_API_ENDPOINT}/refresh`,
          {
            method: "POST",
            headers: {
              ...baseHeaders,
            },
            body: JSON.stringify({ refreshToken: clientRefreshToken.value }),
          }
        ).then((res) => res.json());

        const { accessToken, refreshToken } = newToken;
        // call api nextServer set-cookie for client again
        await fetch("http://localhost:3000/api/auth", {
          method: "POST",
          headers: {
            ...baseHeaders,
          },
          body: JSON.stringify({
            accessToken,
            refreshToken,
          }),
        });
        clientAccessToken.value = accessToken;
        clientRefreshToken.value = refreshToken;
        //call api again
        const newRes = await fetch(configUrl, {
          ...options,
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${accessToken}`,
            ...options?.headers,
          },
          body,
          method,
        });

        if (newRes.status === 204) {
          return {
            status: 204,
            result: {
              message: "Delete Successfully!",
            },
          };
        }

        const response = await newRes.json();
        return {
          status: res.status,
          result: response,
        };
      } else {
        console.log("Call Not Server");
        redirect("/refresh");
      }
    } else if (res.status === 400) {
      throw new Error("Error 400");
    } else if (res.status === 404) {
      console.log("Error 404");
      return;
    }
  }
  // res.ok = true
  if (res.status === 204) {
    return {
      status: 204,
      result: {
        message: "Delete Successfully!",
      },
    };
  }

  const result: any = await res.json();

  const data = {
    status: res.status,
    result,
  };
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
  put<Response>(url: string, body: any, options?: CustomOptions | undefined) {
    return request<Response>("PUT", url, { ...options, body });
  },
  delete<Response>(url: string, options?: CustomOptions | undefined) {
    return request<Response>("DELETE", url, options);
  },
};
export default http;
