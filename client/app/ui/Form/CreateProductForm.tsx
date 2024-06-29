"use client";
import { productApiRequest } from "@/apiRequest/product";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { toast } from "@/components/ui/use-toast";
import envConfig from "@/config";
import http from "@/lib/http";
import {
  Category,
  CreateProductSchema,
  ResponseProduct,
  formCreateProductSchema,
} from "@/type";
import { yupResolver } from "@hookform/resolvers/yup";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import useSWR from "swr";

const fetcher = async () => await http.get("/category");

const CreateProductForm = () => {
  const router = useRouter();

  const { data, error, isLoading } = useSWR(
    `${envConfig.NEXT_PUBLIC_API_ENDPOINT}/category`,
    fetcher,
    {
      revalidateIfStale: false,
      revalidateOnMount: true,
      revalidateOnFocus: true,
    }
  );

  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(formCreateProductSchema),
  });

  const [category, setCategory] = useState<Category[]>(
    data?.result ? data?.result : []
  );

  const onSubmit: SubmitHandler<CreateProductSchema> = async (data) => {
    const filterCate = category.find((c) => c.name === data.categories);

    const override = {
      ...data,
      categories: [`${filterCate?.id}`],
    };
    await productApiRequest.createProduct(override);
    toast({ title: "Done!", description: "Create Product Successfully!" });
    router.push("/product");
  };
  useEffect(() => {
    data !== undefined && setCategory(data?.result);
  }, [data]);
  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-8" noValidate>
      <div className="flex flex-row gap-4 items-center w-full">
        <div className="flex flex-col gap-2 w-full">
          <Controller
            name="name"
            control={control}
            render={({ field }) => (
              <Input {...field} {...register("name")} placeholder="name" />
            )}
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
              <Input
                {...field}
                type="number"
                {...register("basePrice")}
                placeholder="basePrice"
              />
            )}
          />
          {errors.basePrice && (
            <span className="text-red-500">{errors.basePrice.message}</span>
          )}
        </div>
      </div>
      <div className="flex flex-row gap-4 items-center w-full">
        <div className="flex flex-col gap-2 w-full">
          <Controller
            name="discountPercentage"
            control={control}
            render={({ field }) => (
              <Input
                {...field}
                type="number"
                {...register("discountPercentage")}
                placeholder="discountPercentage"
              />
            )}
          />
          {errors.discountPercentage && (
            <span className="text-red-500">
              {errors.discountPercentage.message}
            </span>
          )}
        </div>
        <div className="flex flex-col gap-2 w-full">
          <Controller
            name="stock"
            control={control}
            render={({ field }) => (
              <Input
                {...field}
                type="number"
                {...register("stock")}
                placeholder="stock"
              />
            )}
          />
          {errors.stock && (
            <span className="text-red-500">{errors.stock.message}</span>
          )}
        </div>
      </div>
      <div className="flex flex-col gap-2 w-full">
        <Controller
          name="categories"
          control={control}
          render={({ field }) => (
            <select
              className="border w-1/2 py-2 rounded-lg text-[14px] px-2"
              id="selectCategory"
              {...register("categories")}
              {...field}
              defaultValue=""
              name="categories"
            >
              <option value="" disabled>
                Choose here
              </option>
              {category.map((cate) => (
                <option
                  value={cate.name}
                  className="text-[14px] "
                  key={cate.id}
                  style={{ margin: "12px 0" }}
                >
                  {cate.name}
                </option>
              ))}
            </select>
          )}
        />
        {errors.categories && (
          <span className="text-red-500">{errors.categories.message}</span>
        )}
      </div>

      <Controller
        name="description"
        control={control}
        render={({ field }) => (
          <Input
            {...field}
            {...register("description")}
            placeholder="description"
          />
        )}
      />
      {errors.description && (
        <span className="text-red-500">{errors.description.message}</span>
      )}
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
        <Button type="submit">Create</Button>
      </div>
    </form>
  );
};

export default CreateProductForm;
