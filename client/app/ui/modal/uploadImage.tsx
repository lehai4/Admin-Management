"use client";
import { productApiRequest } from "@/apiRequest/product";
import { closeModal } from "@/app/redux/slice/modalSlice";
import { useToast } from "@/components/ui/use-toast";
import envConfig from "@/config";
import { useAppDispatch } from "@/lib/hook";
import { clientAccessToken } from "@/lib/http";
import { CircleX } from "lucide-react";
import { useState } from "react";

export const UploadImage = ({ editedID }: { editedID: string }) => {
  const { toast } = useToast();
  const dispatch = useAppDispatch();
  const [image, setImage] = useState(null);

  const handleImageChange = (event: any) => {
    const file = event.target.files[0];
    if (file.size > 2 * 1024 * 1024) {
      // > 2mb
      alert("Kích thước ảnh vượt quá 2MB.");
      return;
    } else {
      setImage(file);
    }
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
    formData.append("file", image);

    // const res = await productApiRequest.uploadPicture(editedID, formData);
    const res = await fetch(
      `${envConfig.NEXT_PUBLIC_API_ENDPOINT}/product/picture/${editedID}`,
      {
        method: "PATCH",
        headers: {
          accept: "application/json",
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${clientAccessToken.value}`,
        },
        body: JSON.stringify({ formData }),
      }
    );
    if (!res.ok) {
      toast({
        title: "Error",
        description: "Can't call api for upload image",
        variant: "destructive",
      });
    }
    toast({
      title: "Done",
      description: "Upload image successfully!",
      variant: "default",
    });
    // dispatch(closeModal());
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
            className="w-fit cursor-pointer text-[#303f9f]"
          />
          <button
            className="w-40 text-center py-2 bg-gray-500 text-white text-lg rounded-lg font-semibold hover:bg-gray-400 transition-all"
            onClick={handleUpload}
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
};
