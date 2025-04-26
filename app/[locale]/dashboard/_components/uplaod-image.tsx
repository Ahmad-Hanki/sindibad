"use client";
import { Button } from "@/components/ui/button";
import { CldUploadWidget } from "next-cloudinary";
import { Dispatch, SetStateAction } from "react";
// complete the code in the middle
const UploadImage = ({
  setImage,
  title,
}: {
  setImage: Dispatch<SetStateAction<string | null>>;
  title: string;
}) => {
  return (
    <div>
      <CldUploadWidget
        signatureEndpoint="/api/sign-cloudinary-params"
        uploadPreset="sindibad"
        onSuccess={(result) => {
          // @ts-ignore
          setImage(result?.info?.secure_url ?? "");
        }}
        onUploadAdded={() => console.log("Upload started!")}
        onQueuesEnd={() => console.log("Queue finished!")}
        onError={(error) => console.log("Error!", error)}
      >
        {({ open }) => {
          return <Button onClick={() => open()}>{title}</Button>;
        }}
      </CldUploadWidget>
    </div>
  );
};

export default UploadImage;
