import { z } from "zod";
import * as yup from "yup";

export const formLoginSchema = z.object({
  email: z
    .string({ message: "Please enter email!" })
    .email({ message: "Incorrect typeof email!" })
    .min(8, {
      message: "Email must be at least 8 characters!",
    }),
  password: z.string({ message: "Please enter password!" }).min(6, {
    message: "Password must be at least 6 characters!",
  }),
});
export const formSearchSchema = z.object({
  product: z.string({ message: "Please enter product!" }),
});

export const formEditProductSchema = yup.object({
  name: yup.string().required(),
  basePrice: yup.string().required(),
  discountPercentage: yup.number().required(),
  stock: yup.number().required(),
  description: yup.string().required(),
});

export const formCreateProductSchema = yup.object({
  name: yup.string().required(),
  basePrice: yup.number().required(),
  discountPercentage: yup.number().required(),
  stock: yup.number().required(),
  description: yup.string().required(),
  categories: yup.string().required(),
});

export type EditProductSchema = {
  name: string;
  basePrice: string;
  discountPercentage: number;
  stock: number;
  description: string;
};
export type CreateProductSchema = {
  name: string;
  basePrice: number;
  discountPercentage: number;
  stock: number;
  description: string;
  categories: string;
};
export type TypeMethod = "GET" | "POST" | "PUT" | "PATCH" | "DELETE";

export interface LoginTypeof {
  email: string;
  password: string;
}

export interface RegisterTypeof {
  email: string;
  password: string;
  name: string;
  address: string;
}
export interface LoginTypeof {
  email: string;
  password: string;
}

export interface ResponseLoginType {
  accessToken: string;
  refreshToken: string;
}
export interface ResponseProfile {
  id: string;
  email: string;
  name: string;
  address: string;
  role: string;
  createdAt: string;
  updatedAt: string;
}
export interface ResponseCategory {
  name: string;
  id: string;
}
export interface ResponseProduct {
  id: string;
  name: string;
  picture: string | null;
  basePrice: string;
  urlName: string;
  discountPercentage: number;
  stock: number;
  description: string;
  createdAt: string;
  categories: {
    name: string;
  }[];
}
export interface Category {
  id: string;
  name: string;
}
export type ProductType = ResponseProduct;
export type CategoryType = ResponseCategory;
export type ProfileType = ResponseProfile;
