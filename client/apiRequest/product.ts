import http from "@/lib/http";
import {
  CreateProductSchema,
  EditProductSchema,
  ResponseProduct,
} from "@/type";

export const productApiRequest = {
  getProduct: () => http.get<ResponseProduct>(`/product?page=1&offset=10`),

  getProductByUrlName: (urlName: string) =>
    http.get<ResponseProduct>(`/product/${urlName}`),

  createProduct: (body: {
    categories: string[];
    name: string;
    basePrice: number;
    discountPercentage: number;
    stock: number;
    description: string;
  }) => http.post<ResponseProduct>(`/product`, body),

  editProduct: (
    id: string,
    body: {
      name: string;
      basePrice: number;
      discountPercentage: number;
      stock: number;
      description: string;
    }
  ) =>
    http.patch<{
      name: string;
      basePrice: number;
      discountPercentage: number;
      stock: number;
      description: string;
    }>(`/product/${id}`, body),

  uploadPicture: (id: string, formData: FormData) =>
    http.put<FormData>(`/product/picture/${id}`, formData, {
      headers: {
        accept: "application/json",
        "Content-Type": "multipart/form-data",
      },
    }),

  deleteProduct: (id: string) =>
    http.delete(`/product/${id}`, {
      headers: {
        accept: "*/*",
      },
    }),
};
