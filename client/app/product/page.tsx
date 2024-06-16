import { apiRequestProduct } from "@/apiRequest/product";
import ProductUI from "@/app/ui/productUi";

const ProductPage = async () => {
  const product = await apiRequestProduct.getProduct();
  return (
    <>
      <h1 className="text-[30px] font-semibold">Product </h1>
      <ProductUI product={product?.result} />
    </>
  );
};

export default ProductPage;
