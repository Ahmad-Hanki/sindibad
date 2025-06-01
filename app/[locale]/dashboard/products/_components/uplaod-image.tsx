import { Button } from "@/components/ui/button";
import { CldUploadWidget } from "next-cloudinary";
import { Dispatch, SetStateAction } from "react";
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
        options={{
          sources: ["local", "url", "camera"],
          multiple: false,
          resourceType: "image",
          clientAllowedFormats: ["jpg", "jpeg", "png", "gif", "webp"],
          maxFiles: 1,
        }}
        signatureEndpoint="/api/sign-cloudinary-params"
        uploadPreset="sindibad"
        onSuccess={(
          result
          // { widget }
        ) => {
          // eslint-disable-next-line @typescript-eslint/ban-ts-comment
          // @ts-ignore
          setImage(result?.info?.secure_url ?? "");
          // widget.close();
        }}
        // onUploadAdded={() => console.log("Upload started!")}
        // onQueuesEnd={() => console.log("Queue finished!")}
        // onError={(error) => console.log("Error!", error)}
      >
        {({ open }) => {
          return (
            <Button type="button" onClick={() => open()}>
              {title}
            </Button>
          );
        }}
      </CldUploadWidget>
    </div>
  );
};

export default UploadImage;
