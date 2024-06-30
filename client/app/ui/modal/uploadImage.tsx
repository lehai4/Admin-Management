"use client";
import { productApiRequest } from "@/apiRequest/product";
import { closeModal } from "@/app/redux/slice/modalSlice";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { useAppDispatch } from "@/lib/hook";
import { CircleX } from "lucide-react";
import Image from "next/image";
import { useRef, useState } from "react";

export const UploadImage = ({ editedID }: { editedID: string }) => {
  const inputRef = useRef<HTMLInputElement | null>(null);
  const { toast } = useToast();
  const dispatch = useAppDispatch();
  const [image, setImage] = useState<any>(null);

  const handleImageChange = (event: any) => {
    const file = event.target.files?.[0];

    setImage(file);
  };

  const handleUpload = async () => {
    if (!image) {
      toast({
        title: "Error",
        description: "Please choose image for upload",
        variant: "destructive",
      });
      return;
    }
    const formData = new FormData();

    formData.append("file", image as Blob);

    await productApiRequest.uploadPicture(editedID, formData);

    toast({
      title: "Done",
      description: "Upload image successfully!",
      variant: "default",
    });
    dispatch(closeModal());
  };
  return (
    <div className="fixed top-0 left-0 bottom-0 right-0 bg-black bg-opacity-70 z-30 flex justify-center items-center">
      <div className="bg-white p-8 rounded-lg z-30 opacity-100 max-w-[450px] w-full">
        <div className="flex items-center justify-between  mb-10">
          <h3 className="text-center  text-xl font-semibold">
            upload_from_your_browser
          </h3>

          <CircleX
            className=" text-lg font-semibold cursor-pointer"
            onClick={() => dispatch(closeModal())}
          />
        </div>
        <div className="flex items-center">
          <input
            type="file"
            accept="image/*"
            onChange={handleImageChange}
            ref={inputRef}
            onClick={() => {
              if (inputRef.current) {
                inputRef.current.value = "";
              }
            }}
            className="w-fit cursor-pointer text-[#303f9f]"
          />
          <button
            className="w-40 text-center py-2 bg-gray-500 text-white text-lg rounded-lg font-semibold hover:bg-gray-400 transition-all"
            onClick={handleUpload}
          >
            Save
          </button>
        </div>
        {image && (
          <div className="mt-[20px] flex flex-col gap-2">
            <Image
              src={URL.createObjectURL(image)}
              alt={`${image?.name}`}
              width={128}
              height={128}
              className="w-full h-[200px]"
              quality={100}
            />
            <Button
              variant={"destructive"}
              onClick={() => {
                setImage(null);
                if (inputRef.current) {
                  inputRef.current.value = "";
                }
              }}
            >
              Delete Image
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};
