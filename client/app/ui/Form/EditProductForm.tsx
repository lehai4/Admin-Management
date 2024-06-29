"use client";
import { productApiRequest } from "@/apiRequest/product";
import { Button } from "@/components/ui/button";

import { Input } from "@/components/ui/input";
import { useToast } from "@/components/ui/use-toast";
import { EditProductSchema, ProductType, formEditProductSchema } from "@/type";
import { yupResolver } from "@hookform/resolvers/yup";
import { useRouter } from "next/navigation";
import { Controller, SubmitHandler, useForm } from "react-hook-form";

const EditProductForm = ({ product }: { product: ProductType }) => {
  const { toast } = useToast();
  const router = useRouter();
  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(formEditProductSchema),
    defaultValues: {
      ...product,
    },
  });

  const onSubmit: SubmitHandler<EditProductSchema> = async (data) => {
    const { name, basePrice, stock, discountPercentage, description } = data;
    const override = {
      name,
      basePrice: Number(basePrice),
      stock,
      discountPercentage,
      description,
    };
    await productApiRequest.editProduct(product.id, override);
    toast({
      title: "Done!",
      description: "Edit successfully!",
    });
    router.push("/product");
  };

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-8" noValidate>
        <div className="flex flex-row gap-4 items-center w-full">
          <div className="flex flex-col gap-2 w-full">
            <Controller
              name="name"
              control={control}
              render={({ field }) => <Input {...field} {...register("name")} />}
            />
            {errors.name && (
              <span className="text-red-500">{errors.name.message}</span>
            )}
          </div>
          <div className="flex flex-col gap-2 w-full">
            <Controller
              name="basePrice"
              control={control}
              render={({ field }) => (
                <Input {...field} {...register("basePrice")} />
              )}
            />
            {errors.basePrice && (
              <span className="text-red-500">{errors.basePrice.message}</span>
            )}
          </div>
        </div>
        <div className="flex flex-row items-center gap-4 w-full">
          <div className="flex flex-col  w-full">
            <Controller
              name="discountPercentage"
              control={control}
              render={({ field }) => (
                <Input
                  {...field}
                  {...register("discountPercentage")}
                  type="number"
                />
              )}
            />
            {errors.discountPercentage && (
              <span className="text-red-500">
                {errors.discountPercentage.message}
              </span>
            )}
          </div>
          <div className="flex flex-col  w-full">
            <Controller
              name="stock"
              control={control}
              render={({ field }) => (
                <Input {...field} {...register("stock")} type="number" />
              )}
            />
            {errors.stock && (
              <span className="text-red-500">{errors.stock.message}</span>
            )}
          </div>
        </div>
        <div className="flex flex-col gap-2">
          <Controller
            name="description"
            control={control}
            render={({ field }) => (
              <Input {...field} {...register("description")} />
            )}
          />
          {errors.description && (
            <span className="text-red-500">{errors.description.message}</span>
          )}
        </div>
        <div className="text-center flex items-center justify-center gap-6">
          <Button
            variant="secondary"
            onClick={() => {
              router.push("/product");
            }}
            type="button"
          >
            Back
          </Button>
          <Button type="submit">Edit</Button>
        </div>
      </form>
    </>
  );
};

export default EditProductForm;
