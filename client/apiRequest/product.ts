import http from "@/lib/http";
import { ResponseProduct } from "@/type";

export const productApiRequest = {
  getProduct: () => http.get<ResponseProduct>(`/product`),
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
