import http from "@/lib/http";
import { ResponseProduct } from "@/type";

export const productApiRequest = {
  getProduct: () => http.get<ResponseProduct>(`/product`),
  uploadPicture: (id: string, formData: FormData) =>
    http.post<FormData>(`/product/picture/${id}`, formData, {
      headers: {
        "Content-type": "application/x-www-form-urlencoded",
      },
    }),
  deleteProduct: (id: string) =>
    http.delete(`/product/${id}`, {
      headers: {
        accept: "*/*",
      },
    }),
};
