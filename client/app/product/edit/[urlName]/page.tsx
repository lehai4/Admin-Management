import { productApiRequest } from "@/apiRequest/product";
import EditProductForm from "@/app/ui/Form/EditProductForm";

const EditPage = async ({ params }: { params: { urlName: string } }) => {
  const product = await productApiRequest.getProductByUrlName(params.urlName);
  return (
    <>
      <h1 className="text-[30px] font-semibold pt-[20px] pb-[30px]">
        Form Edit
      </h1>
      <EditProductForm product={product?.result} />
    </>
  );
};

export default EditPage;
