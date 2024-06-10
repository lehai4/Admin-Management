import envConfig from "@/config";
import { ErrorResponseLogin, TypeMethod } from "@/type";
import { redirect } from "next/navigation";
type CustomOptions = RequestInit & {
  baseUrl?: string | undefined;
};
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
  const result: Response = await res.json();

  const data = {
    status: res.status,
    result,
  };
  if (!res.ok) {
    throw new Error("Invalid email or password");
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
