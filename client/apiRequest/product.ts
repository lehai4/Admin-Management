import http from "@/lib/http";
import { ResponseProduct } from "@/type";

export const apiRequestProduct = {
  getProduct: () => http.get<ResponseProduct>(`/product`),
};
