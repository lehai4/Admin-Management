import { z } from "zod";

export const formLoginSchema = z.object({
  email: z
    .string({ message: "Please enter email!" })
    .email({ message: "Incorrect typeof email" })
    .min(8, {
      message: "Email must be at least 8 characters.",
    }),
  password: z.string({ message: "Please enter password!" }).min(6, {
    message: "Password must be at least 6 characters.",
  }),
});

export type TypeMethod = "GET" | "POST" | "PUT" | "DELETE";

export interface LoginTypeof {
  email: string;
  password: string;
}

export interface ResponseLoginType {
  accessToken: string;
  refreshToken: string;
}
export interface ErrorResponseLogin {
  status: number;
  payload: {
    statusCode: number;
    message: string;
    error: string;
  };
}
